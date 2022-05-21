import { Interval, IntervalIdentifier } from '../interval'
import { wrapValue } from '../utils'
import {
  isModeStandardKey,
  ModeName,
  IonianModeName,
  IonianStandardTonic,
  DorianModeName,
  DorianStandardTonic,
  PhrygianStandardTonic,
  LydianModeName,
  PhrygianModeName,
  LydianStandardTonic,
  MixolydianModeName,
  MixolydianStandardTonic,
  AeolianModeName,
  AeolianStandardTonic,
  LocrianStandardTonic,
  LocrianModeName
} from "../mode"

// Data / Types

export const NATURAL_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
export type NaturalNote = typeof NATURAL_NOTES[number]
export function isNaturalNote (note: any): note is NaturalNote {
  return NATURAL_NOTES.includes(note.toString() as NaturalNote)
}

export const STANDARD_SHARP_NOTES = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'] as const
export type StandardSharpNote = typeof STANDARD_SHARP_NOTES[number]
export function isStandardSharpNote (note: any): note is StandardSharpNote {
  return STANDARD_SHARP_NOTES.includes(note.toString() as StandardSharpNote)
}

export const STANDARD_FLAT_NOTES = ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'] as const
export type StandardFlatNote = typeof STANDARD_FLAT_NOTES[number]
export function isStandardFlatNote (note: any): note is StandardFlatNote {
  return STANDARD_FLAT_NOTES.includes(note.toString() as StandardFlatNote)
}

export const THEORETICAL_SHARP_NOTES = ['C##', 'D##', 'E##', 'F##', 'G##', 'A##', 'B##'] as const
export type TheoreticalSharpNote = typeof THEORETICAL_SHARP_NOTES[number]
export function isTheoreticalSharpNote (note: any): note is TheoreticalSharpNote {
  return THEORETICAL_SHARP_NOTES.includes(note.toString() as TheoreticalSharpNote)
}

export const THEORETICAL_FLAT_NOTES = ['Cbb', 'Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb'] as const
export type TheoreticalFlatNote = typeof THEORETICAL_FLAT_NOTES[number]
export function isTheoreticalFlatNote (note: any): note is TheoreticalFlatNote {
  return THEORETICAL_FLAT_NOTES.includes(note.toString() as TheoreticalFlatNote)
}

export type StandardAccentedNote = StandardSharpNote | StandardFlatNote
export function isAccentedNote (note: any): note is StandardAccentedNote {
  return isStandardSharpNote(note) || isStandardFlatNote(note)
}

export type TheoreticalNote = TheoreticalSharpNote | TheoreticalFlatNote
export function isTheoreticalNote (note: any): note is TheoreticalNote {
  return isTheoreticalSharpNote(note) || isTheoreticalFlatNote(note)
}

export type StandardNote = NaturalNote | StandardAccentedNote
export function isStandardNote (note: any): note is StandardNote {
  return isNaturalNote(note) || isAccentedNote(note)
}

export type AnyNote = StandardNote | TheoreticalNote
export function isAnyNote (note: any): note is AnyNote {
  return isStandardNote(note) || isTheoreticalNote(note)
}

export const NOTE_REGISTER = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const
export type NoteRegister = typeof NOTE_REGISTER[number]

export type ToneNotes = [AnyNote, AnyNote, AnyNote] | [AnyNote, AnyNote]

export interface Tone {
  index: number
  notes: ToneNotes
}

const TONES: readonly Tone[] = [
  { notes: ['B#', 'C', 'Dbb'], index: 0 },
  { notes: ['B##', 'C#', 'Db'], index: 1 },
  { notes: ['C##', 'D', 'Ebb'], index: 2 },
  { notes: ['D#', 'Eb', 'Fbb'], index: 3 },
  { notes: ['D##', 'E', 'Fb'], index: 4 },
  { notes: ['E#', 'F', 'Gbb'], index: 5 },
  { notes: ['E##', 'F#', 'Gb'], index: 6 },
  { notes: ['F##', 'G', 'Abb'], index: 7 },
  { notes: ['G#', 'Ab'], index: 8 },
  { notes: ['G##', 'A', 'Bbb'], index: 9 },
  { notes: ['A#', 'Bb', 'Cbb'], index: 10 },
  { notes: ['A##', 'B', 'Cb'], index: 11 },
]

function tonesByNote (): Record<AnyNote, Tone> {
  const tonesByNote: { [key in AnyNote]?: Tone } = {}
  TONES.forEach(tone => {
    tone.notes.forEach(note => {
      tonesByNote[note] = tone
    })
  })
  return tonesByNote as Record<AnyNote, Tone>
}
export const TONES_BY_NOTE: Record<AnyNote, Tone> = tonesByNote()


// Functions / Classes

export function getNextNaturalNote(note: NaturalNote): NaturalNote {
  for (let i = 0; i < NATURAL_NOTES.length; i++) {
    if (NATURAL_NOTES[i] === note) {
      return NATURAL_NOTES[(i + 1) % NATURAL_NOTES.length]
    }
  }
  // TODO: Decide how to handle this
  return 'C'
}

export function getTone(noteOrIndex: AnyNote | number): Tone {
  if (isAnyNote(noteOrIndex)) {
    return TONES_BY_NOTE[noteOrIndex]
  } else {
    return TONES[noteOrIndex % TONES.length]
  }
}

export function simplifyNote(note: StandardNote): StandardNote
export function simplifyNote(note: TheoreticalNote): StandardNote[]
export function simplifyNote(note: AnyNote, mode: IonianModeName): IonianStandardTonic
export function simplifyNote(note: AnyNote, mode: DorianModeName): DorianStandardTonic
export function simplifyNote(note: AnyNote, mode: PhrygianModeName): PhrygianStandardTonic
export function simplifyNote(note: AnyNote, mode: LydianModeName): LydianStandardTonic
export function simplifyNote(note: AnyNote, mode: MixolydianModeName): MixolydianStandardTonic
export function simplifyNote(note: AnyNote, mode: AeolianModeName): AeolianStandardTonic
export function simplifyNote(note: AnyNote, mode: LocrianModeName): LocrianStandardTonic
export function simplifyNote(note: AnyNote, mode: ModeName): StandardNote
export function simplifyNote(note: AnyNote, mode?: ModeName): StandardNote[] | StandardNote | undefined {
  const tone = getTone(note)
  const toneNotes = tone.notes.filter(toneNote => toneNote !== note)
  const standardNotes = toneNotes.filter(isStandardNote)
  if (isStandardNote(note) && !mode) {
    return note
  } else if (isTheoreticalNote(note) && !mode) {
    return standardNotes
  } else if (mode) {
    return standardNotes.filter(note => isModeStandardKey(note, mode))[0]
  }
}

export function interval (firstNote: AnyNote, secondNote: AnyNote): Interval {
  return new Interval(wrapValue(TONES_BY_NOTE[firstNote].index - TONES_BY_NOTE[secondNote].index, 12))
}

export function transpose (note: AnyNote, intervalIdentifier: IntervalIdentifier, mode: ModeName): StandardNote
export function transpose (note: AnyNote, intervalIdentifier: IntervalIdentifier): ToneNotes
export function transpose (note: AnyNote, intervalIdentifier: IntervalIdentifier, mode?: ModeName): ToneNotes | StandardNote {
  const interval = new Interval(intervalIdentifier)
  const tone = TONES[wrapValue(TONES_BY_NOTE[note].index + interval.length, 12)]
  if (mode) {
    return simplifyNote(tone.notes[0], mode)
  } else {
    return tone.notes
  }

}
