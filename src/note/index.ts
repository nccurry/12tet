import {getWrappedArrayElement, removeArrayElement} from '../utils'

export const NATURAL_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
export type NaturalNote = typeof NATURAL_NOTES[number]
export function isNaturalNote (note: any): note is NaturalNote {
  return NATURAL_NOTES.includes(note)
}

export const STANDARD_SHARP_NOTES = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'] as const
export type StandardSharpNote = typeof STANDARD_SHARP_NOTES[number]
export function isStandardSharpNote (note: any): note is StandardSharpNote {
  return STANDARD_SHARP_NOTES.includes(note)
}

export const STANDARD_FLAT_NOTES = ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'] as const
export type StandardFlatNote = typeof STANDARD_FLAT_NOTES[number]
export function isStandardFlatNote (note: any): note is StandardFlatNote {
  return STANDARD_FLAT_NOTES.includes(note)
}

export const STANDARD_ACCENTED_NOTES = [...STANDARD_SHARP_NOTES, ...STANDARD_FLAT_NOTES] as const
export type StandardAccentedNote = typeof STANDARD_ACCENTED_NOTES[number]
export function isStandardAccentedNote (note: any): note is StandardAccentedNote {
  return STANDARD_ACCENTED_NOTES.includes(note)
}

export const STANDARD_NOTES = [...NATURAL_NOTES, ...STANDARD_SHARP_NOTES, ...STANDARD_FLAT_NOTES] as const
export type StandardNote = typeof STANDARD_NOTES[number]
export function isStandardNote (note: any): note is StandardNote {
  return STANDARD_NOTES.includes(note)
}

export const THEORETICAL_SHARP_NOTES = ['C##', 'D##', 'E##', 'F##', 'G##', 'A##', 'B##'] as const
export type TheoreticalSharpNote = typeof THEORETICAL_SHARP_NOTES[number]
export function isTheoreticalSharpNote (note: any): note is TheoreticalSharpNote {
  return THEORETICAL_SHARP_NOTES.includes(note)
}

export const THEORETICAL_FLAT_NOTES = ['Cbb', 'Dbb', 'Ebb', 'Fbb', 'Gbb', 'Abb', 'Bbb'] as const
export type TheoreticalFlatNote = typeof THEORETICAL_FLAT_NOTES[number]
export function isTheoreticalFlatNote (note: any): note is TheoreticalFlatNote {
  return THEORETICAL_FLAT_NOTES.includes(note)
}

export const THEORETICAL_NOTES = [...THEORETICAL_SHARP_NOTES, ...THEORETICAL_FLAT_NOTES] as const
export type TheoreticalNote = typeof THEORETICAL_NOTES[number]
export function isTheoreticalNote (note: any): note is TheoreticalNote {
  return THEORETICAL_NOTES.includes(note)
}

export const NOTES = [...STANDARD_NOTES, ...THEORETICAL_NOTES] as const
export type Note = typeof NOTES[number]
export function isNote (note: any): note is Note {
  return NOTES.includes(note)
}

export const NOTE_REGISTER = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const
export type NoteRegister = typeof NOTE_REGISTER[number]
export function isNoteRegister (register: any): register is NoteRegister {
  return NOTE_REGISTER.includes(register)
}

// Given a note, return the next natural note - i.e. B# => C, Cbb => D
export function getNextNaturalNote(note: Note): NaturalNote {
  for (let i = 0; i < NATURAL_NOTES.length; i++) {
    if (NATURAL_NOTES[i] === note[0]) {
      return getWrappedArrayElement([...NATURAL_NOTES], i + 1)
    }
  }

  throw TypeError(`Could not find next natural note for note ${note}`)
}

// A Tone is a grouping of enharnomically equivalent notes
export type Tone = [Note, Note, Note] | [Note, Note]

// All 12 tones in order
export const TONES: Tone[] = [
  ['B#', 'C', 'Dbb'],
  ['B##', 'C#', 'Db'],
  ['C##', 'D', 'Ebb'],
  ['D#', 'Eb', 'Fbb'],
  ['D##', 'E', 'Fb'],
  ['E#', 'F', 'Gbb'],
  ['E##', 'F#', 'Gb'],
  ['F##', 'G', 'Abb'],
  ['G#', 'Ab'],
  ['G##', 'A', 'Bbb'],
  ['A#', 'Bb', 'Cbb'],
  ['A##', 'B', 'Cb']
]

// A record mapping each note to its tone and its tones relative position
function tonesByNote (): Record<Note, { tone: Tone, index: number }> {
  const tonesByNote: { [key in Note]?: { tone: Tone, index: number } } = {}
  TONES.forEach((tone, index) => {
    tone.forEach(note => {
      tonesByNote[note] = { tone, index }
    })
  })
  return tonesByNote as Record<Note, { tone: Tone, index: number }>
}

export const TONES_BY_NOTE: Record<Note, { tone: Tone, index: number }> = tonesByNote()

export function enharmonicEquivalents(note: Note): Note[] {
  const tone = TONES_BY_NOTE[note].tone
  const noteIndex = tone.indexOf(note)
  if (noteIndex !== -1) {
    return removeArrayElement(tone, noteIndex)
  } else {
    return tone // This should never happen
  }
}