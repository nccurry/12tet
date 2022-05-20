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
export function isModeKeySignature (signature: string): signature is ModeKeySignature {
  return MODE_KEY_SIGNATURES.includes((signature as ModeKeySignature))
}

export const MODE_NAMES = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'] as const
export type AnyModeName = typeof MODE_NAMES[number]
export type IonianModeName = 'Ionian'
export type DorianModeName = 'Dorian'
export type PhrygianModeName = 'Phrygian'
export type LydianModeName = 'Lydian'
export type MixolydianModeName = 'Mixolydian'
export type AeolianModeName = 'Aeolian'
export type LocrianModeName = 'Locrian'

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

export const IONIAN_STANDARD_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'] as const
export type IonianStandardKey = typeof IONIAN_STANDARD_KEYS[number]
export function isIonianStandardKey (note: any): note is IonianStandardKey {
  return IONIAN_STANDARD_KEYS.includes(note)
}

export const IONIAN_THEORETICAL_KEYS = ['G#', 'D#', 'A#', 'E#', 'B#', 'F##', 'C##', 'Cbb', 'Gbb', 'Dbb', 'Abb', 'Ebb', 'Bbb', 'Fb'] as const
export type IonianTheoreticalKey = typeof IONIAN_THEORETICAL_KEYS[number]
export function isIonianTheoreticalKey (note: any): note is IonianTheoreticalKey {
  return IONIAN_THEORETICAL_KEYS.includes(note)
}

export const IONIAN_ANY_KEYS = [...IONIAN_STANDARD_KEYS, ...IONIAN_THEORETICAL_KEYS] as const
export type IonianAnyKey = typeof IONIAN_ANY_KEYS[number]
export function isIonianAnyKey (note: any): note is IonianAnyKey {
  return IONIAN_ANY_KEYS.includes(note)
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

export type AnyStandardKey = IonianStandardKey | DorianStandardKey | PhrygianStandardKey | LydianStandardKey | MixolydianStandardKey | AeolianStandardKey | LocrianStandardKey

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
    keys: [...IONIAN_STANDARD_KEYS, ...IONIAN_THEORETICAL_KEYS]
  },
  Dorian: {
    name: 'Dorian',
    chordNumerals: ['i', 'ii', '\u1d47III', 'IV', 'v', 'vi\u2070', '\u1d47VII'],
    chordBases: ['min', 'min', 'maj', 'maj', 'min', 'dim', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 2, 1, 2],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7', 'P8'],
    ionianAdjustment: [0, 0, -1, 0, 0, 0, -1],
    keys: [...DORIAN_STANDARD_KEYS, ...DORIAN_THEORETICAL_KEYS]
  },
  Phrygian: {
    name: 'Phrygian',
    chordNumerals: ['i', '\u1d47II', '\u1d47III', 'iv', 'v\u2070', '\u1d47VI', '\u1d47vii'],
    chordBases: ['min', 'maj', 'maj', 'min', 'dim', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 2, 1, 2, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    ionianAdjustment: [0, -1, -1, 0, 0, -1, -1],
    keys: [...PHRYGIAN_STANDARD_KEYS, ...PHRYGIAN_THEORETICAL_KEYS]
  },
  Lydian: {
    name: 'Lydian',
    chordNumerals: ['I', 'II', 'iii', '#iv\u2070', 'V', 'vi', 'vii'],
    chordBases: ['maj', 'maj', 'min', 'dim', 'maj', 'min', 'min'],
    semitoneStructure: [2, 2, 2, 1, 2, 2, 1],
    intervals: ['P1', 'M2', 'M3', 'TT', 'P5', 'M6', 'M7'],
    ionianAdjustment: [0, 0, 0, 1, 0, 0, 0],
    keys: [...LYDIAN_STANDARD_KEYS, ...LYDIAN_THEORETICAL_KEYS]
  },
  Mixolydian: {
    name: 'Mixolydian',
    chordNumerals: ['I', 'ii', 'iii\u2070', 'IV', 'v', 'vi', '\u1d47VII'],
    chordBases: ['maj', 'min', 'dim', 'maj', 'min', 'min', 'maj'],
    semitoneStructure: [2, 2, 1, 2, 2, 1, 2],
    intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
    ionianAdjustment: [0, 0, 0, 0, 0, 0, -1],
    keys: [...MIXOLYDIAN_STANDARD_KEYS, ...MIXOLYDIAN_THEORETICAL_KEYS]
  },
  Aeolian: {
    name: 'Aeolian',
    chordNumerals: ['i', 'ii\u2070', '\u1d47III', 'iv', 'v', '\u1d47VI', '\u1d47VII'],
    chordBases: ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'],
    semitoneStructure: [2, 1, 2, 2, 1, 2, 2],
    intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    ionianAdjustment: [0, 0, -1, 0, 0, -1, -1],
    keys: [...AEOLIAN_STANDARD_KEYS, ...AEOLIAN_THEORETICAL_KEYS]
  },
  Locrian: {
    name: 'Locrian',
    chordNumerals: ['i\u2070', '\u1d47II', '\u1d47iii', 'iv', '\u1d47V', '\u1d47VI', '\u1d47vii'],
    chordBases: ['dim', 'maj', 'min', 'min', 'maj', 'maj', 'min'],
    semitoneStructure: [1, 2, 2, 1, 2, 2, 2],
    intervals: ['P1', 'm2', 'm3', 'P4', 'TT', 'm6', 'm7'],
    ionianAdjustment: [0, -1, -1, 0, -1, -1, -1],
    keys: [...LOCRIAN_STANDARD_KEYS, ...LOCRIAN_THEORETICAL_KEYS]
  }
}

export function getModeTonePattern(mode: AnyModeName): number[] {
  return MODE_DATA[mode].semitoneStructure
}

export function isModeAnyKey (key: AnyNote, mode: AnyModeName): boolean {
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

export function isModeStandardKey (key: AnyNote, mode: AnyModeName): boolean {
  switch (mode) {
    case 'Ionian':
      return isIonianStandardKey(key)
    case 'Dorian':
      return isDorianStandardKey(key)
    case 'Phrygian':
      return isPhrygianStandardKey(key)
    case 'Lydian':
      return isLydianStandardKey(key)
    case 'Mixolydian':
      return isMixolydianStandardKey(key)
    case 'Aeolian':
      return isAeolianStandardKey(key)
    case 'Locrian':
      return isLocrianStandardKey(key)
  }
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

interface IonianData extends ModeData { keys: IonianAnyKey[] }
interface DorianData extends ModeData { keys: DorianAnyKey[] }
interface PhrygianData extends ModeData { keys: PhrygianAnyKey[] }
interface LydianData extends ModeData { keys: LydianAnyKey[] }
interface MixolydianData extends ModeData { keys: MixolydianAnyKey[] }
interface AeolianData extends ModeData { keys: AeolianAnyKey[] }
interface LocrianData extends ModeData { keys: LocrianAnyKey[] }

export class Mode extends ModeData {
  readonly keyByTonic: { [key in AnyNote]?: Key }
  readonly keyBySignature: Record<ModeKeySignature, Key>

  constructor(modeName: AnyModeName) {
    super(modeName)
    this.keyByTonic = {}
    MODE_DATA[modeName].keys.forEach(key => {
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
  declare readonly keyByTonic: Record<IonianStandardKey, IonianKey>
  declare readonly keyBySignature: Record<ModeKeySignature, IonianKey>
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
