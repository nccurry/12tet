import { Chord, ChordNumeral, DiatonicChordType } from "../chord"
import { ShortIntervalName } from "../interval"
import {AnyNote, StandardNote, transpose} from '../note'

// Data / Types

interface ModeKey {
  notes: AnyNote[]
  signature: ModeKeySignature
}

const MODE_KEY_SIGNATURES = [
  '',
  '1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '10#', '11#', '12#', '13#', '14#',
  '1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b', '9b', '10b', '11b', '12b', '13b', '14b',
] as const
export type ModeKeySignature = typeof MODE_KEY_SIGNATURES[number]
export function isModeKeySignature (signature: string): signature is ModeKeySignature {
  return MODE_KEY_SIGNATURES.includes((signature as ModeKeySignature))
}

export const MODE_NAMES = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'] as const
export type ModeName = typeof MODE_NAMES[number]

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

export const IONIAN_STANDARD_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'] as const
export const IONIAN_THEORETICAL_KEYS = ['G#', 'D#', 'A#', 'E#', 'B#', 'F##', 'C##', 'Cbb', 'Gbb', 'Dbb', 'Abb', 'Ebb', 'Bbb', 'Fb'] as const
export type IonianStandardKey = typeof IONIAN_STANDARD_KEYS[number]
export type IonianTheoreticalKey = typeof IONIAN_THEORETICAL_KEYS[number]
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

export const DORIAN_STANDARD_KEYS = ['D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G'] as const
export const DORIAN_THEORETICAL_KEYS = ['A#', 'E#', 'B#', 'F##', 'C##', 'G##', 'D##', 'Dbb', 'Abb', 'Ebb', 'Bbb', 'Fb', 'Cb', 'Gb'] as const
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

export const PHRYGIAN_STANDARD_KEYS = ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A'] as const
export const PHRYGIAN_THEORETICAL_KEYS = ['B#', 'F##', 'C##', 'G##', 'D##', 'A##', 'E##', 'Ebb', 'Bbb', 'Fb', 'Cb', 'Gb', 'Db', 'Ab'] as const
export type PhrygianStandardKey = typeof PHRYGIAN_STANDARD_KEYS[number]
export type PhrygianTheoreticalKey = typeof PHRYGIAN_THEORETICAL_KEYS[number]
export type PhrygianAnyKey = PhrygianStandardKey | PhrygianTheoreticalKey
export function isPhrygianStandardKey (note: AnyNote): note is PhrygianStandardKey {
  return PHRYGIAN_STANDARD_KEYS.includes((note as PhrygianStandardKey))
}
export function isPhrygianTheoreticalKey (note: AnyNote): note is PhrygianTheoreticalKey {
  return PHRYGIAN_THEORETICAL_KEYS.includes((note as PhrygianTheoreticalKey))
}
export function isPhrygianAnyKey (note: AnyNote): note is PhrygianAnyKey {
  return isPhrygianStandardKey(note) || isPhrygianTheoreticalKey(note)
}

export const LYDIAN_STANDARD_KEYS = ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'] as const
export const LYDIAN_THEORETICAL_KEYS = ['C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'F##', 'Fbb', 'Cbb', 'Gbb', 'Dbb', 'Abb', 'Ebb', 'Bbb'] as const
export type LydianStandardKey = typeof LYDIAN_STANDARD_KEYS[number]
export type LydianTheoreticalKey = typeof LYDIAN_THEORETICAL_KEYS[number]
export type LydianAnyKey = LydianStandardKey | LydianTheoreticalKey
export function isLydianStandardKey (note: AnyNote): note is LydianStandardKey {
  return LYDIAN_STANDARD_KEYS.includes((note as LydianStandardKey))
}
export function isLydianTheoreticalKey (note: AnyNote): note is LydianTheoreticalKey {
  return LYDIAN_THEORETICAL_KEYS.includes((note as LydianTheoreticalKey))
}
export function isLydianAnyKey (note: AnyNote): note is LydianAnyKey {
  return isLydianStandardKey(note) || isLydianTheoreticalKey(note)
}

export const MIXOLYDIAN_STANDARD_KEYS = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'] as const
export const MIXOLYDIAN_THEORETICAL_KEYS = ['D#', 'A#', 'E#', 'B#', 'F##', 'C##', 'G##', 'Gbb', 'Dbb', 'Abb', 'Ebb', 'Bbb', 'Fb', 'Cb'] as const
export type MixolydianStandardKey = typeof MIXOLYDIAN_STANDARD_KEYS[number]
export type MixolydianTheoreticalKey = typeof MIXOLYDIAN_THEORETICAL_KEYS[number]
export type MixolydianAnyKey = MixolydianStandardKey | MixolydianTheoreticalKey
export function isMixolydianStandardKey (note: AnyNote): note is MixolydianStandardKey {
  return MIXOLYDIAN_STANDARD_KEYS.includes((note as MixolydianStandardKey))
}
export function isMixolydianTheoreticalKey (note: AnyNote): note is MixolydianStandardKey {
  return MIXOLYDIAN_THEORETICAL_KEYS.includes((note as MixolydianTheoreticalKey))
}
export function isMixolydianAnyKey (note: AnyNote): note is MixolydianAnyKey {
  return isMixolydianStandardKey(note) || isMixolydianTheoreticalKey(note)
}

export const AEOLIAN_STANDARD_KEYS = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'] as const
export const AEOLIAN_THEORETICAL_KEYS = ['E#', 'B#', 'F##', 'C##', 'G##', 'D##', 'A##', 'Abb', 'Ebb', 'Bbb', 'Fb', 'Cb', 'Gb', 'Db'] as const
export type AeolianStandardKey = typeof AEOLIAN_STANDARD_KEYS[number]
export type AeolianTheoreticalKey = typeof AEOLIAN_THEORETICAL_KEYS[number]
export type AeolianAnyKey = AeolianStandardKey | AeolianTheoreticalKey
export function isAeolianStandardKey (note: AnyNote): note is AeolianStandardKey {
  return AEOLIAN_STANDARD_KEYS.includes((note as AeolianStandardKey))
}
export function isAeolianTheoreticalKey (note: AnyNote): note is AeolianTheoreticalKey {
  return AEOLIAN_THEORETICAL_KEYS.includes((note as AeolianTheoreticalKey))
}
export function isAeolianAnyKey (note: AnyNote): note is AeolianAnyKey {
  return isAeolianStandardKey(note) || isAeolianTheoreticalKey(note)
}

export const LOCRIAN_STANDARD_KEYS = ['B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E'] as const
export const LOCRIAN_THEORETICAL_KEYS = ['F##', 'C##', 'G##', 'D##', 'A##', 'E##', 'B##', 'Bbb', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb'] as const
export type LocrianStandardKey = typeof LOCRIAN_STANDARD_KEYS[number]
export type LocrianTheoreticalKey = typeof LOCRIAN_THEORETICAL_KEYS[number]
export type LocrianAnyKey = LocrianStandardKey | LocrianTheoreticalKey
export function isLocrianStandardKey (note: AnyNote): note is LocrianStandardKey {
  return LOCRIAN_STANDARD_KEYS.includes((note as LocrianStandardKey))
}
export function isLocrianTheoreticalKey (note: AnyNote): note is LocrianTheoreticalKey {
  return LOCRIAN_THEORETICAL_KEYS.includes((note as LocrianTheoreticalKey))
}
export function isLocrianAnyKey (note: AnyNote): note is LocrianAnyKey {
  return isLocrianStandardKey(note) || isLocrianTheoreticalKey(note)
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
        signature: '1#',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#']
      },
      D: {
        signature: '2#',
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']
      },
      A: {
        signature: '3#',
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']
      },
      E: {
        signature: '4#',
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']
      },
      B: {
        signature: '5#',
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
      },
      'F#': {
        signature: '6#',
        notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#']
      },
      'C#': {
        signature: '7#',
        notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#']
      },
      'G#': {
        signature: '8#',
        notes: ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F##']
      },
      'D#': {
        signature: '9#',
        notes: ['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C##']
      },
      'A#': {
        signature: '10#',
        notes: ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G##']
      },
      'E#': {
        signature: '11#',
        notes: ['E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D##']
      },
      'B#': {
        signature: '12#',
        notes: ['B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A##']
      },
      'F##': {
        signature: '13#',
        notes: ['F##', 'G##', 'A##', 'B#', 'C##', 'D##', 'E##']
      },
      'C##': {
        signature: '14#',
        notes: ['C##', 'D##', 'E##', 'F##', 'G##', 'A##', 'B##']
      },
      Cbb: {
        signature: '14b',
        notes: ['Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb']
      },
      Gbb: {
        signature: '13b',
        notes: ['Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fb']
      },
      Dbb: {
        signature: '12b',
        notes: ['Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb', 'Cb']
      },
      Abb: {
        signature: '11b',
        notes: ['Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gb']
      },
      Ebb: {
        signature: '10b',
        notes: ['Ebb', 'Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Db']
      },
      Bbb: {
        signature: '9b',
        notes: ['Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Ab']
      },
      Fb: {
        signature: '8b',
        notes: ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb']
      },
      Cb: {
        signature: '7b',
        notes: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']
      },
      Gb: {
        signature: '6b',
        notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']
      },
      Db: {
        signature: '5b',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']
      },
      Ab: {
        signature: '4b',
        notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G']
      },
      Eb: {
        signature: '3b',
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']
      },
      Bb: {
        signature: '2b',
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A']
      },
      F: {
        signature: '1b',
        notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']
      }
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
      },
      '1#': {
        signature: '1#',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#']
      },
      '2#': {
        signature: '2#',
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#']
      },
      '3#': {
        signature: '3#',
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#']
      },
      '4#': {
        signature: '4#',
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#']
      },
      '5#': {
        signature: '5#',
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
      },
      '6#': {
        signature: '6#',
        notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#']
      },
      '7#': {
        signature: '7#',
        notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#']
      },
      '8#': {
        signature: '8#',
        notes: ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F##']
      },
      '9#': {
        signature: '9#',
        notes: ['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C##']
      },
      '10#': {
        signature: '10#',
        notes: ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G##']
      },
      '11#': {
        signature: '11#',
        notes: ['E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D##']
      },
      '12#': {
        signature: '12#',
        notes: ['B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A##']
      },
      '13#': {
        signature: '13#',
        notes: ['F##', 'G##', 'A##', 'B#', 'C##', 'D##', 'E##']
      },
      '14#': {
        signature: '14#',
        notes: ['C##', 'D##', 'E##', 'F##', 'G##', 'A##', 'B##']
      },
      '14b': {
        signature: '14b',
        notes: ['Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb']
      },
      '13b': {
        signature: '13b',
        notes: ['Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fb']
      },
      '12b': {
        signature: '12b',
        notes: ['Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb', 'Cb']
      },
      '11b': {
        signature: '11b',
        notes: ['Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gb']
      },
      '10b': {
        signature: '10b',
        notes: ['Ebb', 'Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Db']
      },
      '9b': {
        signature: '9b',
        notes: ['Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Ab']
      },
      '8b': {
        signature: '8b',
        notes: ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb']
      },
      '7b': {
        signature: '7b',
        notes: ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb']
      },
      '6b': {
        signature: '6b',
        notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F']
      },
      '5b': {
        signature: '5b',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C']
      },
      '4b': {
        signature: '4b',
        notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G']
      },
      '3b': {
        signature: '3b',
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D']
      },
      '2b': {
        signature: '2b',
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A']
      },
      '1b': {
        signature: '1b',
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
        signature: '1#',
        notes: ['A', 'B', 'C', 'D', 'E', 'F#', 'G']
      },
      E: {
        signature: '2#',
        notes: ['E', 'F#', 'G', 'A', 'B', 'C#', 'D']
      },
      B: {
        signature: '3#',
        notes: ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A']
      },
      'F#': {
        signature: '4#',
        notes: ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E']
      },
      'C#': {
        signature: '5#',
        notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B']
      },
      'G#': {
        signature: '6#',
        notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#']
      },
      'D#': {
        signature: '7#',
        notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#']
      },
      'A#': {
        signature: '8#',
        notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F##', 'G#']
      },
      'E#': {
        signature: '9#',
        notes: ['E#', 'F##', 'G#', 'A#', 'B#', 'C##', 'D#']
      },
      'B#': {
        signature: '10#',
        notes: ['B#', 'C##', 'D#', 'E#', 'F##', 'G##', 'A#']
      },
      'F##': {
        signature: '11#',
        notes: ['F##', 'G##', 'A#', 'B#', 'C##', 'D##', 'E#']
      },
      'C##': {
        signature: '12#',
        notes: ['C##', 'D##', 'E#', 'F##', 'G##', 'A##', 'B#']
      },
      'G##': {
        signature: '13#',
        notes: ['G##', 'A##', 'B#', 'C##', 'D##', 'E##', 'F##']
      },
      'D##': {
        signature: '14#',
        notes: ['D##', 'E##', 'F##', 'G##', 'A##', 'B##', 'C##']
      },
      Dbb: {
        signature: '14b',
        notes: ['Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb']
      },
      Abb: {
        signature: '13b',
        notes: ['Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fb', 'Gbb']
      },
      Ebb: {
        signature: '12b',
        notes: ['Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb', 'Cb', 'Dbb']
      },
      Bbb: {
        signature: '11b',
        notes: ['Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gb', 'Abb']
      },
      Fb: {
        signature: '10b',
        notes: ['Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Db', 'Ebb']
      },
      Cb: {
        signature: '9b',
        notes: ['Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Ab', 'Bbb']
      },
      Gb: {
        signature: '8b',
        notes: ['Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb', 'Fb']
      },
      Db: {
        signature: '7b',
        notes: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']
      },
      Ab: {
        signature: '6b',
        notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb']
      },
      Eb: {
        signature: '5b',
        notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db']
      },
      Bb: {
        signature: '4b',
        notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab']
      },
      F: {
        signature: '3b',
        notes: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb']
      },
      C: {
        signature: '2b',
        notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb']
      },
      G: {
        signature: '1b',
        notes: ['G', 'A', 'Bb', 'C', 'D', 'E', 'F']
      }
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
      },
      '1#': {
        signature: '1#',
        notes: ['A', 'B', 'C', 'D', 'E', 'F#', 'G']
      },
      '2#': {
        signature: '2#',
        notes: ['E', 'F#', 'G', 'A', 'B', 'C#', 'D']
      },
      '3#': {
        signature: '3#',
        notes: ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A']
      },
      '4#': {
        signature: '4#',
        notes: ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E']
      },
      '5#': {
        signature: '5#',
        notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B']
      },
      '6#': {
        signature: '6#',
        notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#']
      },
      '7#': {
        signature: '7#',
        notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#']
      },
      '8#': {
        signature: '8#',
        notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F##', 'G#']
      },
      '9#': {
        signature: '9#',
        notes: ['E#', 'F##', 'G#', 'A#', 'B#', 'C##', 'D#']
      },
      '10#': {
        signature: '10#',
        notes: ['B#', 'C##', 'D#', 'E#', 'F##', 'G##', 'A#']
      },
      '11#': {
        signature: '11#',
        notes: ['F##', 'G##', 'A#', 'B#', 'C##', 'D##', 'E#']
      },
      '12#': {
        signature: '12#',
        notes: ['C##', 'D##', 'E#', 'F##', 'G##', 'A##', 'B#']
      },
      '13#': {
        signature: '13#',
        notes: ['G##', 'A##', 'B#', 'C##', 'D##', 'E##', 'F##']
      },
      '14#': {
        signature: '14#',
        notes: ['D##', 'E##', 'F##', 'G##', 'A##', 'B##', 'C##']
      },
      '14b': {
        signature: '14b',
        notes: ['Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb']
      },
      '13b': {
        signature: '13b',
        notes: ['Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fb', 'Gbb']
      },
      '12b': {
        signature: '12b',
        notes: ['Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb', 'Cb', 'Dbb']
      },
      '11b': {
        signature: '11b',
        notes: ['Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gb', 'Abb']
      },
      '10b': {
        signature: '10b',
        notes: ['Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Db', 'Ebb']
      },
      '9b': {
        signature: '9b',
        notes: ['Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Ab', 'Bbb']
      },
      '8b': {
        signature: '8b',
        notes: ['Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb', 'Fb']
      },
      '7b': {
        signature: '7b',
        notes: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']
      },
      '6b': {
        signature: '6b',
        notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb']
      },
      '5b': {
        signature: '5b',
        notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db']
      },
      '4b': {
        signature: '4b',
        notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab']
      },
      '3b': {
        signature: '3b',
        notes: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb']
      },
      '2b': {
        signature: '2b',
        notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb']
      },
      '1b': {
        signature: '1b',
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
        signature: '1#',
        notes: ['B', 'C', 'D', 'E', 'F#', 'G', 'A']
      },
      'F#': {
        signature: '2#',
        notes: ['F#', 'G', 'A', 'B', 'C#', 'D', 'E']
      },
      'C#': {
        signature: '3#',
        notes: ['C#', 'D', 'E', 'F#', 'G#', 'A', 'B']
      },
      'G#': {
        signature: '4#',
        notes: ['G#', 'A', 'B', 'C#', 'D#', 'E', 'F#']
      },
      'D#': {
        signature: '5#',
        notes: ['D#', 'E', 'F#', 'G#', 'A#', 'B', 'C#']
      },
      'A#': {
        signature: '6#',
        notes: ['A#', 'B', 'C#', 'D#', 'E#', 'F#', 'G#']
      },
      'E#': {
        signature: '7#',
        notes: ['E#', 'F#', 'G#', 'A#', 'B#', 'C#', 'D#']
      },
      'B#': {
        signature: '8#',
        notes: ['B#', 'C#', 'D#', 'E#', 'F##', 'G#', 'A#']
      },
      'F##': {
        signature: '9#',
        notes: ['F##', 'G#', 'A#', 'B#', 'C##', 'D#', 'E#']
      },
      'C##': {
        signature: '10#',
        notes: ['C##', 'D#', 'E#', 'F##', 'G##', 'A#', 'B#']
      },
      'G##': {
        signature: '11#',
        notes: ['G##', 'A#', 'B#', 'C##', 'D##', 'E#', 'F##']
      },
      'D##': {
        signature: '12#',
        notes: ['D##', 'E#', 'F##', 'G##', 'A##', 'B#', 'C##']
      },
      'A##': {
        signature: '13#',
        notes: ['A##', 'B#', 'C##', 'D##', 'E##', 'F##', 'G##']
      },
      'E##': {
        signature: '14#',
        notes: ['E##', 'F##', 'G##', 'A##', 'B##', 'C##', 'D##']
      },
      Ebb: {
        signature: '14b',
        notes: ['Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb']
      },
      Bbb: {
        signature: '13b',
        notes: ['Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb']
      },
      Fb: {
        signature: '12b',
        notes: ['Fb', 'Gbb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb']
      },
      Cb: {
        signature: '11b',
        notes: ['Cb', 'Dbb', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb']
      },
      Gb: {
        signature: '10b',
        notes: ['Gb', 'Abb', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb']
      },
      Db: {
        signature: '9b',
        notes: ['Db', 'Ebb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb']
      },
      Ab: {
        signature: '8b',
        notes: ['Ab', 'Bbb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb']
      },
      Eb: {
        signature: '7b',
        notes: ['Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']
      },
      Bb: {
        signature: '6b',
        notes: ['Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab']
      },
      F: {
        signature: '5b',
        notes: ['F', 'Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb']
      },
      C: {
        signature: '4b',
        notes: ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb']
      },
      G: {
        signature: '3b',
        notes: ['G', 'Ab', 'Bb', 'C', 'D', 'Eb', 'F']
      },
      D: {
        signature: '2b',
        notes: ['D', 'Eb', 'F', 'G', 'A', 'Bb', 'C']
      },
      A: {
        signature: '1b',
        notes: ['A', 'Bb', 'C', 'D', 'E', 'F', 'G']
      }
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
      },
      '1#': {
        signature: '1#',
        notes: ['B', 'C', 'D', 'E', 'F#', 'G', 'A']
      },
      '2#': {
        signature: '2#',
        notes: ['F#', 'G', 'A', 'B', 'C#', 'D', 'E']
      },
      '3#': {
        signature: '3#',
        notes: ['C#', 'D', 'E', 'F#', 'G#', 'A', 'B']
      },
      '4#': {
        signature: '4#',
        notes: ['G#', 'A', 'B', 'C#', 'D#', 'E', 'F#']
      },
      '5#': {
        signature: '5#',
        notes: ['D#', 'E', 'F#', 'G#', 'A#', 'B', 'C#']
      },
      '6#': {
        signature: '6#',
        notes: ['A#', 'B', 'C#', 'D#', 'E#', 'F#', 'G#']
      },
      '7#': {
        signature: '7#',
        notes: ['E#', 'F#', 'G#', 'A#', 'B#', 'C#', 'D#']
      },
      '8#': {
        signature: '8#',
        notes: ['B#', 'C#', 'D#', 'E#', 'F##', 'G#', 'A#']
      },
      '9#': {
        signature: '9#',
        notes: ['F##', 'G#', 'A#', 'B#', 'C##', 'D#', 'E#']
      },
      '10#': {
        signature: '10#',
        notes: ['C##', 'D#', 'E#', 'F##', 'G##', 'A#', 'B#']
      },
      '11#': {
        signature: '11#',
        notes: ['G##', 'A#', 'B#', 'C##', 'D##', 'E#', 'F##']
      },
      '12#': {
        signature: '12#',
        notes: ['D##', 'E#', 'F##', 'G##', 'A##', 'B#', 'C##']
      },
      '13#': {
        signature: '13#',
        notes: ['A##', 'B#', 'C##', 'D##', 'E##', 'F##', 'G##']
      },
      '14#': {
        signature: '14#',
        notes: ['E##', 'F##', 'G##', 'A##', 'B##', 'C##', 'D##']
      },
      '14b': {
        signature: '14b',
        notes: ['Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb']
      },
      '13b': {
        signature: '13b',
        notes: ['Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb']
      },
      '12b': {
        signature: '12b',
        notes: ['Fb', 'Gbb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb']
      },
      '11b': {
        signature: '11b',
        notes: ['Cb', 'Dbb', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb']
      },
      '10b': {
        signature: '10b',
        notes: ['Gb', 'Abb', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb']
      },
      '9b': {
        signature: '9b',
        notes: ['Db', 'Ebb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb']
      },
      '8b': {
        signature: '8b',
        notes: ['Ab', 'Bbb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb']
      },
      '7b': {
        signature: '7b',
        notes: ['Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']
      },
      '6b': {
        signature: '6b',
        notes: ['Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab']
      },
      '5b': {
        signature: '5b',
        notes: ['F', 'Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb']
      },
      '4b': {
        signature: '4b',
        notes: ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb']
      },
      '3b': {
        signature: '3b',
        notes: ['G', 'Ab', 'Bb', 'C', 'D', 'Eb', 'F']
      },
      '2b': {
        signature: '2b',
        notes: ['D', 'Eb', 'F', 'G', 'A', 'Bb', 'C']
      },
      '1b': {
        signature: '1b',
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
        signature: '1#',
        notes: ['C', 'D', 'E', 'F#', 'G', 'A', 'B']
      },
      G: {
        signature: '2#',
        notes: ['G', 'A', 'B', 'C#', 'D', 'E', 'F#']
      },
      D: {
        signature: '3#',
        notes: ['D', 'E', 'F#', 'G#', 'A', 'B', 'C#']
      },
      A: {
        signature: '4#',
        notes: ['A', 'B', 'C#', 'D#', 'E', 'F#', 'G#']
      },
      E: {
        signature: '5#',
        notes: ['E', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']
      },
      B: {
        signature: '6#',
        notes: ['B', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']
      },
      'F#': {
        signature: '7#',
        notes: ['F#', 'G#', 'A#', 'B#', 'C#', 'D#', 'E#']
      },
      'C#': {
        signature: '8#',
        notes: ['C#', 'D#', 'E#', 'F##', 'G#', 'A#', 'B#']
      },
      'G#': {
        signature: '9#',
        notes: ['G#', 'A#', 'B#', 'C##', 'D#', 'E#', 'F##']
      },
      'D#': {
        signature: '10#',
        notes: ['D#', 'E#', 'F##', 'G##', 'A#', 'B#', 'C##']
      },
      'A#': {
        signature: '11#',
        notes: ['A#', 'B#', 'C##', 'D##', 'E#', 'F##', 'G##']
      },
      'E#': {
        signature: '12#',
        notes: ['E#', 'F##', 'G##', 'A##', 'B#', 'C##', 'D##']
      },
      'B#': {
        signature: '13#',
        notes: ['B#', 'C##', 'D##', 'E##', 'F##', 'G##', 'A##']
      },
      'F##': {
        signature: '14#',
        notes: ['F##', 'G##', 'A##', 'B##', 'C##', 'D##', 'E##']
      },
      Fbb: {
        signature: '14b',
        notes: ['Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb']
      },
      Cbb: {
        signature: '13b',
        notes: ['Cbb', 'Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb']
      },
      Gbb: {
        signature: '12b',
        notes: ['Gbb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb']
      },
      Dbb: {
        signature: '11b',
        notes: ['Dbb', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb', 'Cb']
      },
      Abb: {
        signature: '10b',
        notes: ['Abb', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb']
      },
      Ebb: {
        signature: '9b',
        notes: ['Ebb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db']
      },
      Bbb: {
        signature: '8b',
        notes: ['Bbb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab']
      },
      Fb: {
        signature: '7b',
        notes: ['Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb']
      },
      Cb: {
        signature: '6b',
        notes: ['Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']
      },
      Gb: {
        signature: '5b',
        notes: ['Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']
      },
      Db: {
        signature: '4b',
        notes: ['Db', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']
      },
      Ab: {
        signature: '3b',
        notes: ['Ab', 'Bb', 'C', 'D', 'Eb', 'F', 'G']
      },
      Eb: {
        signature: '2b',
        notes: ['Eb', 'F', 'G', 'A', 'Bb', 'C', 'D']
      },
      Bb: {
        signature: '1b',
        notes: ['Bb', 'C', 'D', 'E', 'F', 'G', 'A']
      }
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['F', 'G', 'A', 'B', 'C', 'D', 'E']
      },
      '1#': {
        signature: '1#',
        notes: ['C', 'D', 'E', 'F#', 'G', 'A', 'B']
      },
      '2#': {
        signature: '2#',
        notes: ['G', 'A', 'B', 'C#', 'D', 'E', 'F#']
      },
      '3#': {
        signature: '3#',
        notes: ['D', 'E', 'F#', 'G#', 'A', 'B', 'C#']
      },
      '4#': {
        signature: '4#',
        notes: ['A', 'B', 'C#', 'D#', 'E', 'F#', 'G#']
      },
      '5#': {
        signature: '5#',
        notes: ['E', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']
      },
      '6#': {
        signature: '6#',
        notes: ['B', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']
      },
      '7#': {
        signature: '7#',
        notes: ['F#', 'G#', 'A#', 'B#', 'C#', 'D#', 'E#']
      },
      '8#': {
        signature: '8#',
        notes: ['C#', 'D#', 'E#', 'F##', 'G#', 'A#', 'B#']
      },
      '9#': {
        signature: '9#',
        notes: ['G#', 'A#', 'B#', 'C##', 'D#', 'E#', 'F##']
      },
      '10#': {
        signature: '10#',
        notes: ['D#', 'E#', 'F##', 'G##', 'A#', 'B#', 'C##']
      },
      '11#': {
        signature: '11#',
        notes: ['A#', 'B#', 'C##', 'D##', 'E#', 'F##', 'G##']
      },
      '12#': {
        signature: '12#',
        notes: ['E#', 'F##', 'G##', 'A##', 'B#', 'C##', 'D##']
      },
      '13#': {
        signature: '13#',
        notes: ['B#', 'C##', 'D##', 'E##', 'F##', 'G##', 'A##']
      },
      '14#': {
        signature: '14#',
        notes: ['F##', 'G##', 'A##', 'B##', 'C##', 'D##', 'E##']
      },
      '14b': {
        signature: '14b',
        notes: ['Fbb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb']
      },
      '13b': {
        signature: '13b',
        notes: ['Cbb', 'Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb']
      },
      '12b': {
        signature: '12b',
        notes: ['Gbb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb']
      },
      '11b': {
        signature: '11b',
        notes: ['Dbb', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb', 'Cb']
      },
      '10b': {
        signature: '10b',
        notes: ['Abb', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb']
      },
      '9b': {
        signature: '9b',
        notes: ['Ebb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db']
      },
      '8b': {
        signature: '8b',
        notes: ['Bbb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab']
      },
      '7b': {
        signature: '7b',
        notes: ['Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb']
      },
      '6b': {
        signature: '6b',
        notes: ['Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']
      },
      '5b': {
        signature: '5b',
        notes: ['Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']
      },
      '4b': {
        signature: '4b',
        notes: ['Db', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']
      },
      '3b': {
        signature: '3b',
        notes: ['Ab', 'Bb', 'C', 'D', 'Eb', 'F', 'G']
      },
      '2b': {
        signature: '2b',
        notes: ['Eb', 'F', 'G', 'A', 'Bb', 'C', 'D']
      },
      '1b': {
        signature: '1b',
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
        signature: '1#',
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C']
      },
      A: {
        signature: '2#',
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G']
      },
      E: {
        signature: '3#',
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D']
      },
      B: {
        signature: '4#',
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A']
      },
      'F#': {
        signature: '5#',
        notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E']
      },
      'C#': {
        signature: '6#',
        notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B']
      },
      'G#': {
        signature: '7#',
        notes: ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F#']
      },
      'D#': {
        signature: '8#',
        notes: ['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C#']
      },
      'A#': {
        signature: '9#',
        notes: ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G#']
      },
      'E#': {
        signature: '10#',
        notes: ['E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D#']
      },
      'B#': {
        signature: '11#',
        notes: ['B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A#']
      },
      'F##': {
        signature: '12#',
        notes: ['F##', 'G##', 'A##', 'B#', 'C##', 'D##', 'E#']
      },
      'C##': {
        signature: '13#',
        notes: ['C##', 'D##', 'E##', 'F##', 'G##', 'A##', 'B#']
      },
      'G##': {
        signature: '14#',
        notes: ['G##', 'A##', 'B##', 'C##', 'D##', 'E##', 'F##']
      },
      Gbb: {
        signature: '14b',
        notes: ['Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fbb']
      },
      Dbb: {
        signature: '13b',
        notes: ['Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb', 'Cbb']
      },
      Abb: {
        signature: '12b',
        notes: ['Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gbb']
      },
      Ebb: {
        signature: '11b',
        notes: ['Ebb', 'Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Dbb']
      },
      Bbb: {
        signature: '10b',
        notes: ['Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Abb']
      },
      Fb: {
        signature: '9b',
        notes: ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Ebb']
      },
      Cb: {
        signature: '8b',
        notes: ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bbb']
      },
      Gb: {
        signature: '7b',
        notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb']
      },
      Db: {
        signature: '6b',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb']
      },
      Ab: {
        signature: '5b',
        notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'Gb']
      },
      Eb: {
        signature: '4b',
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'Db']
      },
      Bb: {
        signature: '3b',
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'Ab']
      },
      F: {
        signature: '2b',
        notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'Eb']
      },
      C: {
        signature: '1b',
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb']
      }
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F']
      },
      '1#': {
        signature: '1#',
        notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C']
      },
      '2#': {
        signature: '2#',
        notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G']
      },
      '3#': {
        signature: '3#',
        notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D']
      },
      '4#': {
        signature: '4#',
        notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A']
      },
      '5#': {
        signature: '5#',
        notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E']
      },
      '6#': {
        signature: '6#',
        notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B']
      },
      '7#': {
        signature: '7#',
        notes: ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F#']
      },
      '8#': {
        signature: '8#',
        notes: ['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C#']
      },
      '9#': {
        signature: '9#',
        notes: ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G#']
      },
      '10#': {
        signature: '10#',
        notes: ['E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D#']
      },
      '11#': {
        signature: '11#',
        notes: ['B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A#']
      },
      '12#': {
        signature: '12#',
        notes: ['F##', 'G##', 'A##', 'B#', 'C##', 'D##', 'E#']
      },
      '13#': {
        signature: '13#',
        notes: ['C##', 'D##', 'E##', 'F##', 'G##', 'A##', 'B#']
      },
      '14#': {
        signature: '14#',
        notes: ['G##', 'A##', 'B##', 'C##', 'D##', 'E##', 'F##']
      },
      '14b': {
        signature: '14b',
        notes: ['Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fbb']
      },
      '13b': {
        signature: '13b',
        notes: ['Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb', 'Cbb']
      },
      '12b': {
        signature: '12b',
        notes: ['Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gbb']
      },
      '11b': {
        signature: '11b',
        notes: ['Ebb', 'Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Dbb']
      },
      '10b': {
        signature: '10b',
        notes: ['Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Abb']
      },
      '9b': {
        signature: '9b',
        notes: ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Ebb']
      },
      '8b': {
        signature: '8b',
        notes: ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bbb']
      },
      '7b': {
        signature: '7b',
        notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb']
      },
      '6b': {
        signature: '6b',
        notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb']
      },
      '5b': {
        signature: '5b',
        notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'Gb']
      },
      '4b': {
        signature: '4b',
        notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'Db']
      },
      '3b': {
        signature: '3b',
        notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'Ab']
      },
      '2b': {
        signature: '2b',
        notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'Eb']
      },
      '1b': {
        signature: '1b',
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
        signature: '1#',
        notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D']
      },
      B: {
        signature: '2#',
        notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A']
      },
      'F#': {
        signature: '3#',
        notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E']
      },
      'C#': {
        signature: '4#',
        notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B']
      },
      'G#': {
        signature: '5#',
        notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#']
      },
      'D#': {
        signature: '6#',
        notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#']
      },
      'A#': {
        signature: '7#',
        notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#']
      },
      'E#': {
        signature: '8#',
        notes: ['E#', 'F##', 'G#', 'A#', 'B#', 'C#', 'D#']
      },
      'B#': {
        signature: '9#',
        notes: ['B#', 'C##', 'D#', 'E#', 'F##', 'G#', 'A#']
      },
      'F##': {
        signature: '10#',
        notes: ['F##', 'G##', 'A#', 'B#', 'C##', 'D#', 'E#']
      },
      'C##': {
        signature: '11#',
        notes: ['C##', 'D##', 'E#', 'F##', 'G##', 'A#', 'B#']
      },
      'G##': {
        signature: '12#',
        notes: ['G##', 'A##', 'B#', 'C##', 'D##', 'E#', 'F##']
      },
      'D##': {
        signature: '13#',
        notes: ['D##', 'E##', 'F##', 'G##', 'A##', 'B#', 'C##']
      },
      'A##': {
        signature: '14#',
        notes: ['A##', 'B##', 'C##', 'D##', 'E##', 'F##', 'G##']
      },
      Abb: {
        signature: '14b',
        notes: ['Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fbb', 'Gbb']
      },
      Ebb: {
        signature: '13b',
        notes: ['Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb']
      },
      Bbb: {
        signature: '12b',
        notes: ['Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb']
      },
      Fb: {
        signature: '11b',
        notes: ['Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb']
      },
      Cb: {
        signature: '10b',
        notes: ['Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb']
      },
      Gb: {
        signature: '9b',
        notes: ['Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb']
      },
      Db: {
        signature: '8b',
        notes: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb']
      },
      Ab: {
        signature: '7b',
        notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb']
      },
      Eb: {
        signature: '6b',
        notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']
      },
      Bb: {
        signature: '5b',
        notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab']
      },
      F: {
        signature: '4b',
        notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb']
      },
      C: {
        signature: '3b',
        notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']
      },
      G: {
        signature: '2b',
        notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F']
      },
      D: {
        signature: '1b',
        notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C']
      }
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      },
      '1#': {
        signature: '1#',
        notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D']
      },
      '2#': {
        signature: '2#',
        notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A']
      },
      '3#': {
        signature: '3#',
        notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E']
      },
      '4#': {
        signature: '4#',
        notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B']
      },
      '5#': {
        signature: '5#',
        notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#']
      },
      '6#': {
        signature: '6#',
        notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#']
      },
      '7#': {
        signature: '7#',
        notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#']
      },
      '8#': {
        signature: '8#',
        notes: ['E#', 'F##', 'G#', 'A#', 'B#', 'C#', 'D#']
      },
      '9#': {
        signature: '9#',
        notes: ['B#', 'C##', 'D#', 'E#', 'F##', 'G#', 'A#']
      },
      '10#': {
        signature: '10#',
        notes: ['F##', 'G##', 'A#', 'B#', 'C##', 'D#', 'E#']
      },
      '11#': {
        signature: '11#',
        notes: ['C##', 'D##', 'E#', 'F##', 'G##', 'A#', 'B#']
      },
      '12#': {
        signature: '12#',
        notes: ['G##', 'A##', 'B#', 'C##', 'D##', 'E#', 'F##']
      },
      '13#': {
        signature: '13#',
        notes: ['D##', 'E##', 'F##', 'G##', 'A##', 'B#', 'C##']
      },
      '14#': {
        signature: '14#',
        notes: ['A##', 'B##', 'C##', 'D##', 'E##', 'F##', 'G##']
      },
      '14b': {
        signature: '14b',
        notes: ['Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fbb', 'Gbb']
      },
      '13b': {
        signature: '13b',
        notes: ['Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb']
      },
      '12b': {
        signature: '12b',
        notes: ['Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb']
      },
      '11b': {
        signature: '11b',
        notes: ['Fb', 'Gb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb']
      },
      '10b': {
        signature: '10b',
        notes: ['Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb']
      },
      '9b': {
        signature: '9b',
        notes: ['Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb']
      },
      '8b': {
        signature: '8b',
        notes: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb']
      },
      '7b': {
        signature: '7b',
        notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb']
      },
      '6b': {
        signature: '6b',
        notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']
      },
      '5b': {
        signature: '5b',
        notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab']
      },
      '4b': {
        signature: '4b',
        notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb']
      },
      '3b': {
        signature: '3b',
        notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']
      },
      '2b': {
        signature: '2b',
        notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F']
      },
      '1b': {
        signature: '1b',
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
        signature: '1#',
        notes: ['F#', 'G', 'A', 'B', 'C', 'D', 'E']
      },
      'C#': {
        signature: '2#',
        notes: ['C#', 'D', 'E', 'F#', 'G', 'A', 'B']
      },
      'G#': {
        signature: '3#',
        notes: ['G#', 'A', 'B', 'C#', 'D', 'E', 'F#']
      },
      'D#': {
        signature: '4#',
        notes: ['D#', 'E', 'F#', 'G#', 'A', 'B', 'C#']
      },
      'A#': {
        signature: '5#',
        notes: ['A#', 'B', 'C#', 'D#', 'E', 'F#', 'G#']
      },
      'E#': {
        signature: '6#',
        notes: ['E#', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']
      },
      'B#': {
        signature: '7#',
        notes: ['B#', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']
      },
      'F##': {
        signature: '8#',
        notes: ['F##', 'G#', 'A#', 'B#', 'C#', 'D#', 'E#']
      },
      'C##': {
        signature: '9#',
        notes: ['C##', 'D#', 'E#', 'F##', 'G#', 'A#', 'B#']
      },
      'G##': {
        signature: '10#',
        notes: ['G##', 'A#', 'B#', 'C##', 'D#', 'E#', 'F##']
      },
      'D##': {
        signature: '11#',
        notes: ['D##', 'E#', 'F##', 'G##', 'A#', 'B#', 'C##']
      },
      'A##': {
        signature: '12#',
        notes: ['A##', 'B#', 'C##', 'D##', 'E#', 'F##', 'G##']
      },
      'E##': {
        signature: '13#',
        notes: ['E##', 'F##', 'G##', 'A##', 'B#', 'C##', 'D##']
      },
      'B##': {
        signature: '14#',
        notes: ['B##', 'C##', 'D##', 'E##', 'F##', 'G##', 'A##']
      },
      Bbb: {
        signature: '14b',
        notes: ['Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb']
      },
      Fb: {
        signature: '13b',
        notes: ['Fb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb']
      },
      Cb: {
        signature: '12b',
        notes: ['Cb', 'Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb']
      },
      Gb: {
        signature: '11b',
        notes: ['Gb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb']
      },
      Db: {
        signature: '10b',
        notes: ['Db', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb', 'Cb']
      },
      Ab: {
        signature: '9b',
        notes: ['Ab', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb']
      },
      Eb: {
        signature: '8b',
        notes: ['Eb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db']
      },
      Bb: {
        signature: '7b',
        notes: ['Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab']
      },
      F: {
        signature: '6b',
        notes: ['F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb']
      },
      C: {
        signature: '5b',
        notes: ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']
      },
      G: {
        signature: '4b',
        notes: ['G', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']
      },
      D: {
        signature: '3b',
        notes: ['D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']
      },
      A: {
        signature: '2b',
        notes: ['A', 'Bb', 'C', 'D', 'Eb', 'F', 'G']
      },
      E: {
        signature: '1b',
        notes: ['E', 'F', 'G', 'A', 'Bb', 'C', 'D']
      }
    },
    keyBySignature: {
      '': {
        signature: '',
        notes: ['B', 'C', 'D', 'E', 'F', 'G', 'A']
      },
      '1#': {
        signature: '1#',
        notes: ['F#', 'G', 'A', 'B', 'C', 'D', 'E']
      },
      '2#': {
        signature: '2#',
        notes: ['C#', 'D', 'E', 'F#', 'G', 'A', 'B']
      },
      '3#': {
        signature: '3#',
        notes: ['G#', 'A', 'B', 'C#', 'D', 'E', 'F#']
      },
      '4#': {
        signature: '4#',
        notes: ['D#', 'E', 'F#', 'G#', 'A', 'B', 'C#']
      },
      '5#': {
        signature: '5#',
        notes: ['A#', 'B', 'C#', 'D#', 'E', 'F#', 'G#']
      },
      '6#': {
        signature: '6#',
        notes: ['E#', 'F#', 'G#', 'A#', 'B', 'C#', 'D#']
      },
      '7#': {
        signature: '7#',
        notes: ['B#', 'C#', 'D#', 'E#', 'F#', 'G#', 'A#']
      },
      '8#': {
        signature: '8#',
        notes: ['F##', 'G#', 'A#', 'B#', 'C#', 'D#', 'E#']
      },
      '9#': {
        signature: '9#',
        notes: ['C##', 'D#', 'E#', 'F##', 'G#', 'A#', 'B#']
      },
      '10#': {
        signature: '10#',
        notes: ['G##', 'A#', 'B#', 'C##', 'D#', 'E#', 'F##']
      },
      '11#': {
        signature: '11#',
        notes: ['D##', 'E#', 'F##', 'G##', 'A#', 'B#', 'C##']
      },
      '12#': {
        signature: '12#',
        notes: ['A##', 'B#', 'C##', 'D##', 'E#', 'F##', 'G##']
      },
      '13#': {
        signature: '13#',
        notes: ['E##', 'F##', 'G##', 'A##', 'B#', 'C##', 'D##']
      },
      '14#': {
        signature: '14#',
        notes: ['B##', 'C##', 'D##', 'E##', 'F##', 'G##', 'A##']
      },
      '14b': {
        signature: '14b',
        notes: ['Bbb', 'Cbb', 'Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb']
      },
      '13b': {
        signature: '13b',
        notes: ['Fb', 'Gbb', 'Abb', 'Bbb', 'Cbb', 'Dbb', 'Ebb']
      },
      '12b': {
        signature: '12b',
        notes: ['Cb', 'Dbb', 'Ebb', 'Fb', 'Gbb', 'Abb', 'Bbb']
      },
      '11b': {
        signature: '11b',
        notes: ['Gb', 'Abb', 'Bbb', 'Cb', 'Dbb', 'Ebb', 'Fb']
      },
      '10b': {
        signature: '10b',
        notes: ['Db', 'Ebb', 'Fb', 'Gb', 'Abb', 'Bbb', 'Cb']
      },
      '9b': {
        signature: '9b',
        notes: ['Ab', 'Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb']
      },
      '8b': {
        signature: '8b',
        notes: ['Eb', 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db']
      },
      '7b': {
        signature: '7b',
        notes: ['Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab']
      },
      '6b': {
        signature: '6b',
        notes: ['F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb']
      },
      '5b': {
        signature: '5b',
        notes: ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']
      },
      '4b': {
        signature: '4b',
        notes: ['G', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F']
      },
      '3b': {
        signature: '3b',
        notes: ['D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']
      },
      '2b': {
        signature: '2b',
        notes: ['A', 'Bb', 'C', 'D', 'Eb', 'F', 'G']
      },
      '1b': {
        signature: '1b',
        notes: ['E', 'F', 'G', 'A', 'Bb', 'C', 'D']
      }
    }
  }
}

// Functions / Classes

export function isModeKey (key: AnyNote, mode: ModeName): boolean {
  switch (mode) {
    case 'Ionian':
      return isIonianAnyKey(key)
    case 'Dorian':
      return isDorianAnyKey(key)
    case 'Phrygian':
      return isPhrygianAnyKey(key)
    case 'Lydian':
      return isLydianAnyKey(key)
    case 'Mixolydian':
      return isMixolydianAnyKey(key)
    case 'Aeolian':
      return isAeolianAnyKey(key)
    case 'Locrian':
      return isLocrianAnyKey(key)
  }
}

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

interface IonianData extends ModeData { keyByTonic: Record<IonianAnyKey, ModeKey>}
interface DorianData extends ModeData { keyByTonic: Record<DorianAnyKey  , ModeKey>}
interface PhrygianData extends ModeData { keyByTonic: Record<PhrygianAnyKey, ModeKey>}
interface LydianData extends ModeData { keyByTonic: Record<LydianAnyKey, ModeKey>}
interface MixolydianData extends ModeData { keyByTonic: Record<MixolydianAnyKey, ModeKey>}
interface AeolianData extends ModeData { keyByTonic: Record<AeolianAnyKey, ModeKey>}
interface LocrianData extends ModeData { keyByTonic: Record<LocrianAnyKey, ModeKey>}

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
  declare readonly keyByTonic: Record<PhrygianStandardKey, ModeKey>
  constructor() {
    super('Phrygian')
    this.keyByTonic = MODE_DATA.Phrygian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | PhrygianStandardKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class LydianMode extends Mode {
  declare readonly keyByTonic: Record<LydianStandardKey, ModeKey>
  constructor() {
    super('Lydian')
    this.keyByTonic = MODE_DATA.Lydian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | LydianStandardKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class MixolydianMode extends Mode {
  declare readonly keyByTonic: Record<MixolydianStandardKey, ModeKey>
  constructor() {
    super('Mixolydian')
    this.keyByTonic = MODE_DATA.Mixolydian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | MixolydianStandardKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class AeolianMode extends Mode {
  declare readonly keyByTonic: Record<AeolianStandardKey, ModeKey>
  constructor() {
    super('Aeolian')
    this.keyByTonic = MODE_DATA.Aeolian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | AeolianStandardKey): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class LocrianMode extends Mode {
  declare readonly keyByTonic: Record<LocrianStandardKey, ModeKey>
  constructor() {
    super('Aeolian')
    this.keyByTonic = MODE_DATA.Locrian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | LocrianStandardKey): ModeKey {
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
