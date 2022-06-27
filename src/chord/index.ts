import {
  interval,
  Interval,
  IntervalDistance, StandardIntervalDistance
} from "../interval"
import {
  wrapValue,
  rotateArray,
  removeDuplicates, getEvenNumbers, removeArrayElement, getShallowCopy
} from '../utils'
import {
  Note,
  StandardNote
} from '../note'
import {
  ALTERED_MODE_DEGREE,
  IonianStandardTonic,
  IonianTonic, isModeDegree,
  mode,
  MODE_DEGREE,
  ModeDegree,
  STANDARD_MODE_DEGREE,
  StandardModeDegree,
} from '../mode'
import { ionianKey, key } from "../key"

export const DIATONIC_CHORD_BASE = ['maj', 'min', 'dim'] as const
export type DiatonicChordType = typeof DIATONIC_CHORD_BASE[number]

export const CHORD_BASES = [...DIATONIC_CHORD_BASE, 'dom', 'sus2', 'sus4', 'aug'] as const
export type ChordBase = typeof CHORD_BASES[number]

export const CHORD_ADDITIONS = ['2', '4', '6', '9', '11', '13'] as const
export type ChordAddition = typeof CHORD_ADDITIONS[number]

export const CHORD_EXTENSIONS = ['7', '9', '11', '13'] as const
export type ChordExtension = typeof CHORD_EXTENSIONS[number]

export const STANDARD_CHORD_DEGREE = [...MODE_DEGREE, '9', '11', '13'] as const
export type StandardChordDegreeNumber = typeof STANDARD_CHORD_DEGREE[number]

export const ALTERED_CHORD_DEGREE = [...ALTERED_MODE_DEGREE, 'b9', '#9', 'b11', '#11', 'b13', '#13'] as const
export type AlteredChordDegreeNumber = typeof ALTERED_CHORD_DEGREE[number]

export const CHORD_DEGREE = [...STANDARD_CHORD_DEGREE, ...ALTERED_CHORD_DEGREE]
export type ChordDegree = typeof CHORD_DEGREE[number]
export function isChordDegree (degreeNumber: any): degreeNumber is ChordDegree {
  return CHORD_DEGREE.includes(degreeNumber)
}

export function chordDegreesToModeDegrees(chordDegrees: ChordDegree[]): ModeDegree[] {
  const modeDegrees = chordDegrees.map(degree => {
    switch (degree) {
      case 'b9':
        return 'b2'
      case '#9':
        return '#2'
      case '9':
        return '2'
      case 'b11':
        return 'b4'
      case '#11':
        return '#4'
      case '11':
        return '4'
      case 'b13':
        return 'b6'
      case '#13':
        return '#6'
      case '13':
        return '6'
      default:
        return degree
    }
  })

  return modeDegrees.filter(isModeDegree)
}

// https://en.wikipedia.org/wiki/Roman_numeral_analysis#Modes
// \u1d47 -> superscript b
// \u2070 -> superscript 0
// \u2075 -> superscript 5
export const CHORD_NUMERALS = [
  'I', 'i', 'i\u2070',
  'II', '\u1d47II', 'ii', 'ii\u2070',
  '\u1d47III', 'iii', '\u1d47iii', 'iii\u2070',
  'IV', 'iv', '#iv\u2070',
  'V', '\u1d47V', 'v', 'v\u2070',
  '\u1d47VI', 'vi', 'vi\u2070',
  '\u1d47VII', 'vii', '\u1d47vii', 'vii\u2070'
] as const
export type ChordNumeral = typeof CHORD_NUMERALS[number]

const CHORD_DEGREES_BY_BASE: Record<ChordBase, ChordDegree[]> = {
  maj: ['1', '3', '5', '7', '9', '11', '13'],
  // b3, b7
  min: ['1', 'b3', '5', 'b7', '9', '11', '13'],
  // b3, b5
  dim: ['1', 'b3', 'b5', '7', '9', '11', '13'],
  // b7
  dom: ['1', '3', '5', 'b7', '9', '11', '13'],
  // #5
  aug: ['1', '3', '#5', '7', '9', '11', '13'],
  // 3 -> 2
  sus2: ['1', '2', '5', '7', '9', '11', '13'],
  // 3 -> 4
  sus4: ['1', '4', '5', '7', '9', '11', '13']
}

interface ChordType {
  base: ChordBase,
  extension?: ChordExtension,
  additions?: ChordAddition[],
  alterations?: AlteredChordDegreeNumber[],
  slash?: StandardNote
}

export interface Chord {
  root: Note
  base: ChordBase
  extension?: ChordExtension
  additions?: ChordAddition[]
  alterations?: AlteredChordDegreeNumber[]
  slash?: Note
  intervals: Interval[]
  degrees: ChordDegree[]
  notes: Note[]
  name: string
}

// Strip b or #
function degreeNumber(degree: ChordDegree | ModeDegree): number {
  if (degree[0] !== '#' && degree[0] !== 'b') {
    return parseInt(degree)
  } else {
    return parseInt(degree.slice(1, degree.length))
  }
}

function generateChordName(tonic: IonianTonic, type: ChordType): string {
  let name = `${tonic}${type.base}${type.extension || ''}`
  if (type.alterations) {
    type.alterations.forEach(alteration => { name = name.concat(alteration)})
  }

  if (type.additions) {
    type.additions.forEach(addition => {name = name.concat(`add${addition}`)})
  }

  if (type.slash) {
    name = name.concat(`/${type.slash}`)
  }

  return name
}

function insertDegree(degrees: ChordDegree[], degree: ChordDegree): ChordDegree[]
function insertDegree(degrees: ModeDegree[], degree: ModeDegree): ModeDegree[]
function insertDegree(degrees: ModeDegree[] | ChordDegree[], degree: ModeDegree | ChordDegree): ModeDegree[] | ChordDegree[] {
  const degreesCopy = getShallowCopy(degrees)

  for (let i = degreesCopy.length - 1; i >= 0; i--) {
    const chordDegree = degreesCopy[i]
    if (degreeNumber(chordDegree) < degreeNumber(degree)) {
      degreesCopy.splice(i + 1, 0, degree)
      break
    }
  }

  return degreesCopy
}

export function chord(tonic: IonianTonic, type: ChordType): Chord {
  const chordKey = key(tonic, 'Ionian')
  const extensionIndex = type.extension ? Math.ceil(parseInt(type.extension) / 2) : 3
  let chordDegrees: ChordDegree[] = CHORD_DEGREES_BY_BASE[type.base].slice(0, extensionIndex)

  if (type.additions) {
    type.additions.forEach(addition => {
      chordDegrees = insertDegree(chordDegrees, addition)
    })
  }

  if (type.alterations) {
    type.alterations.forEach(alteration => {
      const unalteredIndex = chordDegrees.findIndex(degree => degree === alteration[1])
      if (unalteredIndex) {
        chordDegrees = removeArrayElement(chordDegrees, unalteredIndex)
      }

      chordDegrees = insertDegree(chordDegrees, alteration)
    })
  }

  if (type.slash) {
    const slashDegree = chordKey.degreesByNote[type.slash]

    chordDegrees = insertDegree(chordDegrees, slashDegree)

    const slashDegreeIndex = chordDegrees.findIndex(degree => degree === slashDegree)
    if (slashDegreeIndex) {
      chordDegrees = rotateArray(chordDegrees, slashDegreeIndex)
    }
  }

  const modeDegrees = chordDegreesToModeDegrees(chordDegrees)

  return {
    ...type,
    root: tonic,
    notes: modeDegrees.map(degree => chordKey.notesByDegree[degree]),
    name: generateChordName(tonic, type),
    intervals: [],
    degrees: chordDegrees,
    slash: type.slash
  }
}

// Tone intervals in chord bases
// const CHORD_TYPE_INTERVALS: Record<ChordType, StandardIntervalDistance[]> = {
//   // 1, 2, 3, 4, 5, 6, 7
//   maj: [0, 2, 4, 5, 7, 9, 11],
//   // b3, b7
//   min: [0, 2, 3, 5, 7, 9, 10],
//   // b3, b5
//   dim: [0, 2, 3, 5, 6, 9, 11],
//   // b7
//   dom: [0, 2, 4, 5, 7, 9, 10],
//   // #5
//   aug: [0, 2, 4, 5, 8, 9, 11],
//   // 3 -> 2
//   sus2: [0, 2, 2, 5, 7, 9, 11],
//   // 3 -> 4
//   sus4: [0, 2, 5, 5, 7, 9, 11],
//   // b3, b5, 3 -> 2
//   dimsus2: [0, 2, 2, 5, 6, 9, 11],
//   // b3, b5, 3 -> 4
//   dimsus4: [0, 2, 6, 5, 6, 9, 11],
//   // #5, 3 -> 2
//   augsus2: [0, 2, 2, 5, 8, 9, 11],
//   // #5, 3 -> 4
//   augsus4: [0, 2, 5, 5, 8, 9, 11]
// }




// function getAlterationIntervals (chordType: ChordType, alteration: ChordAlteration): { base: IntervalDistance, altered: IntervalDistance } {
//   const accidental = alteration[0]
//   let adjustment = 0
//   if (accidental === "#") {
//     adjustment += 1
//   } else if (accidental === "b") {
//     adjustment -= 1
//   }
//   const degreeIndex = wrapValue(Number(alteration[1]) - 1, 7)
//   return {
//     base: CHORD_TYPE_INTERVALS[chordType][degreeIndex],
//     altered: wrapValue(CHORD_TYPE_INTERVALS[chordType][degreeIndex] + adjustment, 12) as IntervalDistance
//   }
// }
//
// function getAdditionInterval (chordType: ChordType, addition: ChordAddition): IntervalDistance {
//   const degree = Number(addition[3])
//   return CHORD_TYPE_INTERVALS[chordType][wrapValue(degree - 1, 12)]
// }


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



// class ChordClass {
//   constructor(root: Note, type: ChordType, config?: ChordConfig) {
//     super(root, type, config)
//   }
//
//   generateVoicings (): StandardNote[][] {
//     return []
//   }
//
//   private intervals (): Interval[] {
//     // Get base chord intervals based on extension
//     let chordIntervals: IntervalDistance[] = []
//     for (let i = 0; i < this.extension; i++) {
//       if (i % 2 === 0) {
//         chordIntervals.push(CHORD_TYPE_INTERVALS[this.type][wrapValue(i, 7)])
//       }
//     }
//
//     // Add chord addition intervals
//     this.additions.forEach(addition => {
//       chordIntervals.push(getAdditionInterval(this.type, addition))
//     })
//
//     // Replace chord alteration intervals
//     this.alterations.forEach(alteration => {
//       const intervals = getAlterationIntervals(this.type, alteration)
//       chordIntervals = chordIntervals.map(interval => {
//         if (interval === intervals.base) {
//           return intervals.altered
//         } else {
//           return interval
//         }
//       })
//     })
//
//     // Add slash interval
//     let slashInterval: Interval | undefined
//     if (this.slash != this.root) {
//       slashInterval = interval(this.root, this.slash)
//       chordIntervals.push(slashInterval.length)
//     }
//
//     chordIntervals = removeDuplicates(chordIntervals)
//
//     chordIntervals.sort((a, b) => a - b)
//
//     // Set slash interval first
//     if (slashInterval) {
//       while (chordIntervals[0] !== slashInterval.length) {
//         chordIntervals = rotateArray(chordIntervals, 1)
//       }
//     }
//
//     const intervalData = chordIntervals.map(intervalDistance => new Interval(intervalDistance))
//
//     return intervalData
//   }
//
//   notes (): ModeNote {
//     const intervals = this.intervals()
//     const mode = new IonianMode().key(this.root)
//     return intervals.map(interval => {
//
//     })
//   }
// }

// export class MajorChord extends Chord {
//   constructor(root: IonianStandardTonic, config?: ChordConfig) {
//     super(root, 'maj', config)
//   }
// }

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

