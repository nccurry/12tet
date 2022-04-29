import { Interval, IntervalDistance } from "../interval"
import { normalizeValue, offsetArray, removeDuplicates } from '../utils'
import {AnyNote, interval, simplifyNote, StandardNote} from '../note'
import {
  AeolianStandardKey,
  IonianStandardKey,
  IonianMode,
  LocrianStandardKey,
  MixolydianStandardKey,
  Mode,
  LydianStandardKey, DorianStandardKey, PhrygianStandardKey, IonianAnyKey, AeolianAnyKey
} from '../mode'

// Data / Types

export const diatonicChordType = ['maj', 'min', 'dim'] as const
export type DiatonicChordType = typeof diatonicChordType[number]

export const chordType = [...diatonicChordType, 'dom', 'sus2', 'sus4', 'aug', 'dimsus2', 'dimsus4', 'augsus2', 'augsus4'] as const
export type ChordType = typeof chordType[number]

export const chordAdditions = ['add2', 'add4', 'add6', 'add9', 'add11', 'add13'] as const
export type ChordAddition = typeof chordAdditions[number]

export const chordAlteration = ['b1', '#1', 'b2', '#2', 'b3', '#3', 'b4', '#4', 'b5', '#5', 'b6', '#6', 'b7', '#7', 'b9', '#9', 'b11', '#11', 'b13', '#13'] as const
export type ChordAlteration = typeof chordAlteration[number]

export const chordExtensions = [5, 7, 9, 11, 13] as const
export type ChordExtension = typeof chordExtensions[number]

export const chordDegreeNumbers = [1, 2, 3, 4, 5, 6, 7, 9, 11, 13] as const
export type ChordDegreeNumber = typeof chordDegreeNumbers[number]

// https://en.wikipedia.org/wiki/Roman_numeral_analysis#Modes
// \u1d47 -> superscript b
// \u2070 -> superscript 0
// \u2075 -> superscript 5
export const chordNumerals = [
  'I', 'i', 'i\u2070',
  'II', '\u1d47II', 'ii', 'ii\u2070',
  '\u1d47III', 'iii', '\u1d47iii', 'iii\u2070',
  'IV', 'iv', '#iv\u2070',
  'V', '\u1d47V', 'v', 'v\u2070',
  '\u1d47VI', 'vi', 'vi\u2070',
  '\u1d47VII', 'vii', '\u1d47vii', 'vii\u2070'
] as const
export type ChordNumeral = typeof chordNumerals[number]

// Tone intervals in chord bases
const chordTypeIntervals: Record<ChordType, IntervalDistance[]> = {
  // 1, 2, 3, 4, 5, 6, 7
  maj: [0, 2, 4, 5, 7, 9, 11],
  // b3, b7
  min: [0, 2, 3, 5, 7, 9, 10],
  // b3, b5
  dim: [0, 2, 3, 5, 6, 9, 11],
  // b7
  dom: [0, 2, 4, 5, 7, 9, 10],
  // #5
  aug: [0, 2, 4, 5, 8, 9, 11],
  // 3 -> 2
  sus2: [0, 2, 2, 5, 7, 9, 11],
  // 3 -> 4
  sus4: [0, 2, 5, 5, 7, 9, 11],
  // b3, b5, 3 -> 2
  dimsus2: [0, 2, 2, 5, 6, 9, 11],
  // b3, b5, 3 -> 4
  dimsus4: [0, 2, 6, 5, 6, 9, 11],
  // #5, 3 -> 2
  augsus2: [0, 2, 2, 5, 8, 9, 11],
  // #5, 3 -> 4
  augsus4: [0, 2, 5, 5, 8, 9, 11]
}

interface ChordConfig {
  type?: ChordType,
  extension?: ChordExtension,
  additions?: ChordAddition[],
  alterations?: ChordAlteration[],
  slash?: StandardNote
}


// Functions / Classes

// function simplifyChord (root: AnyNote, type: ChordType): { root: StandardNote, type: ChordType } {
//   switch (type) {
//     case 'maj':
//       return { root: simplifyNote(root, 'Ionian'), type: 'maj' }
//     case 'min':
//       return { root: simplifyNote(root, 'Aeolian'), type: 'min' }
//     case 'dim':
//       return { root: simplifyNote(root, 'Locrian'), type: 'dim' }
//     case 'dimsus2':
//       return { root: simplifyNote(root, 'Locrian'), type: 'dimsus2' }
//     case 'dimsus4':
//       return { root: simplifyNote(root, 'Locrian'), type: 'dimsus4' }
//     case 'dom':
//       return { root: simplifyNote(root, 'Mixolydian'), type: 'dom' }
//     case 'sus2':
//       return { root: simplifyNote(root, 'Ionian'), type: 'maj' }
//     case 'sus4':
//     case 'aug':
//     case 'augsus2':
//     case 'augsus4':
//   }
// }

function getAlterationIntervals (chordType: ChordType, alteration: ChordAlteration): { base: IntervalDistance, altered: IntervalDistance } {
  const accidental = alteration[0]
  let adjustment = 0
  if (accidental === "#") {
    adjustment += 1
  } else if (accidental === "b") {
    adjustment -= 1
  }
  const degreeIndex = normalizeValue(Number(alteration[1]) - 1, 7)
  return {
    base: chordTypeIntervals[chordType][degreeIndex],
    altered: normalizeValue(chordTypeIntervals[chordType][degreeIndex] + adjustment, 12)
  }
}

function getAdditionInterval (chordType: ChordType, addition: ChordAddition): IntervalDistance {
  const degree = Number(addition[3])
  return chordTypeIntervals[chordType][normalizeValue(degree - 1, 12)]
}


// function getChordIntervalFromKeyNote(chordType: ChordType, note: ModeNote): IntervalData {
//   const chordKeyNotes =
// }

// function notes (c: ChordData): Note[] {
//   return chord.intervals(c).map(interval => {
//     const transposed = note.transpose(c.root, interval)
//     const signature = (new Mode('Ionian')).keySignature(c.root)
//
//     return 'A'
//   })
// }

export abstract class ChordData {
  readonly root: AnyNote
  readonly type: ChordType
  extension: ChordExtension
  additions: ChordAddition[]
  alterations: ChordAlteration[]
  slash: AnyNote

  protected constructor(root: AnyNote, type: ChordType, config?: ChordConfig) {
    this.root = root
    this.type = type
    this.extension = config && config.extension ? config.extension : 5
    this.additions = config && config.additions ? config.additions : []
    this.alterations = config && config.alterations ? config.alterations : []
    this.slash = config && config.slash ? config.slash : root
  }
}

export class Chord extends ChordData {
  constructor(root: AnyNote, type: ChordType, config?: ChordConfig) {
    super(root, type, config)
  }

  generateVoicings (): StandardNote[][] {
    return []
  }

  private intervals (): Interval[] {
    // Get base chord intervals based on extension
    let chordIntervals: IntervalDistance[] = []
    for (let i = 0; i < this.extension; i++) {
      if (i % 2 === 0) {
        chordIntervals.push(chordTypeIntervals[this.type][normalizeValue(i, 7)])
      }
    }

    // Add chord addition intervals
    this.additions.forEach(addition => {
      chordIntervals.push(getAdditionInterval(this.type, addition))
    })

    // Replace chord alteration intervals
    this.alterations.forEach(alteration => {
      const intervals = getAlterationIntervals(this.type, alteration)
      chordIntervals = chordIntervals.map(interval => {
        if (interval === intervals.base) {
          return intervals.altered
        } else {
          return interval
        }
      })
    })

    // Add slash interval
    let slashInterval: Interval | undefined
    if (this.slash != this.root) {
      slashInterval = interval(this.root, this.slash)
      chordIntervals.push(slashInterval.length)
    }

    chordIntervals = removeDuplicates(chordIntervals)

    chordIntervals.sort((a, b) => a - b)

    // Set slash interval first
    if (slashInterval) {
      while (chordIntervals[0] !== slashInterval.length) {
        chordIntervals = offsetArray(chordIntervals, 1)
      }
    }

    const intervalData = chordIntervals.map(intervalDistance => new Interval(intervalDistance))

    return intervalData
  }

  // notes (): ModeNote {
  //   const intervals = this.intervals()
  //   const mode = new IonianMode().key(this.root)
  //   return intervals.map(interval => {
  //
  //   })
  // }
}

export class MajorChord extends Chord {
  constructor(root: IonianStandardKey, config?: ChordConfig) {
    super(root, 'maj', config)
  }
}

// export class AnyMajorChord extends Chord {
//   constructor(root: IonianAnyKey, config?: ChordConfig) {
//     super(root, config)
//   }
// }
//
// export class MinorChord extends Chord {
//   constructor(root: AeolianStandardKey, config?: ChordConfig) {
//     super(root, config)
//   }
// }
//
// export class AnyMinorChord extends Chord {
//   constructor(root: AeolianAnyKey, config?: ChordConfig) {
//     super(root, config)
//   }
// }
//
// export class DiminishedChord extends Chord {
//   constructor(root: LocrianStandardKey, config?: ChordConfig) {
//     super(root, config)
//   }
// }
//
// export class DominantChord extends Chord {
//   constructor(root: MixolydianStandardKey, config?: ChordConfig) {
//     super(root, config)
//   }
// }
//
