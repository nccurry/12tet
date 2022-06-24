import {
  ChordNumeral,
  DiatonicChordType
} from "../chord"
import {
  ShortIntervalName
} from "../interval"
import {
  Key,
  ionianKey,
  IonianKey,
  dorianKey,
  DorianKey,
  locrianKey,
  LocrianKey,
  lydianKey,
  LydianKey,
  mixolydianKey,
  MixolydianKey,
  aeolianKey,
  AeolianKey,
  phrygianKey,
  PhrygianKey
} from "../key"

export const MODE_NAMES = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'] as const
export type ModeName = typeof MODE_NAMES[number]
export function isModeName (name: any): name is ModeName {
  return MODE_NAMES.includes(name)
}

export const MODE_KEY_SIGNATURES = [
  '',
  '1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '10#', '11#', '12#', '13#', '14#',
  '1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b', '9b', '10b', '11b', '12b', '13b', '14b',
] as const
export type ModeKeySignature = typeof MODE_KEY_SIGNATURES[number]
export function isModeKeySignature (signature: any): signature is ModeKeySignature {
  return MODE_KEY_SIGNATURES.includes(signature)
}

export const STANDARD_MODE_DEGREE = ['1', '2', '3', '4', '5', '6', '7'] as const
export type StandardModeDegree = typeof STANDARD_MODE_DEGREE[number]
export function isStandardModeDegree (degree: any): degree is StandardModeDegree {
  return STANDARD_MODE_DEGREE.includes(degree)
}

export const ALTERED_MODE_DEGREE = ['b1', '#1', 'b2', '#2', 'b3', '#3', 'b4', '#4', 'b5', '#5', 'b6', '#6', 'b7', '#7'] as const
export type AlteredModeDegree = typeof ALTERED_MODE_DEGREE[number]
export function isAlteredModeDegree (degree: any): degree is AlteredModeDegree {
  return ALTERED_MODE_DEGREE.includes(degree)
}

export const MODE_DEGREE = [...STANDARD_MODE_DEGREE, ...ALTERED_MODE_DEGREE] as const
export type ModeDegree = typeof MODE_DEGREE[number]
export function isModeDegree (degree: any): degree is ModeDegree {
  return MODE_DEGREE.includes(degree)
}

export const MODE_DEGREE_NAMES = ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic', 'Leading Tone'] as const
export type ModeDegreeName = typeof MODE_DEGREE_NAMES[number]
export function isModeDegreeName (degreeName: any): degreeName is ModeDegreeName {
  return MODE_DEGREE_NAMES.includes(degreeName)
}

export const IONIAN_STANDARD_TONICS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'] as const
export type IonianStandardTonic = typeof IONIAN_STANDARD_TONICS[number]
export function isIonianStandardTonic (note: any): note is IonianStandardTonic {
  return IONIAN_STANDARD_TONICS.includes(note)
}

export const IONIAN_THEORETICAL_TONICS = ['G#', 'D#', 'A#', 'E#', 'B#', 'F##', 'C##', 'Cbb', 'Gbb', 'Dbb', 'Abb', 'Ebb', 'Bbb', 'Fb'] as const
export type IonianTheoreticalTonic = typeof IONIAN_THEORETICAL_TONICS[number]
export function isIonianTheoreticalTonic (note: any): note is IonianTheoreticalTonic {
  return IONIAN_THEORETICAL_TONICS.includes(note)
}

export const IONIAN_TONICS = [...IONIAN_STANDARD_TONICS, ...IONIAN_THEORETICAL_TONICS] as const
export type IonianTonic = typeof IONIAN_TONICS[number]
export function isIonianTonic (note: any): note is IonianTonic {
  return IONIAN_TONICS.includes(note)
}

export const DORIAN_STANDARD_TONICS = ['D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G'] as const
export type DorianStandardTonic = typeof DORIAN_STANDARD_TONICS[number]
export function isDorianStandardTonic (note: any): note is DorianStandardTonic {
  return DORIAN_STANDARD_TONICS.includes(note)
}

export const DORIAN_THEORETICAL_TONICS = ['A#', 'E#', 'B#', 'F##', 'C##', 'G##', 'D##', 'Dbb', 'Abb', 'Ebb', 'Bbb', 'Fb', 'Cb', 'Gb'] as const
export type DorianTheoreticalTonic = typeof DORIAN_THEORETICAL_TONICS[number]
export function isDorianTheoreticalTonic (note: any): note is DorianTheoreticalTonic {
  return DORIAN_THEORETICAL_TONICS.includes(note)
}

export const DORIAN_TONICS = [...DORIAN_STANDARD_TONICS, ...DORIAN_THEORETICAL_TONICS] as const
export type DorianTonic = typeof DORIAN_TONICS[number]
export function isDorianTonic (note: any): note is DorianTonic {
  return DORIAN_TONICS.includes(note)
}

export const PHRYGIAN_STANDARD_TONICS = ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A'] as const
export type PhrygianStandardTonic = typeof PHRYGIAN_STANDARD_TONICS[number]
export function isPhrygianStandardTonic (note: any): note is PhrygianStandardTonic {
  return PHRYGIAN_STANDARD_TONICS.includes(note)
}

export const PHRYGIAN_THEORETICAL_TONICS = ['B#', 'F##', 'C##', 'G##', 'D##', 'A##', 'E##', 'Ebb', 'Bbb', 'Fb', 'Cb', 'Gb', 'Db', 'Ab'] as const
export type PhrygianTheoreticalTonic = typeof PHRYGIAN_THEORETICAL_TONICS[number]
export function isPhrygianTheoreticalTonic (note: any): note is PhrygianTheoreticalTonic {
  return PHRYGIAN_THEORETICAL_TONICS.includes(note)
}

export const PHRYGIAN_TONICS = [...PHRYGIAN_STANDARD_TONICS, ...PHRYGIAN_THEORETICAL_TONICS] as const
export type PhrygianTonic = typeof PHRYGIAN_TONICS[number]
export function isPhrygianTonic (note: any): note is PhrygianTonic {
  return PHRYGIAN_TONICS.includes(note)
}

export const LYDIAN_STANDARD_TONICS = ['F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb'] as const
export type LydianStandardTonic = typeof LYDIAN_STANDARD_TONICS[number]
export function isLydianStandardTonic (note: any): note is LydianStandardTonic {
  return LYDIAN_STANDARD_TONICS.includes(note)
}

export const LYDIAN_THEORETICAL_TONICS = ['C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'F##', 'Fbb', 'Cbb', 'Gbb', 'Dbb', 'Abb', 'Ebb', 'Bbb'] as const
export type LydianTheoreticalTonic = typeof LYDIAN_THEORETICAL_TONICS[number]
export function isLydianTheoreticalTonic (note: any): note is LydianTheoreticalTonic {
  return LYDIAN_THEORETICAL_TONICS.includes(note)
}

export const LYDIAN_TONICS = [...LYDIAN_STANDARD_TONICS, ...LYDIAN_THEORETICAL_TONICS] as const
export type LydianTonic = typeof LYDIAN_TONICS[number]
export function isLydianTonic (note: any): note is LydianTonic {
  return LYDIAN_TONICS.includes(note)
}

export const MIXOLYDIAN_STANDARD_TONICS = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'] as const
export type MixolydianStandardTonic = typeof MIXOLYDIAN_STANDARD_TONICS[number]
export function isMixolydianStandardTonic (note: any): note is MixolydianStandardTonic {
  return MIXOLYDIAN_STANDARD_TONICS.includes(note)
}

export const MIXOLYDIAN_THEORETICAL_TONICS = ['D#', 'A#', 'E#', 'B#', 'F##', 'C##', 'G##', 'Gbb', 'Dbb', 'Abb', 'Ebb', 'Bbb', 'Fb', 'Cb'] as const
export type MixolydianTheoreticalTonic = typeof MIXOLYDIAN_THEORETICAL_TONICS[number]
export function isMixolydianTheoreticalTonic (note: any): note is MixolydianTheoreticalTonic {
  return MIXOLYDIAN_THEORETICAL_TONICS.includes(note)
}

export const MIXOLYDIAN_TONICS = [...MIXOLYDIAN_STANDARD_TONICS, ...MIXOLYDIAN_THEORETICAL_TONICS] as const
export type MixolydianTonic = typeof MIXOLYDIAN_TONICS[number]
export function isMixolydianTonic (note: any): note is MixolydianTonic {
  return MIXOLYDIAN_TONICS.includes(note)
}

export const AEOLIAN_STANDARD_TONICS = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'] as const
export type AeolianStandardTonic = typeof AEOLIAN_STANDARD_TONICS[number]
export function isAeolianStandardTonic (note: any): note is AeolianStandardTonic {
  return AEOLIAN_STANDARD_TONICS.includes(note)
}

export const AEOLIAN_THEORETICAL_TONICS = ['E#', 'B#', 'F##', 'C##', 'G##', 'D##', 'A##', 'Abb', 'Ebb', 'Bbb', 'Fb', 'Cb', 'Gb', 'Db'] as const
export type AeolianTheoreticalTonic = typeof AEOLIAN_THEORETICAL_TONICS[number]
export function isAeolianTheoreticalTonic (note: any): note is AeolianTheoreticalTonic {
  return AEOLIAN_THEORETICAL_TONICS.includes(note)
}

export const AEOLIAN_TONICS = [...AEOLIAN_STANDARD_TONICS, ...AEOLIAN_THEORETICAL_TONICS] as const
export type AeolianTonic = typeof AEOLIAN_TONICS[number]
export function isAeolianTonic (note: any): note is AeolianTonic {
  return AEOLIAN_TONICS.includes(note)
}

export const LOCRIAN_STANDARD_TONICS = ['B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E'] as const
export type LocrianStandardTonic = typeof LOCRIAN_STANDARD_TONICS[number]
export function isLocrianStandardTonic (note: any): note is LocrianStandardTonic {
  return LOCRIAN_STANDARD_TONICS.includes(note)
}

export const LOCRIAN_THEORETICAL_TONICS = ['F##', 'C##', 'G##', 'D##', 'A##', 'E##', 'B##', 'Bbb', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb'] as const
export type LocrianTheoreticalTonic = typeof LOCRIAN_THEORETICAL_TONICS[number]
export function isLocrianTheoreticalTonic (note: any): note is LocrianTheoreticalTonic {
  return LOCRIAN_THEORETICAL_TONICS.includes(note)
}

export const LOCRIAN_TONICS = [...LOCRIAN_STANDARD_TONICS, ...LOCRIAN_THEORETICAL_TONICS] as const
export type LocrianTonic = typeof LOCRIAN_TONICS[number]
export function isLocrianTonic (note: any): note is LocrianTonic {
  return LOCRIAN_TONICS.includes(note)
}

export const STANDARD_TONICS = [...IONIAN_STANDARD_TONICS, ...DORIAN_STANDARD_TONICS, ...PHRYGIAN_STANDARD_TONICS, ...LYDIAN_STANDARD_TONICS, ...MIXOLYDIAN_STANDARD_TONICS, ...AEOLIAN_STANDARD_TONICS, ...LOCRIAN_STANDARD_TONICS] as const
export type StandardTonic = typeof STANDARD_TONICS[number]
export function isStandardTonic (note: any): note is StandardTonic {
  return STANDARD_TONICS.includes(note)
}

export const THEORETICAL_TONICS = [...IONIAN_THEORETICAL_TONICS, ...DORIAN_THEORETICAL_TONICS, ...PHRYGIAN_THEORETICAL_TONICS, ...LYDIAN_THEORETICAL_TONICS, ...MIXOLYDIAN_THEORETICAL_TONICS, ...AEOLIAN_THEORETICAL_TONICS, ...LOCRIAN_THEORETICAL_TONICS] as const
export type TheoreticalTonic = typeof THEORETICAL_TONICS[number]
export function isTheoreticalTonic (note: any): note is TheoreticalTonic {
  return THEORETICAL_TONICS.includes(note)
}

export const TONICS = [...STANDARD_TONICS, ...THEORETICAL_TONICS]
export type Tonic = typeof TONICS[number]
export function isTonic (note: any): note is Tonic {
  return TONICS.includes(note)
}

// Maps mode names to the associated isModeTonic type guard
export const isModeTonicByModeName: {
  Ionian: (note: any) => note is IonianTonic,
  Dorian: (note: any) => note is DorianTonic,
  Phrygian: (note: any) => note is PhrygianTonic,
  Lydian: (note: any) => note is LydianTonic,
  Mixolydian: (note: any) => note is MixolydianTonic,
  Aeolian: (note: any) => note is AeolianTonic,
  Locrian: (note: any) => note is LocrianTonic
} = {
  Ionian: isIonianTonic,
  Dorian: isDorianTonic,
  Phrygian: isPhrygianTonic,
  Lydian: isLydianTonic,
  Mixolydian: isMixolydianTonic,
  Aeolian: isAeolianTonic,
  Locrian: isLocrianTonic
}

interface Mode {
  // The name of the mode
  readonly name: ModeName

  // Optional alternate name of the mode
  readonly alternateName?: string

  // The numeral representative of the chord associated with each mode degree
  readonly chordNumerals: readonly ChordNumeral[]

  // The short name of the chord name associated with each mode degree
  readonly chordBases: readonly DiatonicChordType[]

  // The semitone distances between mode degrees
  readonly semitoneStructure: readonly number[]

  // The short interval name between mode degree
  readonly intervals: readonly ShortIntervalName[]

  // The adjustment in semitones from the Ionian mode for each mode degree
  readonly degreeAdjustmentFromIonian: readonly number[]
}

interface Ionian extends Mode {
  // The list of standard and theoretical mode tonics
  readonly tonics: readonly IonianTonic[]

  // A function that returns the key object associated with each mode tonic
  readonly keyByTonic: (tonic: IonianTonic) => IonianKey

  // A function that returns the key object associated with each key signature
  readonly keyBySignature: (signature: ModeKeySignature) => IonianKey
}

interface Dorian extends Mode {
  // The list of standard and theoretical mode tonics
  readonly tonics: readonly DorianTonic[]

  // A function that returns the key object associated with each mode tonic
  readonly keyByTonic: (tonic: DorianTonic) => DorianKey

  // A function that returns the key object associated with each key signature
  readonly keyBySignature: (signature: ModeKeySignature) => DorianKey
}

interface Phrygian extends Mode {
  // The list of standard and theoretical mode tonics
  readonly tonics: readonly PhrygianTonic[]

  // A function that returns the key object associated with each mode tonic
  readonly keyByTonic: (tonic: PhrygianTonic) => PhrygianKey

  // A function that returns the key object associated with each key signature
  readonly keyBySignature: (signature: ModeKeySignature) => PhrygianKey
}

interface Lydian extends Mode {
  // The list of standard and theoretical mode tonics
  readonly tonics: readonly LydianTonic[]

  // A function that returns the key object associated with each mode tonic
  readonly keyByTonic: (tonic: LydianTonic) => LydianKey

  // A function that returns the key object associated with each key signature
  readonly keyBySignature: (signature: ModeKeySignature) => LydianKey
}

interface Mixolydian extends Mode {
  // The list of standard and theoretical mode tonics
  readonly tonics: readonly MixolydianTonic[]

  // A function that returns the key object associated with each mode tonic
  readonly keyByTonic: (tonic: MixolydianTonic) => MixolydianKey

  // A function that returns the key object associated with each key signature
  readonly keyBySignature: (signature: ModeKeySignature) => MixolydianKey
}

interface Aeolian extends Mode {
  // The list of standard and theoretical mode tonics
  readonly tonics: readonly AeolianTonic[]

  // A function that returns the key object associated with each mode tonic
  readonly keyByTonic: (tonic: AeolianTonic) => AeolianKey

  // A function that returns the key object associated with each key signature
  readonly keyBySignature: (signature: ModeKeySignature) => AeolianKey
}

interface Locrian extends Mode {
  // The list of standard and theoretical mode tonics
  readonly tonics: readonly LocrianTonic[]

  // A function that returns the key object associated with each mode tonic
  readonly keyByTonic: (tonic: LocrianTonic) => LocrianKey

  // A function that returns the key object associated with each key signature
  readonly keyBySignature: (signature: ModeKeySignature) => LocrianKey
}

type KeyByTonic =
  Record<IonianTonic, IonianKey> |
  Record<DorianTonic, DorianKey> |
  Record<PhrygianTonic, PhrygianKey> |
  Record<LydianTonic, LydianKey> |
  Record<MixolydianTonic, MixolydianKey> |
  Record<AeolianTonic, AeolianKey> |
  Record<LocrianTonic, LocrianKey>

// Generates an object mapping mode tonics to the associated key
function keyByTonic(modeName: 'Ionian'): Record<IonianTonic, IonianKey>
function keyByTonic(modeName: 'Dorian'): Record<DorianTonic, DorianKey>
function keyByTonic(modeName: 'Phrygian'): Record<PhrygianTonic, PhrygianKey>
function keyByTonic(modeName: 'Lydian'): Record<LydianTonic, LydianKey>
function keyByTonic(modeName: 'Mixolydian'): Record<MixolydianTonic, MixolydianKey>
function keyByTonic(modeName: 'Aeolian'): Record<AeolianTonic, AeolianKey>
function keyByTonic(modeName: 'Locrian'): Record<LocrianTonic, LocrianKey>
function keyByTonic(modeName: ModeName): KeyByTonic {
  const keyByTonic: { [key in Tonic]?: Key } = {}
  switch (modeName) {
    case 'Ionian':
      IONIAN_TONICS.forEach(tonic => {
        keyByTonic[tonic] = ionianKey(tonic)
      })
      return keyByTonic as Record<IonianTonic, IonianKey>
    case 'Dorian':
      DORIAN_TONICS.forEach(tonic => {
        keyByTonic[tonic] = dorianKey(tonic)
      })
      return keyByTonic as Record<DorianTonic, DorianKey>
    case 'Phrygian':
      PHRYGIAN_TONICS.forEach(tonic => {
        keyByTonic[tonic] = phrygianKey(tonic)
      })
      return keyByTonic as Record<PhrygianTonic, PhrygianKey>
    case 'Lydian':
      LYDIAN_TONICS.forEach(tonic => {
        keyByTonic[tonic] = lydianKey(tonic)
      })
      return keyByTonic as Record<LydianTonic, LydianKey>
    case 'Mixolydian':
      MIXOLYDIAN_TONICS.forEach(tonic => {
        keyByTonic[tonic] = mixolydianKey(tonic)
      })
      return keyByTonic as Record<MixolydianTonic, MixolydianKey>
    case 'Aeolian':
      AEOLIAN_TONICS.forEach(tonic => {
        keyByTonic[tonic] = aeolianKey(tonic)
      })
      return keyByTonic as Record<AeolianTonic, AeolianKey>
    case 'Locrian':
      LOCRIAN_TONICS.forEach(tonic => {
        keyByTonic[tonic] = locrianKey(tonic)
      })
      return keyByTonic as Record<LocrianTonic, LocrianKey>
  }
}

type KeyBySignature =
  Record<ModeKeySignature, IonianKey> |
  Record<ModeKeySignature, DorianKey> |
  Record<ModeKeySignature, PhrygianKey> |
  Record<ModeKeySignature, LydianKey> |
  Record<ModeKeySignature, MixolydianKey> |
  Record<ModeKeySignature, AeolianKey> |
  Record<ModeKeySignature, LocrianKey>

// Generates an object mapping key signature to the associated key for a given mode
function keyBySignature(modeName: 'Ionian'): Record<ModeKeySignature, IonianKey>
function keyBySignature(modeName: 'Dorian'): Record<ModeKeySignature, DorianKey>
function keyBySignature(modeName: 'Phrygian'): Record<ModeKeySignature, PhrygianKey>
function keyBySignature(modeName: 'Lydian'): Record<ModeKeySignature, LydianKey>
function keyBySignature(modeName: 'Mixolydian'): Record<ModeKeySignature, MixolydianKey>
function keyBySignature(modeName: 'Aeolian'): Record<ModeKeySignature, AeolianKey>
function keyBySignature(modeName: 'Locrian'): Record<ModeKeySignature, LocrianKey>
function keyBySignature(modeName: ModeName): KeyBySignature {
  const keyBySignature: { [key in ModeKeySignature]?: Key } = {}
  switch (modeName) {
    case 'Ionian':
      IONIAN_TONICS.forEach(tonic => {
        const key = ionianKey(tonic)
        keyBySignature[key.signature] = key
      })
      return keyBySignature as Record<ModeKeySignature, IonianKey>
    case 'Dorian':
      DORIAN_TONICS.forEach(tonic => {
        const key = dorianKey(tonic)
        keyBySignature[key.signature] = key
      })
      return keyBySignature as Record<ModeKeySignature, DorianKey>
    case 'Phrygian':
      PHRYGIAN_TONICS.forEach(tonic => {
        const key = phrygianKey(tonic)
        keyBySignature[key.signature] = key
      })
      return keyBySignature as Record<ModeKeySignature, PhrygianKey>
    case 'Lydian':
      LYDIAN_TONICS.forEach(tonic => {
        const key = lydianKey(tonic)
        keyBySignature[key.signature] = key
      })
      return keyBySignature as Record<ModeKeySignature, LydianKey>
    case 'Mixolydian':
      MIXOLYDIAN_TONICS.forEach(tonic => {
        const key = mixolydianKey(tonic)
        keyBySignature[key.signature] = key
      })
      return keyBySignature as Record<ModeKeySignature, MixolydianKey>
    case 'Aeolian':
      AEOLIAN_TONICS.forEach(tonic => {
        const key = aeolianKey(tonic)
        keyBySignature[key.signature] = key
      })
      return keyBySignature as Record<ModeKeySignature, AeolianKey>
    case 'Locrian':
      LOCRIAN_TONICS.forEach(tonic => {
        const key = locrianKey(tonic)
        keyBySignature[key.signature] = key
      })
      return keyBySignature as Record<ModeKeySignature, LocrianKey>
  }
}

// Metadata for each mod
export const MODE_DATA: Record<ModeName, Ionian | Dorian | Phrygian | Lydian | Mixolydian | Aeolian | Locrian> = {
  Ionian: {
    name: 'Ionian',
    alternateName: 'Major',
    chordNumerals: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u2070'],
    chordBases: ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'],
    semitoneStructure: [2, 2, 1, 2, 2, 2, 1],
    intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7', 'P8'],
    degreeAdjustmentFromIonian: [0, 0, 0, 0, 0, 0, 0],
    tonics: IONIAN_TONICS,
    keyByTonic: (tonic: IonianTonic) => keyByTonic('Ionian')[tonic],
    keyBySignature: (signature: ModeKeySignature) => keyBySignature('Ionian')[signature]
  },
  Dorian: {
    name: 'Dorian',
    chordNumerals: ['i', 'ii', '\u1d47III', 'IV', 'v', 'vi\u2070', '\u1d47VII'],
    chordBases: ['min', 'min', 'maj', 'maj', 'min', 'dim', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 2, 1, 2],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7', 'P8'],
    degreeAdjustmentFromIonian: [0, 0, -1, 0, 0, 0, -1],
    tonics: DORIAN_TONICS,
    keyByTonic: (tonic: DorianTonic) => keyByTonic('Dorian')[tonic],
    keyBySignature: (signature: ModeKeySignature) => keyBySignature('Dorian')[signature]
  },
  Phrygian: {
    name: 'Phrygian',
    chordNumerals: ['i', '\u1d47II', '\u1d47III', 'iv', 'v\u2070', '\u1d47VI', '\u1d47vii'],
    chordBases: ['min', 'maj', 'maj', 'min', 'dim', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 2, 1, 2, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    degreeAdjustmentFromIonian: [0, -1, -1, 0, 0, -1, -1],
    tonics: PHRYGIAN_TONICS,
    keyByTonic: (tonic: PhrygianTonic) => keyByTonic('Phrygian')[tonic],
    keyBySignature: (signature) =>  keyBySignature('Phrygian')[signature]
  },
  Lydian: {
    name: 'Lydian',
    chordNumerals: ['I', 'II', 'iii', '#iv\u2070', 'V', 'vi', 'vii'],
    chordBases: ['maj', 'maj', 'min', 'dim', 'maj', 'min', 'min'],
    semitoneStructure: [2, 2, 2, 1, 2, 2, 1],
    intervals: ['P1', 'M2', 'M3', 'TT', 'P5', 'M6', 'M7'],
    degreeAdjustmentFromIonian: [0, 0, 0, 1, 0, 0, 0],
    tonics: LYDIAN_TONICS,
    keyByTonic: (tonic: LydianTonic) => keyByTonic('Lydian')[tonic],
    keyBySignature:(signature: ModeKeySignature) => keyBySignature('Lydian')[signature]
  },
  Mixolydian: {
    name: 'Mixolydian',
    chordNumerals: ['I', 'ii', 'iii\u2070', 'IV', 'v', 'vi', '\u1d47VII'],
    chordBases: ['maj', 'min', 'dim', 'maj', 'min', 'min', 'maj'],
    semitoneStructure: [2, 2, 1, 2, 2, 1, 2],
    intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
    degreeAdjustmentFromIonian: [0, 0, 0, 0, 0, 0, -1],
    tonics: MIXOLYDIAN_TONICS,
    keyByTonic: (tonic: MixolydianTonic) => keyByTonic('Mixolydian')[tonic],
    keyBySignature: (signature: ModeKeySignature) => keyBySignature('Mixolydian')[signature]
  },
  Aeolian: {
    name: 'Aeolian',
    alternateName: 'Minor',
    chordNumerals: ['i', 'ii\u2070', '\u1d47III', 'iv', 'v', '\u1d47VI', '\u1d47VII'],
    chordBases: ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 1, 2, 2],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    degreeAdjustmentFromIonian: [0, 0, -1, 0, 0, -1, -1],
    tonics: AEOLIAN_TONICS,
    keyByTonic: (tonic: AeolianTonic) => keyByTonic('Aeolian')[tonic],
    keyBySignature: (signature: ModeKeySignature) => keyBySignature('Aeolian')[signature]
  },
  Locrian: {
    name: 'Locrian',
    chordNumerals: ['i\u2070', '\u1d47II', '\u1d47iii', 'iv', '\u1d47V', '\u1d47VI', '\u1d47vii'],
    chordBases: ['dim', 'maj', 'min', 'min', 'maj', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 1, 2, 2, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'TT', 'm6', 'm7'],
    degreeAdjustmentFromIonian: [0, -1, -1, 0, -1, -1, -1],
    tonics: LOCRIAN_TONICS,
    keyByTonic: (tonic: LocrianTonic) => keyByTonic('Locrian')[tonic],
    keyBySignature: (signature: ModeKeySignature) => keyBySignature('Locrian')[signature]
  }
}

// Returns a given mode object
export function mode(modeName: 'Ionian'): Ionian
export function mode(modeName: 'Dorian'): Dorian
export function mode(modeName: 'Phrygian'): Phrygian
export function mode(modeName: 'Lydian'): Lydian
export function mode(modeName: 'Mixolydian'): Mixolydian
export function mode(modeName: 'Aeolian'): Aeolian
export function mode(modeName: 'Locrian'): Locrian
export function mode(modeName: ModeName): Ionian | Dorian | Phrygian | Lydian | Mixolydian | Aeolian | Locrian {
  return MODE_DATA[modeName]
}