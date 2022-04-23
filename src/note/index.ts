import {Interval, IntervalIdentifier} from '../interval'
import { normalizeValue } from '../utils'
import {isInMode, ModeName} from "../mode";

// Data / Types

export const NATURAL_NOTES: readonly string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
export type NaturalNote = typeof NATURAL_NOTES[number]
export function isNaturalNote (note: string): note is NaturalNote {
  return NATURAL_NOTES.includes(note as NaturalNote)
}

export const ACCENTED_NOTES: readonly string[] = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'] as const
export type AccentedNote = typeof ACCENTED_NOTES[number]
export function isAccentedNote (note: string): note is AccentedNote {
  return ACCENTED_NOTES.includes(note as AccentedNote)
}

export const THEORETICAL_NOTES: readonly string[] = ['C##', 'D##', 'E##', 'F##', 'G##', 'A##', 'B##', 'Cbb', 'Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb'] as const
export type TheoreticalNote = typeof THEORETICAL_NOTES[number]
export function isTheoreticalNote (note: string): note is TheoreticalNote {
  return THEORETICAL_NOTES.includes(note as TheoreticalNote)
}

export type StandardNote = NaturalNote | AccentedNote
export function isStandardNote (note: string): note is StandardNote {
  return isNaturalNote(note) || isAccentedNote(note)
}

export type AnyNote = StandardNote | TheoreticalNote
export function isAnyNote (note: string): note is AnyNote {
  return isStandardNote(note) || isTheoreticalNote(note)
}

export const NOTE_REGISTER: readonly number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const
export type NoteRegister = typeof NOTE_REGISTER[number]

export type ToneNotes = [AnyNote, AnyNote, AnyNote] | [AnyNote, AnyNote]

export interface Tone {
  index: number
  notes: ToneNotes
}

// export type Tone = readonly [AnyNote, AnyNote, AnyNote] | readonly [AnyNote, AnyNote]
export const TONES: readonly Tone[] = [
  { notes: ['G##', 'A', 'Bbb'], index: 0 },
  { notes: ['A#', 'Bb', 'Cbb'], index: 1 },
  { notes: ['A##', 'B', 'Cb'], index: 2 },
  { notes: ['B#', 'C', 'Dbb'], index: 3 },
  { notes: ['B##', 'C#', 'Db'], index: 4 },
  { notes: ['C##', 'D', 'Ebb'], index: 5 },
  { notes: ['D#', 'Eb', 'Fbb'], index: 6 },
  { notes: ['D##', 'E', 'Fb'], index: 7 },
  { notes: ['E#', 'F', 'Gbb'], index: 8 },
  { notes: ['E##', 'F#', 'Gb'], index: 9 },
  { notes: ['F##', 'G', 'Abb'], index: 10 },
  { notes: ['G#', 'Ab'], index: 11 }
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

export function getTone(note: AnyNote): Tone {
  return TONES_BY_NOTE[note]
}

export function simplify(note: StandardNote): StandardNote
export function simplify(note: TheoreticalNote): StandardNote[]
export function simplify(note: AnyNote, mode: ModeName): StandardNote
export function simplify(note: AnyNote, mode?: ModeName): StandardNote[] | StandardNote | undefined {
  const tone = getTone(note)
  const standardNotes = tone.notes.filter(isStandardNote)
  if (isStandardNote(note) && !mode) {
    return note
  } else if (isStandardNote(note) && mode) {
    return standardNotes.filter(note => isInMode(note, mode))[0]
  } else if (isTheoreticalNote(note) && !mode) {
    return standardNotes
  } else if (isTheoreticalNote(note) && mode) {
    return standardNotes.filter(note => isInMode(note, mode))[0]
  }
}

export function interval (firstNote: AnyNote, secondNote: AnyNote): Interval {
  return new Interval(normalizeValue(TONES_BY_NOTE[firstNote].index - TONES_BY_NOTE[secondNote].index, 12))
}

export function transpose (note: AnyNote, intervalIdentifier: IntervalIdentifier, mode: ModeName): StandardNote
export function transpose (note: AnyNote, intervalIdentifier: IntervalIdentifier): ToneNotes
export function transpose (note: AnyNote, intervalIdentifier: IntervalIdentifier, mode?: ModeName): ToneNotes | StandardNote {
  const interval = new Interval(intervalIdentifier)
  const tone = TONES[normalizeValue(TONES_BY_NOTE[note].index + interval.length, 12)]
  if (mode) {
    return simplify(tone.notes[0], mode)
  } else {
    return tone.notes
  }

}

for (let i = 0; i < 24; i++) {
  console.log(transpose('B', i, 'Ionian'))
}
