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
  Note
} from "../note";
import {
  generateOrderedCombinations,
  removeDuplicates
} from "../utils";
import {key} from "../key";


export interface VoicingOptions {
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
  octave: number
  note: Note
}

export interface ChordVoicing {
  chord: Chord
  voicingOptions: VoicingOptions
  voicedNotes: VoicedNote[]
  tension: number
  density: number
}


function voiceAllNotes(notes: Note[], maxToneSpread: number, maxSize: number): VoicedNote[] {
  let totalSpread = 0
  const octaveNotes: VoicedNote[] = [{ octave: 0, note: notes[0] }]
  do {
    const index = octaveNotes.length
    const currentNote = notes[(index - 1) % notes.length]
    const nextNote = notes[index % notes.length]
    const nextDifference = getIntervalBetweenNotes(currentNote, nextNote)

    if (totalSpread + nextDifference > maxToneSpread) {
      console.log(`Adding additional chord note ${nextNote} will result in a chord with spread greater than ${maxToneSpread}.`)
      break
    } else {
      totalSpread += nextDifference
      octaveNotes.push({ octave: Math.floor(totalSpread / 12), note: nextNote, })
    }

  } while (totalSpread < maxToneSpread)


  return octaveNotes
}

function calculateTension (intervalIdentifiers: IntervalIdentifier[]): number {
  let tension = 0
  for (let i = 0; i < intervalIdentifiers.length; i++) {
    tension += interval(intervalIdentifiers[i]).tension
  }
  return tension
}

export function generateVoicings (chord: Chord, voicingOptions: VoicingOptions): ChordVoicing[] {
  const voicedNotes = voiceAllNotes(chord.notes, voicingOptions.maxSpread, voicingOptions.maxSize)
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


  const dedupedVoicedNoteCombinations = removeDuplicates(filteredVoicedNoteCombinations)
  const chordVoicings: ChordVoicing[] = []
  dedupedVoicedNoteCombinations.forEach(voicedNoteCombination => {
    chordVoicings.push({
      chord: chord,
      voicingOptions: voicingOptions,
      voicedNotes: voicedNoteCombination,
      tension: 0,
      density: 0
    })
  })

  return chordVoicings
}