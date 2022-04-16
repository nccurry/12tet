
import { ChordNumeral, DiatonicChordType } from "../chord"
import { getTypedObjectKeys } from "../utils"
import { ShortIntervalName } from "../interval"
import {ModeNote} from '../note'

// Types
interface ModeKey {
  notes: ModeNote[]
  signature: ModeKeySignature
}

export type Mode = {
  chordNumerals: ChordNumeral[]
  chordBases: DiatonicChordType[]
  semitoneStructure: number[]
  intervals: ShortIntervalName[]
  keys: {
    [key in ModeNote]?: ModeKey
  }
}

export const modeKeySignature = ['', '#', '##', '###', '####', '#####', '######', '#######', 'b', 'bb', 'bbb', 'bbbb', 'bbbbb', 'bbbbbb', 'bbbbbbb'] as const
export type ModeKeySignature = typeof modeKeySignature[number]


export const modeNames = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'] as const
export type ModeName = typeof modeNames[number]

export const modeDegreeNumbers = [1, 2, 3, 4, 5, 6, 7]
export type ModeDegreeNumber = typeof modeDegreeNumbers[number]

interface ModeDegreeComplex {
  number: ModeDegreeNumber,
  accidental?: '' | '#' | 'b'
}

export type ModeDegree = ModeDegreeNumber | ModeDegreeComplex



// https://en.wikipedia.org/wiki/Degree_(music)#Scale_degree_names
export const modeDegreeNames = ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic', 'Leading Tone'] as const
export type ModeDegreeNames = typeof modeDegreeNames[number]

// Data

const modeData : Record<ModeName, Mode> = {
  Ionian: {
    chordNumerals: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u2070'],
    chordBases: ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'],
    semitoneStructure: [2, 2, 1, 2, 2, 2],
    intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7', 'P8'],
    keys: {
      C: {
        signature: '',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
      },
      G: {
        signature: '#',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#']
      },
      D: {
        signature: '##',
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']
      },
      A: {
        signature: '###',
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']
      },
      E: {
        signature: '####',
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']
      },
      B: {
        signature: '#####',
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
      },
      'F#': {
        signature: '######',
        notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#']
      },
      'C#': {
        signature: '#######',
        notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#']
      },
      Cb: {
        signature: 'bbbbbbb',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']
      },
      Gb: {
        signature: 'bbbbbb',
        notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']
      },
      Db: {
        signature: 'bbbbb',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']
      },
      Ab: {
        signature: 'bbbb',
        notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G']
      },
      Eb: {
        signature: 'bbb',
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']
      },
      Bb: {
        signature: 'bb',
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A']
      },
      F: {
        signature: 'b',
        notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']
      }
    }
  },
  Dorian: {
    chordNumerals: ['i', 'ii', '\u1d47III', 'IV', 'v', 'vi\u2070', '\u1d47VII'],
    chordBases: ['min', 'min', 'maj', 'maj', 'min', 'dim', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 2, 1],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7', 'P8'],
    keys: {
      D: {
        signature: '',
        notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
      },
      A: {
        signature: '#',
        notes: ['A', 'B', 'C', 'D', 'E', 'F#', 'G']
      },
      E: {
        signature: '##',
        notes: ['E', 'F#', 'G', 'A', 'B', 'C#', 'D']
      },
      B: {
        signature: '###',
        notes: ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A']
      },
      'F#': {
        signature: '####',
        notes: ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E']
      },
      'C#': {
        signature: '#####',
        notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B']
      },
      'G#': {
        signature: '######',
        notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#']
      },
      'D#': {
        signature: '#######',
        notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#']
      },
      Db: {
        signature: 'bbbbbbb',
        notes: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']
      },
      Ab: {
        signature: 'bbbbbb',
        notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb']
      },
      Eb: {
        signature: 'bbbbb',
        notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db']
      },
      Bb: {
        signature: 'bbbb',
        notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab']
      },
      F: {
        signature: 'bbb',
        notes: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb']
      },
      C: {
        signature: 'bb',
        notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb']
      },
      G: {
        signature: 'b',
        notes: ['G', 'A', 'Bb', 'C', 'D', 'E', 'F']
      }
    }
  },
  Phrygian: {
    chordNumerals: ['i', '\u1d47II', '\u1d47III', 'iv', 'v\u2070', '\u1d47VI', '\u1d47vii'],
    chordBases: ['min', 'maj', 'maj', 'min', 'dim', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 2, 1, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    keys: {
      E: {
        signature: '',
        notes: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
      },
      B: {
        signature: '#',
        notes: ['B', 'C', 'D', 'E', 'F#', 'G', 'A']
      },
      'F#': {
        signature: '##',
        notes: ['F#', 'G', 'A', 'B', 'C#', 'D', 'E']
      },
      'C#': {
        signature: '###',
        notes: ['C#', 'D', 'E', 'F#', 'G#', 'A', 'B']
      },
      'G#': {
        signature: '####',
        notes: ['G#', 'A', 'B', 'C#', 'D#', 'E', 'F#']
      },
      'D#': {
        signature: '#####',
        notes: ['D#', 'E', 'F#', 'G#', 'A#', 'B', 'C#']
      },
      'A#': {
        signature: '######',
        notes: ['A#', 'B', 'C#', 'D#', 'E#', 'F#', 'G#']
      },
      'E#': {
        signature: '#######',
        notes: ['E#', 'F#', 'G#', 'A#', 'B#', 'C#', 'D#']
      },
      Eb: {
        signature: 'bbbbbbb',
        notes: ['Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']
      },
      Bb: {
        signature: 'bbbbbb',
        notes: ['Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab']
      },
      F: {
        signature: 'bbbbb',
        notes: ['F', 'Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb']
      },
      C: {
        signature: 'bbbb',
        notes: ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb']
      },
      G: {
        signature: 'bbb',
        notes: ['G', 'Ab', 'Bb', 'C', 'D', 'Eb', 'F']
      },
      D: {
        signature: 'bb',
        notes: ['D', 'Eb', 'F', 'G', 'A', 'Bb', 'C']
      },
      A: {
        signature: 'b',
        notes: ['A', 'Bb', 'C', 'D', 'E', 'F', 'G']
      }
    }
  },
  Lydian: {
    chordNumerals: ['I', 'II', 'iii', '#iv\u2070', 'V', 'vi', 'vii'],
    chordBases: ['maj', 'maj', 'min', 'dim', 'maj', 'min', 'min'],
    semitoneStructure: [2, 2, 2, 1, 2, 2],
    intervals: ['P1', 'M2', 'M3', 'TT', 'P5', 'M6', 'M7'],
    keys: {
      F: {
        signature: '',
        notes: ['F', 'G', 'A', 'B', 'C', 'D', 'E']
      },
      C: {
        signature: '#',
        notes: ['C', 'D', 'E', 'F#', 'G', 'A', 'B']
      },
      G: {
        signature: '##',
        notes: ['G', 'A', 'B', 'C#', 'D', 'E', 'F#']
      },
      D: {
        signature: '###',
        notes: ['D', 'E', 'F#', 'G#', 'A', 'B', 'C#']
      },
      A: {
        signature: '####',
        notes: ['A', 'B', 'C#', 'D#', 'E', 'F#', 'G#']
      },
      E: {
        signature: '#####',
        notes: ['E', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']
      },
      B: {
        signature: '######',
        notes: ['B', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']
      },
      'F#': {
        signature: '#######',
        notes: ['F#', 'G#', 'A#', 'B#', 'C#', 'D#', 'E#']
      },
      Fb: {
        signature: 'bbbbbbb',
        notes: ['Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb']
      },
      Cb: {
        signature: 'bbbbbb',
        notes: ['Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']
      },
      Gb: {
        signature: 'bbbbb',
        notes: ['Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']
      },
      Db: {
        signature: 'bbbb',
        notes: ['Db', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']
      },
      Ab: {
        signature: 'bbb',
        notes: ['Ab', 'Bb', 'C', 'D', 'Eb', 'F', 'G']
      },
      Eb: {
        signature: 'bb',
        notes: ['Eb', 'F', 'G', 'A', 'Bb', 'C', 'D']
      },
      Bb: {
        signature: 'b',
        notes: ['Bb', 'C', 'D', 'E', 'F', 'G', 'A']
      }
    }
  },
  Mixolydian: {
    chordNumerals: ['I', 'ii', 'iii\u2070', 'IV', 'v', 'vi', '\u1d47VII'],
    chordBases: ['maj', 'min', 'dim', 'maj', 'min', 'min', 'maj'],
    semitoneStructure: [2, 2, 1, 2, 2, 1],
    intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
    keys: {
      G: {
        signature: '',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F']
      },
      D: {
        signature: '#',
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C']
      },
      A: {
        signature: '##',
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G']
      },
      E: {
        signature: '###',
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D']
      },
      B: {
        signature: '####',
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A']
      },
      'F#': {
        signature: '#####',
        notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E']
      },
      'C#': {
        signature: '######',
        notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B']
      },
      'G#': {
        signature: '#######',
        notes: ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F#']
      },
      Gb: {
        signature: 'bbbbbbb',
        notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb']
      },
      Db: {
        signature: 'bbbbbb',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb']
      },
      Ab: {
        signature: 'bbbbb',
        notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'Gb']
      },
      Eb: {
        signature: 'bbbb',
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'Db']
      },
      Bb: {
        signature: 'bbb',
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'Ab']
      },
      F: {
        signature: 'bb',
        notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'Eb']
      },
      C: {
        signature: 'b',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb']
      }
    }
  },
  Aeolian: {
    chordNumerals: ['i', 'ii\u2070', '\u1d47III', 'iv', 'v', '\u1d47VI', '\u1d47VII'],
    chordBases: ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 1, 2],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    keys: {
      A: {
        signature: '',
        notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      },
      E: {
        signature: '#',
        notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D']
      },
      B: {
        signature: '##',
        notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A']
      },
      'F#': {
        signature: '###',
        notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E']
      },
      'C#': {
        signature: '####',
        notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B']
      },
      'G#': {
        signature: '#####',
        notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#']
      },
      'D#': {
        signature: '######',
        notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#']
      },
      'A#': {
        signature: '#######',
        notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#']
      },
      Ab: {
        signature: 'bbbbbbb',
        notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb']
      },
      Eb: {
        signature: 'bbbbbb',
        notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']
      },
      Bb: {
        signature: 'bbbbb',
        notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab']
      },
      F: {
        signature: 'bbbb',
        notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb']
      },
      C: {
        signature: 'bbb',
        notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']
      },
      G: {
        signature: 'bb',
        notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F']
      },
      D: {
        signature: 'b',
        notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C']
      }
    }
  },
  Locrian: {
    chordNumerals: ['i\u2070', '\u1d47II', '\u1d47iii', 'iv', '\u1d47V', '\u1d47VI', '\u1d47vii'],
    chordBases: ['dim', 'maj', 'min', 'min', 'maj', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 1, 2, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'TT', 'm6', 'm7'],
    keys: {
      B: {
        signature: '',
        notes: ['B', 'C', 'D', 'E', 'F', 'G', 'A']
      },
      'F#': {
        signature: '#',
        notes: ['F#', 'G', 'A', 'B', 'C', 'D', 'E']
      },
      'C#': {
        signature: '##',
        notes: ['C#', 'D', 'E', 'F#', 'G', 'A', 'B']
      },
      'G#': {
        signature: '###',
        notes: ['G#', 'A', 'B', 'C#', 'D', 'E', 'F#']
      },
      'D#': {
        signature: '####',
        notes: ['D#', 'E', 'F#', 'G#', 'A', 'B', 'C#']
      },
      'A#': {
        signature: '#####',
        notes: ['A#', 'B', 'C#', 'D#', 'E', 'F#', 'G#']
      },
      'E#': {
        signature: '######',
        notes: ['E#', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']
      },
      'B#': {
        signature: '#######',
        notes: ['B#', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']
      },
      Bb: {
        signature: 'bbbbbbb',
        notes: ['Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab']
      },
      F: {
        signature: 'bbbbbb',
        notes: ['F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb']
      },
      C: {
        signature: 'bbbbb',
        notes: ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']
      },
      G: {
        signature: 'bbbb',
        notes: ['G', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']
      },
      D: {
        signature: 'bbb',
        notes: ['D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']
      },
      A: {
        signature: 'bb',
        notes: ['A', 'Bb', 'C', 'D', 'Eb', 'F', 'G']
      },
      E: {
        signature: 'b',
        notes: ['E', 'F', 'G', 'A', 'Bb', 'C', 'D']
      }
    }
  }
}

// Functions

function names (): readonly ModeName[] {
  return modeNames
}

function chordNumerals (modeName: ModeName): ChordNumeral[] {
  return modeData[modeName].chordNumerals
}

function chordBases (modeName: ModeName): DiatonicChordType[] {
  return modeData[modeName].chordBases
}

function intervals (modeName: ModeName): ShortIntervalName[] {
  return modeData[modeName].intervals
}

function keys (modeName: ModeName): ModeNote[] {
  return getTypedObjectKeys(modeData[modeName].keys)
}

function keySignature (modeName: ModeName, key: ModeNote): ModeKeySignature | undefined {
  return modeData[modeName].keys[key]?.signature
}

function keyNotes (modeName: ModeName, key: ModeNote): ModeNote[] | undefined {
  return modeData[modeName].keys[key]?.notes
}

export const mode = {
  names,
  chordNumerals,
  chordBases,
  intervals,
  keys,
  keySignature,
  keyNotes
}
