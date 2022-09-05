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
  ModeDegree
} from "../mode"
import {
  Note
} from "../note";
import {
  generateOrderedCombinations,
  removeDuplicates
} from "../utils";


export interface VoicingOptions {
  minToneSpread: IntervalDistance,
  maxToneSpread: IntervalDistance,
  maxSize: number,
  minSize: number,
  omitDegrees?: ModeDegree[],
  guaranteeDegrees?: ModeDegree[]
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


function voiceNotes(notes: Note[], maxToneSpread: number, maxSize: number): VoicedNote[] {
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

  } while (totalSpread < maxToneSpread && octaveNotes.length < maxSize)


  return octaveNotes
}

function calculateTension(intervalIdentifiers: IntervalIdentifier[]): number {
  let tension = 0
  for (let i = 0; i < intervalIdentifiers.length; i++) {
    tension += interval(intervalIdentifiers[i]).tension
  }
  return tension
}

export function generateVoicing (chord: Chord, voicingOptions: VoicingOptions): ChordVoicing[] {
  const voicedNotes = voiceNotes(chord.notes, voicingOptions.maxToneSpread, voicingOptions.maxSize)
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

  voicedNoteCombinations.filter(combination => {
    if (voicingOptions.enforceSlash && combination[0].note !== chord.slashNote) {
      return false
    }
    if (voicingOptions.guaranteeDegrees && voicingOptions.guaranteeDegrees.every(() => true)) {

    }


  })



  const chordVoicings: ChordVoicing[] = []
  voicedNoteCombinations.forEach(voicedNoteCombination => {
    const dedupedNotes = removeDuplicates(voicedNoteCombination)


    chordVoicings.push({
      chord: chord,
      voicingOptions: voicingOptions,
      voicedNotes: voicedNoteCombination,
      tension: 0,
      density: 0
    })
  })

  return []
}