import { ChordNumeral, DiatonicChordType } from "../chord"
import { ShortIntervalName } from "../interval"
import { AnyNote, StandardNote } from '../note'
import {IonianKey, Key} from "../key";

const MODE_KEY_SIGNATURES = [
  '',
  '1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '10#', '11#', '12#', '13#', '14#',
  '1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b', '9b', '10b', '11b', '12b', '13b', '14b',
] as const
export type ModeKeySignature = typeof MODE_KEY_SIGNATURES[number]
export function isModeKeySignature (signature: any): signature is ModeKeySignature {
  return MODE_KEY_SIGNATURES.includes(signature)
}

export type IonianModeName = 'Ionian'
export type DorianModeName = 'Dorian'
export type PhrygianModeName = 'Phrygian'
export type LydianModeName = 'Lydian'
export type MixolydianModeName = 'Mixolydian'
export type AeolianModeName = 'Aeolian'
export type LocrianModeName = 'Locrian'
export const MODE_NAMES = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'] as const
export type AnyModeName = typeof MODE_NAMES[number]


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

export const ANY_MODE_DEGREE_NUMBER = [...STANDARD_MODE_DEGREE_NUMBERS, ...ALTERED_MODE_DEGREE_NUMBERS] as const
export type AnyModeDegreeNumber = typeof ANY_MODE_DEGREE_NUMBER[number]
export function isAnyModeDegreeNumber (degree: any): degree is AnyModeDegreeNumber {
  return ANY_MODE_DEGREE_NUMBER.includes(degree)
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
    tonics: IONIAN_TONICS
  },
  Dorian: {
    name: 'Dorian',
    chordNumerals: ['i', 'ii', '\u1d47III', 'IV', 'v', 'vi\u2070', '\u1d47VII'],
    chordBases: ['min', 'min', 'maj', 'maj', 'min', 'dim', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 2, 1, 2],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7', 'P8'],
    ionianAdjustment: [0, 0, -1, 0, 0, 0, -1],
    tonics: DORIAN_TONICS
  },
  Phrygian: {
    name: 'Phrygian',
    chordNumerals: ['i', '\u1d47II', '\u1d47III', 'iv', 'v\u2070', '\u1d47VI', '\u1d47vii'],
    chordBases: ['min', 'maj', 'maj', 'min', 'dim', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 2, 1, 2, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    ionianAdjustment: [0, -1, -1, 0, 0, -1, -1],
    tonics: PHRYGIAN_TONICS
  },
  Lydian: {
    name: 'Lydian',
    chordNumerals: ['I', 'II', 'iii', '#iv\u2070', 'V', 'vi', 'vii'],
    chordBases: ['maj', 'maj', 'min', 'dim', 'maj', 'min', 'min'],
    semitoneStructure: [2, 2, 2, 1, 2, 2, 1],
    intervals: ['P1', 'M2', 'M3', 'TT', 'P5', 'M6', 'M7'],
    ionianAdjustment: [0, 0, 0, 1, 0, 0, 0],
    tonics: LYDIAN_TONICS
  },
  Mixolydian: {
    name: 'Mixolydian',
    chordNumerals: ['I', 'ii', 'iii\u2070', 'IV', 'v', 'vi', '\u1d47VII'],
    chordBases: ['maj', 'min', 'dim', 'maj', 'min', 'min', 'maj'],
    semitoneStructure: [2, 2, 1, 2, 2, 1, 2],
    intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
    ionianAdjustment: [0, 0, 0, 0, 0, 0, -1],
    tonics: MIXOLYDIAN_TONICS
  },
  Aeolian: {
    name: 'Aeolian',
    chordNumerals: ['i', 'ii\u2070', '\u1d47III', 'iv', 'v', '\u1d47VI', '\u1d47VII'],
    chordBases: ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 1, 2, 2],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    ionianAdjustment: [0, 0, -1, 0, 0, -1, -1],
    tonics: AEOLIAN_TONICS
  },
  Locrian: {
    name: 'Locrian',
    chordNumerals: ['i\u2070', '\u1d47II', '\u1d47iii', 'iv', '\u1d47V', '\u1d47VI', '\u1d47vii'],
    chordBases: ['dim', 'maj', 'min', 'min', 'maj', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 1, 2, 2, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'TT', 'm6', 'm7'],
    ionianAdjustment: [0, -1, -1, 0, -1, -1, -1],
    tonics: LOCRIAN_TONICS
  }
}

export function getModeTonePattern(mode: AnyModeName): number[] {
  return MODE_DATA[mode].semitoneStructure
}


export function isKeyBySignature (keyBySignature: Record<string, unknown>): keyBySignature is Record<ModeKeySignature, Key> {
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
    if (!(key instanceof Key)) {
      valuesAreKeyType = false
    }
  })

  return lengthMatches && keysMatch && valuesAreKeyType
}

export function isIonianKeyBySignature (keyBySignature: Record<string, unknown>): keyBySignature is Record<ModeKeySignature, IonianKey> {
  let valuesAreIonianKeyType = true
  Object.values(keyBySignature).forEach(key => {
    if (!(key instanceof IonianKey)) {
      valuesAreIonianKeyType = false
    }
  })

  return isKeyBySignature(keyBySignature) && valuesAreIonianKeyType
}


export function names (): readonly AnyModeName[] {
  return MODE_NAMES
}

export abstract class ModeData {
  readonly name: AnyModeName
  readonly chordNumerals: ChordNumeral[]
  readonly chordBases: DiatonicChordType[]
  readonly semitoneStructure: number[]
  readonly intervals: ShortIntervalName[]
  readonly ionianAdjustment: number[]

  constructor(name: AnyModeName) {
    this.name = name
    this.chordNumerals = MODE_DATA[this.name].chordNumerals
    this.chordBases = MODE_DATA[this.name].chordBases
    this.semitoneStructure = MODE_DATA[this.name].semitoneStructure
    this.intervals = MODE_DATA[this.name].intervals
    this.ionianAdjustment = MODE_DATA[this.name].ionianAdjustment
  }
}

interface IonianData extends ModeData { tonics: readonly IonianTonic[] }
interface DorianData extends ModeData { tonics: readonly DorianTonic[] }
interface PhrygianData extends ModeData { tonics: readonly PhrygianTonic[] }
interface LydianData extends ModeData { tonics: readonly LydianTonic[] }
interface MixolydianData extends ModeData { tonics: readonly MixolydianTonic[] }
interface AeolianData extends ModeData { tonics: readonly AeolianTonic[] }
interface LocrianData extends ModeData { tonics: readonly LocrianTonic[] }

export class Mode extends ModeData {
  readonly keyByTonic: { [key in AnyNote]?: Key }
  readonly keyBySignature: Record<ModeKeySignature, Key>

  constructor(modeName: AnyModeName) {
    super(modeName)
    this.keyByTonic = {}
    MODE_DATA[modeName].tonics.forEach(key => {
      this.keyByTonic[key] = new Key(key, modeName)
    })
    const keyBySignature: { [key in ModeKeySignature]?: Key } = {}
    MODE_KEY_SIGNATURES.forEach(keySignature => {
      Object.values(this.keyByTonic).forEach(key => {
        if (keySignature === key.signature) {
          keyBySignature[keySignature] = key
        }
      })
    })
    if (isKeyBySignature(keyBySignature)) {
      this.keyBySignature = keyBySignature
    } else {
      throw TypeError(`There was a problem generating keyBySignature for mode ${modeName}`)
    }

  }

  key (keyIdentifier: ModeKeySignature | AnyNote): Key | TypeError {
    if ()
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class IonianMode extends Mode {
  declare readonly keyByTonic: Record<IonianStandardTonic, IonianKey>
  declare readonly keyBySignature: Record<ModeKeySignature, IonianKey>
  constructor() {
    super('Ionian')
    this.keyByTonic = MODE_DATA.Ionian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | IonianStandardTonic): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class DorianMode extends Mode {
  declare readonly keyByTonic: Record<DorianStandardTonic, ModeKey>
  constructor() {
    super('Dorian')
    this.keyByTonic = MODE_DATA.Dorian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | DorianStandardTonic): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class PhrygianMode extends Mode {
  declare readonly keyByTonic: Record<PhrygianStandardTonic, ModeKey>
  constructor() {
    super('Phrygian')
    this.keyByTonic = MODE_DATA.Phrygian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | PhrygianStandardTonic): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class LydianMode extends Mode {
  declare readonly keyByTonic: Record<LydianStandardTonic, ModeKey>
  constructor() {
    super('Lydian')
    this.keyByTonic = MODE_DATA.Lydian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | LydianStandardTonic): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class MixolydianMode extends Mode {
  declare readonly keyByTonic: Record<MixolydianStandardTonic, ModeKey>
  constructor() {
    super('Mixolydian')
    this.keyByTonic = MODE_DATA.Mixolydian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | MixolydianStandardTonic): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class AeolianMode extends Mode {
  declare readonly keyByTonic: Record<AeolianStandardTonic, ModeKey>
  constructor() {
    super('Aeolian')
    this.keyByTonic = MODE_DATA.Aeolian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | AeolianStandardTonic): ModeKey {
    return isModeKeySignature(keyIdentifier) ? this.keyBySignature[keyIdentifier] : this.keyByTonic[keyIdentifier]
  }
}

export class LocrianMode extends Mode {
  declare readonly keyByTonic: Record<LocrianStandardTonic, ModeKey>
  constructor() {
    super('Aeolian')
    this.keyByTonic = MODE_DATA.Locrian.keyByTonic
  }

  key (keyIdentifier: ModeKeySignature | LocrianStandardTonic): ModeKey {
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
