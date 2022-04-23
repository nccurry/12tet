import { Chord, ChordNumeral, DiatonicChordType } from "../chord"
import { ShortIntervalName } from "../interval"
import {AnyNote, StandardNote} from '../note'

// Data / Types

interface ModeKey {
  notes: StandardNote[]
  signature: ModeKeySignature
}

export const MODE_KEY_SIGNATURE = ['', '#', '##', '###', '####', '#####', '######', '#######', 'b', 'bb', 'bbb', 'bbbb', 'bbbbb', 'bbbbbb', 'bbbbbbb'] as const
export type ModeKeySignature = typeof MODE_KEY_SIGNATURE[number]
export function isModeKeySignature (signature: any): signature is ModeKeySignature {
  return MODE_KEY_SIGNATURE.includes((signature as ModeKeySignature))
}

export const MODE_NAMES = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'] as const
export type ModeName = typeof MODE_NAMES[number]

type ModeKeyIdentifier = ModeKeySignature | StandardNote

export const MODE_DEGREE_NUMBERS = [1, 2, 3, 4, 5, 6, 7]
export type ModeDegreeNumber = typeof MODE_DEGREE_NUMBERS[number]

interface ModeDegreeComplex {
  number: ModeDegreeNumber,
  accidental?: '' | '#' | 'b'
}

export type ModeDegree = ModeDegreeNumber | ModeDegreeComplex

// https://en.wikipedia.org/wiki/Degree_(music)#Scale_degree_names
export const MODE_DEGREE_NAMES: readonly string[] = ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic', 'Leading Tone'] as const
export type ModeDegreeNames = typeof MODE_DEGREE_NAMES[number]

export const IONIAN_STANDARD_KEYS: readonly StandardNote[] = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'] as const
export const IONIAN_THEORETICAL_KEYS: readonly AnyNote[] = ['G#', 'D#', 'A#', 'E#', 'B#', 'F##', 'C##', 'Cbb', 'Gbb', 'Dbb', 'Abb', 'Ebb', 'Bbb', 'Fb'] as const
export type IonianStandardKey = typeof IONIAN_STANDARD_KEYS[number]
export type IonianTheoreticalKey = typeof IONIAN_STANDARD_KEYS[number]
export type IonianAnyKey = IonianStandardKey | IonianTheoreticalKey
export function isIonianStandardKey (note: AnyNote): note is IonianStandardKey {
  return IONIAN_STANDARD_KEYS.includes((note as IonianStandardKey))
}
export function isIonianTheoreticalKey (note: AnyNote): note is IonianTheoreticalKey {
  return IONIAN_THEORETICAL_KEYS.includes((note as IonianTheoreticalKey))
}
export function isIonianAnyKey (note: AnyNote): note is IonianTheoreticalKey {
  return isIonianStandardKey(note) || isIonianTheoreticalKey(note)
}

interface IonianData extends ModeData { keyByTonic: Record<IonianStandardKey, ModeKey>, keyBySignature: Record<ModeKeySignature, ModeKey> }

export const DORIAN_STANDARD_KEYS: readonly StandardNote[] = ['D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G'] as const
export const DORIAN_THEORETICAL_KEYS: readonly AnyNote[] = ['A#', 'E#', 'B#', 'F##', 'C##', 'G##', 'D##', 'Dbb', 'Abb', 'Ebb', 'Bbb', 'Fb', 'Cb', 'Gb'] as const
export type DorianStandardKey = typeof DORIAN_STANDARD_KEYS[number]
export type DorianTheoreticalKey = typeof DORIAN_THEORETICAL_KEYS[number]
export type DorianAnyKey = DorianStandardKey | DorianTheoreticalKey
export function isDorianStandardKey (note: AnyNote): note is DorianStandardKey {
  return DORIAN_STANDARD_KEYS.includes((note as DorianStandardKey))
}
export function isDorianTheoreticalKey (note: AnyNote): note is DorianTheoreticalKey {
  return DORIAN_THEORETICAL_KEYS.includes((note as DorianTheoreticalKey))
}
export function isDorianAnyKey (note: AnyNote): note is DorianAnyKey {
  return isDorianStandardKey(note) || isDorianTheoreticalKey(note)
}

interface DorianData extends ModeData { keyByTonic: Record<DorianStandardKey, ModeKey>, keyBySignature: Record<ModeKeySignature, ModeKey> }


export const PHRYGIAN_KEYS = ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A'] as const
export type PhrygianKey = typeof PHRYGIAN_KEYS[number]
interface PhrygianData extends ModeData { keyByTonic: Record<PhrygianKey, ModeKey>, keyBySignature: Record<ModeKeySignature, ModeKey> }
export function isPhrygianKey (note: AnyNote): note is PhrygianKey {
  return PHRYGIAN_KEYS.includes((note as PhrygianKey))
}

export const LYDIAN_KEYS = ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'] as const
export type LydianKey = typeof LYDIAN_KEYS[number]
interface LydianData extends ModeData { keyByTonic: Record<LydianKey, ModeKey>, keyBySignature: Record<ModeKeySignature, ModeKey> }
export function isLydianKey (note: AnyNote): note is LydianKey {
  return LYDIAN_KEYS.includes((note as LydianKey))
}

export const MIXOLYDIAN_KEYS = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'] as const
export type MixolydianKey = typeof MIXOLYDIAN_KEYS[number]
interface MixolydianData extends ModeData { keyByTonic: Record<MixolydianKey, ModeKey>, keyBySignature: Record<ModeKeySignature, ModeKey> }
export function isMixolydianKey (note: AnyNote): note is MixolydianKey {
  return MIXOLYDIAN_KEYS.includes((note as MixolydianKey))
}

export const AEOLIAN_KEYS = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'] as const
export type AeolianKey = typeof AEOLIAN_KEYS[number]
interface AeolianData extends ModeData { keyByTonic: Record<AeolianKey, ModeKey>, keyBySignature: Record<ModeKeySignature, ModeKey> }
export function isAeolianKey (note: AnyNote): note is AeolianKey {
  return AEOLIAN_KEYS.includes((note as AeolianKey))
}

export const LOCRIAN_KEYS = ['B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E'] as const
export type LocrianKey = typeof LOCRIAN_KEYS[number]
interface LocrianData extends ModeData { keyByTonic: Record<LocrianKey, ModeKey>, keyBySignature: Record<ModeKeySignature, ModeKey> }
export function isLocrianKey (note: AnyNote): note is LocrianKey {
  return LOCRIAN_KEYS.includes((note as LocrianKey))
}

export function isInMode (note: AnyNote, mode: ModeName): boolean {
  switch (mode) {
    case 'Ionian':
      return isIonianStandardKey(note)
    case 'Dorian':
      return isDorianStandardKey(note)
    case 'Phrygian':
      return isPhrygianKey(note)
    case 'Lydian':
      return isLydianKey(note)
    case 'Mixolydian':
      return isMixolydianKey(note)
    case 'Aeolian':
      return isAeolianKey(note)
    case 'Locrian':
      return isLocrianKey(note)
  }
}

const MODE_DATA : {
  Ionian: IonianData,
  Dorian: DorianData,
  Phrygian: PhrygianData,
  Lydian: LydianData,
  Mixolydian: MixolydianData,
  Aeolian: AeolianData,
  Locrian: LocrianData
} = {
  Ionian: {
    name: 'Ionian',
    chordNumerals: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u2070'],
    chordBases: ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'],
    semitoneStructure: [2, 2, 1, 2, 2, 2, 1],
    intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7', 'P8'],
    ionianAdjustment: [0, 0, 0, 0, 0, 0, 0],
    keyByTonic: {
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
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
      },
      '#': {
        signature: '#',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#']
      },
      '##': {
        signature: '##',
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']
      },
      '###': {
        signature: '###',
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']
      },
      '####': {
        signature: '####',
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']
      },
      '#####': {
        signature: '#####',
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
      },
      '######': {
        signature: '######',
        notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#']
      },
      '#######': {
        signature: '#######',
        notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#']
      },
      bbbbbbb: {
        signature: 'bbbbbbb',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']
      },
      bbbbbb: {
        signature: 'bbbbbb',
        notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']
      },
      bbbbb: {
        signature: 'bbbbb',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']
      },
      bbbb: {
        signature: 'bbbb',
        notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G']
      },
      bbb: {
        signature: 'bbb',
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']
      },
      bb: {
        signature: 'bb',
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A']
      },
      b: {
        signature: 'b',
        notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']
      }
    }
  },
  Dorian: {
    name: 'Dorian',
    chordNumerals: ['i', 'ii', '\u1d47III', 'IV', 'v', 'vi\u2070', '\u1d47VII'],
    chordBases: ['min', 'min', 'maj', 'maj', 'min', 'dim', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 2, 1, 2],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7', 'P8'],
    ionianAdjustment: [0, 0, -1, 0, 0, 0, -1],
    keyByTonic: {
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
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
      },
      '#': {
        signature: '#',
        notes: ['A', 'B', 'C', 'D', 'E', 'F#', 'G']
      },
      '##': {
        signature: '##',
        notes: ['E', 'F#', 'G', 'A', 'B', 'C#', 'D']
      },
      '###': {
        signature: '###',
        notes: ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A']
      },
      '####': {
        signature: '####',
        notes: ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E']
      },
      '#####': {
        signature: '#####',
        notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B']
      },
      '######': {
        signature: '######',
        notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#']
      },
      '#######': {
        signature: '#######',
        notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#']
      },
      bbbbbbb: {
        signature: 'bbbbbbb',
        notes: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']
      },
      bbbbbb: {
        signature: 'bbbbbb',
        notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb']
      },
      bbbbb: {
        signature: 'bbbbb',
        notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db']
      },
      bbbb: {
        signature: 'bbbb',
        notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab']
      },
      bbb: {
        signature: 'bbb',
        notes: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb']
      },
      bb: {
        signature: 'bb',
        notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb']
      },
      b: {
        signature: 'b',
        notes: ['G', 'A', 'Bb', 'C', 'D', 'E', 'F']
      }
    }
  },
  Phrygian: {
    name: 'Phrygian',
    chordNumerals: ['i', '\u1d47II', '\u1d47III', 'iv', 'v\u2070', '\u1d47VI', '\u1d47vii'],
    chordBases: ['min', 'maj', 'maj', 'min', 'dim', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 2, 1, 2, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    ionianAdjustment: [0, -1, -1, 0, 0, -1, -1],
    keyByTonic: {
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
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
      },
      '#': {
        signature: '#',
        notes: ['B', 'C', 'D', 'E', 'F#', 'G', 'A']
      },
      '##': {
        signature: '##',
        notes: ['F#', 'G', 'A', 'B', 'C#', 'D', 'E']
      },
      '###': {
        signature: '###',
        notes: ['C#', 'D', 'E', 'F#', 'G#', 'A', 'B']
      },
      '####': {
        signature: '####',
        notes: ['G#', 'A', 'B', 'C#', 'D#', 'E', 'F#']
      },
      '#####': {
        signature: '#####',
        notes: ['D#', 'E', 'F#', 'G#', 'A#', 'B', 'C#']
      },
      '######': {
        signature: '######',
        notes: ['A#', 'B', 'C#', 'D#', 'E#', 'F#', 'G#']
      },
      '#######': {
        signature: '#######',
        notes: ['E#', 'F#', 'G#', 'A#', 'B#', 'C#', 'D#']
      },
      bbbbbbb: {
        signature: 'bbbbbbb',
        notes: ['Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']
      },
      bbbbbb: {
        signature: 'bbbbbb',
        notes: ['Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab']
      },
      bbbbb: {
        signature: 'bbbbb',
        notes: ['F', 'Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb']
      },
      bbbb: {
        signature: 'bbbb',
        notes: ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb']
      },
      bbb: {
        signature: 'bbb',
        notes: ['G', 'Ab', 'Bb', 'C', 'D', 'Eb', 'F']
      },
      bb: {
        signature: 'bb',
        notes: ['D', 'Eb', 'F', 'G', 'A', 'Bb', 'C']
      },
      b: {
        signature: 'b',
        notes: ['A', 'Bb', 'C', 'D', 'E', 'F', 'G']
      }
    }
  },
  Lydian: {
    name: 'Lydian',
    chordNumerals: ['I', 'II', 'iii', '#iv\u2070', 'V', 'vi', 'vii'],
    chordBases: ['maj', 'maj', 'min', 'dim', 'maj', 'min', 'min'],
    semitoneStructure: [2, 2, 2, 1, 2, 2, 1],
    intervals: ['P1', 'M2', 'M3', 'TT', 'P5', 'M6', 'M7'],
    ionianAdjustment: [0, 0, 0, 1, 0, 0, 0],
    keyByTonic: {
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
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['F', 'G', 'A', 'B', 'C', 'D', 'E']
      },
      '#': {
        signature: '#',
        notes: ['C', 'D', 'E', 'F#', 'G', 'A', 'B']
      },
      '##': {
        signature: '##',
        notes: ['G', 'A', 'B', 'C#', 'D', 'E', 'F#']
      },
      '###': {
        signature: '###',
        notes: ['D', 'E', 'F#', 'G#', 'A', 'B', 'C#']
      },
      '####': {
        signature: '####',
        notes: ['A', 'B', 'C#', 'D#', 'E', 'F#', 'G#']
      },
      '#####': {
        signature: '#####',
        notes: ['E', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']
      },
      '######': {
        signature: '######',
        notes: ['B', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']
      },
      '#######': {
        signature: '#######',
        notes: ['F#', 'G#', 'A#', 'B#', 'C#', 'D#', 'E#']
      },
      bbbbbbb: {
        signature: 'bbbbbbb',
        notes: ['Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb']
      },
      bbbbbb: {
        signature: 'bbbbbb',
        notes: ['Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']
      },
      bbbbb: {
        signature: 'bbbbb',
        notes: ['Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']
      },
      bbbb: {
        signature: 'bbbb',
        notes: ['Db', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']
      },
      bbb: {
        signature: 'bbb',
        notes: ['Ab', 'Bb', 'C', 'D', 'Eb', 'F', 'G']
      },
      bb: {
        signature: 'bb',
        notes: ['Eb', 'F', 'G', 'A', 'Bb', 'C', 'D']
      },
      b: {
        signature: 'b',
        notes: ['Bb', 'C', 'D', 'E', 'F', 'G', 'A']
      }
    },
  },
  Mixolydian: {
    name: 'Mixolydian',
    chordNumerals: ['I', 'ii', 'iii\u2070', 'IV', 'v', 'vi', '\u1d47VII'],
    chordBases: ['maj', 'min', 'dim', 'maj', 'min', 'min', 'maj'],
    semitoneStructure: [2, 2, 1, 2, 2, 1, 2],
    intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
    ionianAdjustment: [0, 0, 0, 0, 0, 0, -1],
    keyByTonic: {
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
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F']
      },
      '#': {
        signature: '#',
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C']
      },
      '##': {
        signature: '##',
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G']
      },
      '###': {
        signature: '###',
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D']
      },
      '####': {
        signature: '####',
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A']
      },
      '#####': {
        signature: '#####',
        notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E']
      },
      '######': {
        signature: '######',
        notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B']
      },
      '#######': {
        signature: '#######',
        notes: ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F#']
      },
      bbbbbbb: {
        signature: 'bbbbbbb',
        notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb']
      },
      bbbbbb: {
        signature: 'bbbbbb',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb']
      },
      bbbbb: {
        signature: 'bbbbb',
        notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'Gb']
      },
      bbbb: {
        signature: 'bbbb',
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'Db']
      },
      bbb: {
        signature: 'bbb',
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'Ab']
      },
      bb: {
        signature: 'bb',
        notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'Eb']
      },
      b: {
        signature: 'b',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb']
      }
    }
  },
  Aeolian: {
    name: 'Aeolian',
    chordNumerals: ['i', 'ii\u2070', '\u1d47III', 'iv', 'v', '\u1d47VI', '\u1d47VII'],
    chordBases: ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 1, 2, 2],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    ionianAdjustment: [0, 0, -1, 0, 0, -1, -1],
    keyByTonic: {
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
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      },
      '#': {
        signature: '#',
        notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D']
      },
      '##': {
        signature: '##',
        notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A']
      },
      '###': {
        signature: '###',
        notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E']
      },
      '####': {
        signature: '####',
        notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B']
      },
      '#####': {
        signature: '#####',
        notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#']
      },
      '######': {
        signature: '######',
        notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#']
      },
      '#######': {
        signature: '#######',
        notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#']
      },
      bbbbbbb: {
        signature: 'bbbbbbb',
        notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb']
      },
      bbbbbb: {
        signature: 'bbbbbb',
        notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']
      },
      bbbbb: {
        signature: 'bbbbb',
        notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab']
      },
      bbbb: {
        signature: 'bbbb',
        notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb']
      },
      bbb: {
        signature: 'bbb',
        notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']
      },
      bb: {
        signature: 'bb',
        notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F']
      },
      b: {
        signature: 'b',
        notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C']
      }
    },
  },
  Locrian: {
    name: 'Locrian',
    chordNumerals: ['i\u2070', '\u1d47II', '\u1d47iii', 'iv', '\u1d47V', '\u1d47VI', '\u1d47vii'],
    chordBases: ['dim', 'maj', 'min', 'min', 'maj', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 1, 2, 2, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'TT', 'm6', 'm7'],
    ionianAdjustment: [0, -1, -1, 0, -1, -1, -1],
    keyByTonic: {
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
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['B', 'C', 'D', 'E', 'F', 'G', 'A']
      },
      '#': {
        signature: '#',
        notes: ['F#', 'G', 'A', 'B', 'C', 'D', 'E']
      },
      '##': {
        signature: '##',
        notes: ['C#', 'D', 'E', 'F#', 'G', 'A', 'B']
      },
      '###': {
        signature: '###',
        notes: ['G#', 'A', 'B', 'C#', 'D', 'E', 'F#']
      },
      '####': {
        signature: '####',
        notes: ['D#', 'E', 'F#', 'G#', 'A', 'B', 'C#']
      },
      '#####': {
        signature: '#####',
        notes: ['A#', 'B', 'C#', 'D#', 'E', 'F#', 'G#']
      },
      '######': {
        signature: '######',
        notes: ['E#', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']
      },
      '#######': {
        signature: '#######',
        notes: ['B#', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']
      },
      bbbbbbb: {
        signature: 'bbbbbbb',
        notes: ['Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab']
      },
      bbbbbb: {
        signature: 'bbbbbb',
        notes: ['F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb']
      },
      bbbbb: {
        signature: 'bbbbb',
        notes: ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']
      },
      bbbb: {
        signature: 'bbbb',
        notes: ['G', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']
      },
      bbb: {
        signature: 'bbb',
        notes: ['D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']
      },
      bb: {
        signature: 'bb',
        notes: ['A', 'Bb', 'C', 'D', 'Eb', 'F', 'G']
      },
      b: {
        signature: 'b',
        notes: ['E', 'F', 'G', 'A', 'Bb', 'C', 'D']
      }
    }
  }
}

// Functions / Classes

export function names (): readonly ModeName[] {
  return MODE_NAMES
}

export abstract class ModeData {
  readonly name: ModeName
  readonly chordNumerals: ChordNumeral[]
  readonly chordBases: DiatonicChordType[]
  readonly semitoneStructure: number[]
  readonly intervals: ShortIntervalName[]
  readonly ionianAdjustment: number[]
  readonly keyBySignature: Record<ModeKeySignature, ModeKey>

  constructor(name: ModeName) {
    this.name = name
    this.chordNumerals = MODE_DATA[this.name].chordNumerals
    this.chordBases = MODE_DATA[this.name].chordBases
    this.semitoneStructure = MODE_DATA[this.name].semitoneStructure
    this.intervals = MODE_DATA[this.name].intervals
    this.ionianAdjustment = MODE_DATA[this.name].ionianAdjustment
    this.keyBySignature = MODE_DATA[this.name].keyBySignature
  }
}

export class Mode extends ModeData {
  readonly keyByTonic: { [key in StandardNote]?: ModeKey }

  constructor(name: ModeName) {
    super(name)
    this.keyByTonic = MODE_DATA[this.name].keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | StandardNote): ModeKey | undefined {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class IonianMode extends Mode {
  declare readonly keyByTonic: Record<IonianStandardKey, ModeKey>
  constructor() {
    super('Ionian')
    this.keyByTonic = MODE_DATA.Ionian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | IonianStandardKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class DorianMode extends Mode {
  declare readonly keyByTonic: Record<DorianStandardKey, ModeKey>
  constructor() {
    super('Dorian')
    this.keyByTonic = MODE_DATA.Dorian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | DorianStandardKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class PhrygianMode extends Mode {
  declare readonly keyByTonic: Record<PhrygianKey, ModeKey>
  constructor() {
    super('Phrygian')
    this.keyByTonic = MODE_DATA.Phrygian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | PhrygianKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class LydianMode extends Mode {
  declare readonly keyByTonic: Record<LydianKey, ModeKey>
  constructor() {
    super('Lydian')
    this.keyByTonic = MODE_DATA.Lydian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | LydianKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class MixolydianMode extends Mode {
  declare readonly keyByTonic: Record<MixolydianKey, ModeKey>
  constructor() {
    super('Mixolydian')
    this.keyByTonic = MODE_DATA.Mixolydian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | MixolydianKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class AeolianMode extends Mode {
  declare readonly keyByTonic: Record<AeolianKey, ModeKey>
  constructor() {
    super('Aeolian')
    this.keyByTonic = MODE_DATA.Aeolian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | AeolianKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class LocrianMode extends Mode {
  declare readonly keyByTonic: Record<LocrianKey, ModeKey>
  constructor() {
    super('Aeolian')
    this.keyByTonic = MODE_DATA.Locrian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | LocrianKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

// export abstract class KeyData {
//   mode: ModeName
//   signature: ModeKeySignature
//   tonic: ModeNote
//   notes: ModeNote[]
//
//   constructor (signature: ModeKeySignature, mode: ModeName = 'Ionian') {
//     this.mode = mode
//     this.signature = signature
//     this.notes = MODE_DATA[mode].keyBySignature[signature]
//     this.tonic = this.notes[0]
//   }
// }

//
// export class Key extends KeyData {
//
// }
//
