import {
  interval,
  getIntervalBetweenNotes,
  IntervalDistance,
  IntervalIdentifier
} from "../interval"
import {
  Chord
} from "../chord"
import {
  ionianMode,
  ModeDegree
} from "../mode"
import {
  getNaturalNoteRoot, isNote,
  NaturalNote,
  Note
} from "../note";
import {
  generateOrderedCombinations,
  removeDuplicates
} from "../utils";
import {
  key
} from "../key";

export const NOTE_PITCHES = [0, 1, 2 ,3, 4, 5, 6, 7, 8] as const
export type NotePitch = typeof NOTE_PITCHES[number]
export function isNotePitch (notePitch: any): notePitch is NotePitch {
  return NOTE_PITCHES.includes(notePitch)
}

export interface VoicingOptions {
  // Pitch for the root note of the voicing
  startingPitch: NotePitch

  // Minimum distance, in semitones, between the first and last note
  minSpread: IntervalDistance

  // Maximum distance, in semitones, between the first and last note
  maxSpread: IntervalDistance

  // Minimum number of notes
  minSize: number

  // Maximum number of notes
  maxSize: number

  // List of chord degrees to omit from chord voicing, if they in the chord
  omitDegrees?: ModeDegree[]

  // List of notes to omit from chord voicing, if they are in the chord
  omitNotes?: Note[]

  // List of degrees the chord must contain, if they are in the chord
  guaranteeDegrees?: ModeDegree[]

  // List of notes the chord must contain, if they are in the chord
  guaranteeNotes?: Note[]

  // If the chord has a slash note, it must always be the root
  enforceSlash?: boolean
}

export interface VoicedNote {
  pitch: NotePitch
  note: Note
}

export interface ChordVoicing {
  chord: Chord
  voicingOptions: VoicingOptions
  voicedNotes: VoicedNote[]
  tension: number
}

function isValidVoicedNote (note: Note, pitch: number): boolean {
  if ([0, 1].includes(pitch) && !['A', 'A#', 'Bb', 'B'].includes(note)) {
    return false
  } else if (pitch === 8 && note !== 'C') {
    return false
  } else if (!isNotePitch(pitch)) {
    return false
  } else if (!isNote(note)) {
    return false
  } else {
    return true
  }
}

function voiceAllNotes(notes: Note[], voicingOptions: VoicingOptions): VoicedNote[] {
  // We can generate pitches by comparing distance to C, since C is the start of a given pitch.
  // If notes get farther from C, we're in the same pitch. If they suddenly get closer, we're in the next pitch.
  const distanceToCByNaturalNote: Record<NaturalNote, number> = {
    C: 0,
    D: 1,
    E: 2,
    F: 3,
    G: 4,
    A: 5,
    B: 6,
  }
  let currentDistanceToC = 0
  let previousDistanceToC = distanceToCByNaturalNote[getNaturalNoteRoot(notes[0])]
  let pitchOffset = 0

  let totalToneSpread = 0
  const voicedNotes: VoicedNote[] = [{ pitch: voicingOptions.startingPitch, note: notes[0] }]
  do {
    const index = voicedNotes.length
    const currentNote = notes[(index - 1) % notes.length]
    const nextNote = notes[index % notes.length]
    const nextIntervalLength = getIntervalBetweenNotes(currentNote, nextNote).length

    if (totalToneSpread + nextIntervalLength > voicingOptions.maxSpread) {
      console.log(`Adding additional chord note ${nextNote} will result in a chord with spread greater than ${voicingOptions.maxSpread}.`)
      break
    }

    totalToneSpread += nextIntervalLength

    currentDistanceToC = distanceToCByNaturalNote[getNaturalNoteRoot(nextNote)]
    if (currentDistanceToC <= previousDistanceToC) {
      pitchOffset += 1
    }
    const pitch = voicingOptions.startingPitch + pitchOffset
    previousDistanceToC = currentDistanceToC

    if (!isValidVoicedNote(nextNote, pitch)) {
      console.log(`Adding additional chord note ${nextNote}${pitch} results in an invalid voiced note`)
      continue
    }

    voicedNotes.push({
      pitch: pitch as NotePitch,
      note: nextNote
    })

  } while (totalToneSpread < voicingOptions.maxSpread)

  return voicedNotes
}

function calculateTension (voicedNotes: VoicedNote[]): number {
  let tension = 0
  let density = 0
  for (let i = 0; i < voicedNotes.length - 1; i++) {
    density += getDistanceBetweenVoicedNotes(voicedNotes[i], voicedNotes[i])
    for (let j = i+1; j < voicedNotes.length; j++) {
      const interval = getIntervalBetweenNotes(voicedNotes[i].note, voicedNotes[j].note)
      tension += interval.tension
    }
  }
  // TODO: Decide how we actually want to calculate tension. Tension per note is... fine
  return tension / voicedNotes.length
}

function getDistanceBetweenVoicedNotes(firstVoicedNote: VoicedNote, secondVoicedNote: VoicedNote): number {
  const interval = getIntervalBetweenNotes(firstVoicedNote.note, secondVoicedNote.note)
  return interval.length + (12 * (secondVoicedNote.pitch - firstVoicedNote.pitch))
}

export function generateVoicings (chord: Chord, voicingOptions: VoicingOptions): ChordVoicing[] {
  const voicedNotes = voiceAllNotes(chord.notes, voicingOptions)
  const voicedIntervals = voicedNotes.map(voicedNote => interval(chord.intervals[chord.notes.findIndex(note => note === voicedNote.note)]))

  const voicedNoteCombinations: VoicedNote[][] = []
  if ((voicingOptions.minSize && voicingOptions.maxSize) && voicingOptions.minSize <= voicingOptions.maxSize) {
    for (let i = voicingOptions.minSize; i <= voicingOptions.maxSize; i++) {
      generateOrderedCombinations(voicedNotes, voicedNoteCombinations, i)
    }
  } else {
    console.error(`Cannot generate a chord with max size ${voicingOptions.maxSize} and min size ${voicingOptions.minSize}.`)
    return []
  }

  const chordNotesByDegree = key(chord.root, 'Ionian').noteByDegree

  let omitNotes: Note[] = []
  if (voicingOptions.omitNotes) {
    omitNotes = omitNotes.concat(voicingOptions.omitNotes)
  }
  if (voicingOptions.omitDegrees) {
    omitNotes = omitNotes.concat(voicingOptions.omitDegrees.map(degree => chordNotesByDegree[degree]))
  }

  let guaranteeNotes: Note[] = []
  if (voicingOptions.guaranteeNotes) {
    guaranteeNotes = guaranteeNotes.concat(voicingOptions.guaranteeNotes)
  }
  if (voicingOptions.guaranteeDegrees) {
    guaranteeNotes = guaranteeNotes.concat(voicingOptions.guaranteeDegrees.map(degree => chordNotesByDegree[degree]))
  }

  const filteredVoicedNoteCombinations = voicedNoteCombinations.filter(combination => {
    if (voicingOptions.enforceSlash && combination[0].note !== chord.slashNote) {
      return false
    }

    const combinationNotes = combination.map(voicedNote => voicedNote.note)
    if (omitNotes.length && combination.some(voicedNote => omitNotes.includes(voicedNote.note))) {
      return false
    }
    if (guaranteeNotes.length && !guaranteeNotes.every(note => combinationNotes.includes(note))) {
      return false
    }

    return true
  })

  // TODO: Rank tension and density
  const dedupedVoicedNoteCombinations = removeDuplicates(filteredVoicedNoteCombinations)
  const chordVoicings: ChordVoicing[] = []
  dedupedVoicedNoteCombinations.forEach(voicedNoteCombination => {
    chordVoicings.push({
      chord: chord,
      voicingOptions: voicingOptions,
      voicedNotes: voicedNoteCombination,
      tension: calculateTension(voicedNoteCombination)
    })
  })

  return chordVoicings
}