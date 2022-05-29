import { ChordNumeral, DiatonicChordType } from "../chord"
import { ShortIntervalName } from "../interval"
import { AeolianKey, DorianKey, IonianKey, Key, LocrianKey, LydianKey, MixolydianKey, PhrygianKey } from "../key"

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

export const STANDARD_MODE_DEGREE_NUMBERS = [1, 2, 3, 4, 5, 6, 7] as const
export type StandardModeDegreeNumber = typeof STANDARD_MODE_DEGREE_NUMBERS[number]
export function isStandardModeDegreeNumber (degree: any): degree is StandardModeDegreeNumber {
  return STANDARD_MODE_DEGREE_NUMBERS.includes(degree)
}

export const ALTERED_MODE_DEGREE_NUMBERS = ['b1', '#1', 'b2', '#2', 'b3', '#3', 'b4', '#4', 'b5', '#5', 'b6', '#6', 'b7', '#7'] as const
export type AlteredModeDegreeNumber = typeof ALTERED_MODE_DEGREE_NUMBERS[number]
export function isAlteredModeDegreeNumber (degree: any): degree is AlteredModeDegreeNumber {
  return ALTERED_MODE_DEGREE_NUMBERS.includes(degree)
}

export const MODE_DEGREE_NUMBER = [...STANDARD_MODE_DEGREE_NUMBERS, ...ALTERED_MODE_DEGREE_NUMBERS] as const
export type ModeDegreeNumber = typeof MODE_DEGREE_NUMBER[number]
export function isModeDegreeNumber (degree: any): degree is ModeDegreeNumber {
  return MODE_DEGREE_NUMBER.includes(degree)
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

export const ISMODETONIC_BY_MODE_NAME: {
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

export type TonicList =
  readonly IonianTonic[] |
  readonly DorianTonic[] |
  readonly PhrygianTonic[] |
  readonly LydianTonic[] |
  readonly MixolydianTonic[] |
  readonly AeolianTonic[] |
  readonly LocrianTonic[]

export type KeyByTonic =
  Record<IonianTonic, IonianKey> |
  Record<DorianTonic, DorianKey> |
  Record<PhrygianTonic, PhrygianKey> |
  Record<LydianTonic, LydianKey> |
  Record<MixolydianTonic, MixolydianKey> |
  Record<AeolianTonic, AeolianKey> |
  Record<LocrianTonic, LocrianKey>

export type KeyBySignature =
  Record<ModeKeySignature, IonianKey> |
  Record<ModeKeySignature, DorianKey> |
  Record<ModeKeySignature, PhrygianKey> |
  Record<ModeKeySignature, LydianKey> |
  Record<ModeKeySignature, MixolydianKey> |
  Record<ModeKeySignature, AeolianKey> |
  Record<ModeKeySignature, LocrianKey>

export function isModeTonic (tonic: Tonic, mode: ModeName): boolean {
  switch (mode) {
    case 'Ionian':
      return isIonianTonic(tonic)
    case 'Dorian':
      return isDorianTonic(tonic)
    case 'Phrygian':
      return isPhrygianTonic(tonic)
    case 'Lydian':
      return isLydianTonic(tonic)
    case 'Mixolydian':
      return isMixolydianTonic(tonic)
    case 'Aeolian':
      return isAeolianTonic(tonic)
    case 'Locrian':
      return isLocrianTonic(tonic)
  }
}

export interface ModeData {
  readonly name: ModeName
  readonly alternateName?: string
  readonly chordNumerals: readonly ChordNumeral[]
  readonly chordBases: readonly DiatonicChordType[]
  readonly semitoneStructure: readonly number[]
  readonly intervals: readonly ShortIntervalName[]
  readonly degreeAdjustmentFromIonian: readonly number[]
  readonly tonics: TonicList
  readonly keyByTonic: KeyByTonic
  readonly keyBySignature: KeyBySignature
}

// Lets us create generic type guards using instanceof
// https://dev.to/krumpet/generic-type-guard-in-typescript-258l
export type Constructor<T> = new (...args: any[]) => T

export function isModeKeyBySignature<ModeKey> (keyBySignature: any, modeKey: Constructor<ModeKey>): keyBySignature is Record<ModeKeySignature, ModeKey> {
  const keyBySignatureKeys = Object.keys(keyBySignature)

  const lengthMatches = keyBySignatureKeys.length === MODE_KEY_SIGNATURES.length

  let keysMatch = true
  MODE_KEY_SIGNATURES.forEach(keySignature => {
    if (!keyBySignatureKeys.includes(keySignature)) {
      keysMatch = false
    }
  })
  keyBySignatureKeys.forEach(keySignature => {
    if (!isModeKeySignature(keySignature)) {
      keysMatch = false
    }
  })

  let valuesAreKeyType = true
  Object.values(keyBySignature).forEach(key => {
    if (!(key instanceof modeKey)) {
      valuesAreKeyType = false
    }
  })

  return lengthMatches && keysMatch && valuesAreKeyType
}

export class IonianMode implements ModeData {
  readonly name: ModeName = 'Ionian'
  readonly alternateName = 'Major'
  readonly chordNumerals: readonly ChordNumeral[] = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii\u2070']
  readonly chordBases: readonly DiatonicChordType[] = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim']
  readonly semitoneStructure: readonly number[] = [2, 2, 1, 2, 2, 2, 1]
  readonly intervals: readonly ShortIntervalName[] = ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7', 'P8']
  readonly degreeAdjustmentFromIonian: readonly number[] = [0, 0, 0, 0, 0, 0, 0]
  readonly tonics: readonly IonianTonic[] = IONIAN_TONICS
  readonly keyByTonic: Record<IonianTonic, IonianKey>
  readonly keyBySignature: Record<ModeKeySignature, IonianKey>

  constructor() {
    const keyByTonic: { [key in IonianTonic]?: IonianKey } = {}
    IONIAN_TONICS.forEach(tonic => {
      keyByTonic[tonic] = new IonianKey(tonic)
    })
    this.keyByTonic = keyByTonic as Record<IonianTonic, IonianKey> // TODO: Type guard this

    const keyBySignature: { [key in ModeKeySignature]?: IonianKey } = {}
    MODE_KEY_SIGNATURES.forEach(keySignature => {
      Object.values(this.keyByTonic).forEach(key => {
        if (keySignature === key.signature) {
          keyBySignature[keySignature] = key
        }
      })
    })

    if (isModeKeyBySignature<IonianKey>(keyBySignature, IonianKey)) {
      this.keyBySignature = keyBySignature
    } else {
      throw TypeError(`There was a problem generating keyBySignature for IonianMode`)
    }
  }

  key (keyIdentifier: ModeKeySignature | IonianStandardTonic): IonianKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class DorianMode implements ModeData {
  readonly name: ModeName = 'Dorian'
  readonly chordNumerals: readonly ChordNumeral[] = ['i', 'ii', '\u1d47III', 'IV', 'v', 'vi\u2070', '\u1d47VII']
  readonly chordBases: readonly DiatonicChordType[] = ['min', 'min', 'maj', 'maj', 'min', 'dim', 'maj']
  readonly semitoneStructure: readonly number[] = [2, 1, 2, 2, 2, 1, 2]
  readonly intervals: readonly ShortIntervalName[] = ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7', 'P8']
  readonly degreeAdjustmentFromIonian: readonly number[] = [0, 0, -1, 0, 0, 0, -1]
  readonly tonics: readonly DorianTonic[] = DORIAN_TONICS
  readonly keyByTonic: Record<DorianTonic, DorianKey>
  readonly keyBySignature: Record<ModeKeySignature, DorianKey>

  constructor() {
    const keyByTonic: { [key in DorianTonic]?: DorianKey } = {}
    DORIAN_TONICS.forEach(tonic => {
      keyByTonic[tonic] = new DorianKey(tonic)
    })
    this.keyByTonic = keyByTonic as Record<DorianTonic, DorianKey> // TODO: Type guard this

    const keyBySignature: { [key in ModeKeySignature]?: DorianKey } = {}
    MODE_KEY_SIGNATURES.forEach(keySignature => {
      Object.values(this.keyByTonic).forEach(key => {
        if (keySignature === key.signature) {
          keyBySignature[keySignature] = key
        }
      })
    })

    if (isModeKeyBySignature<DorianKey>(keyBySignature, DorianKey)) {
      this.keyBySignature = keyBySignature
    } else {
      throw TypeError(`There was a problem generating keyBySignature for DorianMode`)
    }
  }

  key (keyIdentifier: ModeKeySignature | DorianStandardTonic): DorianKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class PhrygianMode implements ModeData {
  readonly name: ModeName = 'Phrygian'
  readonly chordNumerals: readonly ChordNumeral[] = ['i', '\u1d47II', '\u1d47III', 'iv', 'v\u2070', '\u1d47VI', '\u1d47vii']
  readonly chordBases: readonly DiatonicChordType[] = ['min', 'maj', 'maj', 'min', 'dim', 'maj', 'min']
  readonly semitoneStructure: readonly number[] = [1, 2, 2, 2, 1, 2, 2]
  readonly intervals: readonly ShortIntervalName[] = ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7']
  readonly degreeAdjustmentFromIonian: readonly number[] = [0, -1, -1, 0, 0, -1, -1]
  readonly tonics: readonly PhrygianTonic[] = PHRYGIAN_TONICS
  readonly keyByTonic: Record<PhrygianTonic, PhrygianKey>
  readonly keyBySignature: Record<ModeKeySignature, PhrygianKey>

  constructor() {
    const keyByTonic: { [key in PhrygianTonic]?: PhrygianKey } = {}
    PHRYGIAN_TONICS.forEach(tonic => {
      keyByTonic[tonic] = new PhrygianKey(tonic)
    })
    this.keyByTonic = keyByTonic as Record<PhrygianTonic, PhrygianKey> // TODO: Type guard this

    const keyBySignature: { [key in ModeKeySignature]?: PhrygianKey } = {}
    MODE_KEY_SIGNATURES.forEach(keySignature => {
      Object.values(this.keyByTonic).forEach(key => {
        if (keySignature === key.signature) {
          keyBySignature[keySignature] = key
        }
      })
    })

    if (isModeKeyBySignature<PhrygianKey>(keyBySignature, PhrygianKey)) {
      this.keyBySignature = keyBySignature
    } else {
      throw TypeError(`There was a problem generating keyBySignature for PhrygianMode`)
    }
  }

  key (keyIdentifier: ModeKeySignature | PhrygianStandardTonic): PhrygianKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class LydianMode implements ModeData {
  readonly name: ModeName = 'Lydian'
  readonly chordNumerals: readonly ChordNumeral[] = ['I', 'II', 'iii', '#iv\u2070', 'V', 'vi', 'vii']
  readonly chordBases: readonly DiatonicChordType[] = ['maj', 'maj', 'min', 'dim', 'maj', 'min', 'min']
  readonly semitoneStructure: readonly number[] = [2, 2, 2, 1, 2, 2, 1]
  readonly intervals: readonly ShortIntervalName[] = ['P1', 'M2', 'M3', 'TT', 'P5', 'M6', 'M7']
  readonly degreeAdjustmentFromIonian: readonly number[] = [0, 0, 0, 1, 0, 0, 0]
  readonly tonics: readonly LydianTonic[] = LYDIAN_TONICS
  readonly keyByTonic: Record<LydianTonic, LydianKey>
  readonly keyBySignature: Record<ModeKeySignature, LydianKey>

  constructor() {
    const keyByTonic: { [key in LydianTonic]?: LydianKey } = {}
    LYDIAN_TONICS.forEach(tonic => {
      keyByTonic[tonic] = new LydianKey(tonic)
    })
    this.keyByTonic = keyByTonic as Record<LydianTonic, LydianKey> // TODO: Type guard this

    const keyBySignature: { [key in ModeKeySignature]?: LydianKey } = {}
    MODE_KEY_SIGNATURES.forEach(keySignature => {
      Object.values(this.keyByTonic).forEach(key => {
        if (keySignature === key.signature) {
          keyBySignature[keySignature] = key
        }
      })
    })

    if (isModeKeyBySignature<LydianKey>(keyBySignature, LydianKey)) {
      this.keyBySignature = keyBySignature
    } else {
      throw TypeError(`There was a problem generating keyBySignature for LydianMode`)
    }
  }

  key (keyIdentifier: ModeKeySignature | LydianStandardTonic): LydianKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class MixolydianMode implements ModeData {
  readonly name: ModeName = 'Mixolydian'
  readonly chordNumerals: readonly ChordNumeral[] = ['I', 'ii', 'iii\u2070', 'IV', 'v', 'vi', '\u1d47VII']
  readonly chordBases: readonly DiatonicChordType[] = ['maj', 'min', 'dim', 'maj', 'min', 'min', 'maj']
  readonly semitoneStructure: readonly number[] = [2, 2, 1, 2, 2, 1, 2]
  readonly intervals: readonly ShortIntervalName[] = ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7']
  readonly degreeAdjustmentFromIonian: readonly number[] = [0, 0, 0, 0, 0, 0, -1]
  readonly tonics: readonly MixolydianTonic[] = MIXOLYDIAN_TONICS
  readonly keyByTonic: Record<MixolydianTonic, MixolydianKey>
  readonly keyBySignature: Record<ModeKeySignature, MixolydianKey>

  constructor() {
    const keyByTonic: { [key in MixolydianTonic]?: MixolydianKey } = {}
    MIXOLYDIAN_TONICS.forEach(tonic => {
      keyByTonic[tonic] = new MixolydianKey(tonic)
    })
    this.keyByTonic = keyByTonic as Record<MixolydianTonic, MixolydianKey> // TODO: Type guard this

    const keyBySignature: { [key in ModeKeySignature]?: MixolydianKey } = {}
    MODE_KEY_SIGNATURES.forEach(keySignature => {
      Object.values(this.keyByTonic).forEach(key => {
        if (keySignature === key.signature) {
          keyBySignature[keySignature] = key
        }
      })
    })

    if (isModeKeyBySignature<MixolydianKey>(keyBySignature, MixolydianKey)) {
      this.keyBySignature = keyBySignature
    } else {
      throw TypeError(`There was a problem generating keyBySignature for MixolydianMode`)
    }
  }

  key (keyIdentifier: ModeKeySignature | MixolydianStandardTonic): Key {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class AeolianMode implements ModeData {
  readonly name: ModeName = 'Aeolian'
  readonly chordNumerals: readonly ChordNumeral[] = ['i', 'ii\u2070', '\u1d47III', 'iv', 'v', '\u1d47VI', '\u1d47VII']
  readonly chordBases: readonly DiatonicChordType[] = ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj']
  readonly semitoneStructure: readonly number[] = [2, 1, 2, 2, 1, 2, 2]
  readonly intervals: readonly ShortIntervalName[] = ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7']
  readonly degreeAdjustmentFromIonian: readonly number[] = [0, 0, -1, 0, 0, -1, -1]
  readonly tonics: readonly AeolianTonic[] = AEOLIAN_TONICS
  readonly keyByTonic: Record<AeolianTonic, AeolianKey>
  readonly keyBySignature: Record<ModeKeySignature, AeolianKey>

  constructor() {
    const keyByTonic: { [key in AeolianTonic]?: AeolianKey } = {}
    AEOLIAN_TONICS.forEach(tonic => {
      keyByTonic[tonic] = new AeolianKey(tonic)
    })
    this.keyByTonic = keyByTonic as Record<AeolianTonic, AeolianKey> // TODO: Type guard this

    const keyBySignature: { [key in ModeKeySignature]?: AeolianKey } = {}
    MODE_KEY_SIGNATURES.forEach(keySignature => {
      Object.values(this.keyByTonic).forEach(key => {
        if (keySignature === key.signature) {
          keyBySignature[keySignature] = key
        }
      })
    })

    if (isModeKeyBySignature<AeolianKey>(keyBySignature, AeolianKey)) {
      this.keyBySignature = keyBySignature
    } else {
      throw TypeError(`There was a problem generating keyBySignature for AeolianMode`)
    }
  }

  key (keyIdentifier: ModeKeySignature | AeolianStandardTonic): Key {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class LocrianMode implements ModeData {
  readonly name: ModeName = 'Locrian'
  readonly chordNumerals: readonly ChordNumeral[] = ['i\u2070', '\u1d47II', '\u1d47iii', 'iv', '\u1d47V', '\u1d47VI', '\u1d47vii']
  readonly chordBases: readonly DiatonicChordType[] = ['dim', 'maj', 'min', 'min', 'maj', 'maj', 'min']
  readonly semitoneStructure: readonly number[] = [1, 2, 2, 1, 2, 2, 2]
  readonly intervals: readonly ShortIntervalName[] = ['P1', 'm2', 'm3', 'P4', 'TT', 'm6', 'm7']
  readonly degreeAdjustmentFromIonian: readonly number[] = [0, -1, -1, 0, -1, -1, -1]
  readonly tonics: readonly LocrianTonic[] = LOCRIAN_TONICS
  readonly keyByTonic: Record<LocrianTonic, LocrianKey>
  readonly keyBySignature: Record<ModeKeySignature, LocrianKey>

  constructor() {
    const keyByTonic: { [key in LocrianTonic]?: LocrianKey } = {}
    LOCRIAN_TONICS.forEach(tonic => {
      keyByTonic[tonic] = new LocrianKey(tonic)
    })
    this.keyByTonic = keyByTonic as Record<LocrianTonic, LocrianKey> // TODO: Type guard this

    const keyBySignature: { [key in ModeKeySignature]?: LocrianKey } = {}
    MODE_KEY_SIGNATURES.forEach(keySignature => {
      Object.values(this.keyByTonic).forEach(key => {
        if (keySignature === key.signature) {
          keyBySignature[keySignature] = key
        }
      })
    })

    if (isModeKeyBySignature<LocrianKey>(keyBySignature, LocrianKey)) {
      this.keyBySignature = keyBySignature
    } else {
      throw TypeError(`There was a problem generating keyBySignature for LocrianMode`)
    }
  }

  key (keyIdentifier: ModeKeySignature | LocrianStandardTonic): Key {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export const MODE_BY_NAME: {
  Ionian: IonianMode,
  Dorian: DorianMode,
  Phrygian: PhrygianMode,
  Lydian: LydianMode,
  Mixolydian: MixolydianMode,
  Aeolian: AeolianMode,
  Locrian: LocrianMode
} = {
  Ionian: new IonianMode(),
  Dorian: new DorianMode(),
  Phrygian: new PhrygianMode(),
  Lydian: new LydianMode(),
  Mixolydian: new MixolydianMode(),
  Aeolian: new AeolianMode(),
  Locrian: new LocrianMode()
}