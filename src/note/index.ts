// Types

import { IntervalIdentifier, interval as i } from "../interval"
import {normalizeValue} from '../utils'

export const naturalNote = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
export type NaturalNote = typeof naturalNote[number]

export const noteAccidental = ['', '#', '##', '###', '####', '#####', '######', '#######', 'b', 'bb', 'bbb', 'bbbb', 'bbbbb', 'bbbbbb', 'bbbbbbb'] as const
export type NoteAccidental = typeof noteAccidental[number]

export const noteRegister = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const
export type NoteRegister = typeof noteRegister[number]

export type Note = `${NaturalNote}${NoteAccidental}`
export type RegisterNote = `${Note}${NoteRegister}`

// Data

const tones: Note[][] = [
  ['Ab', 'G#'],
  ['A'],
  ['A#', 'Bb'],
  ['B', 'Cb'],
  ['B#', 'C'],
  ['C#', 'Db'],
  ['D'],
  ['D#', 'Eb'],
  ['E', 'Fb'],
  ['E#', 'F'],
  ['F#', 'Gb'],
  ['G']
]

// Functions

function transpose (note: Note, interval: IntervalIdentifier): Note[] {
  const intervalData = i.getIntervalData(interval)
  const simpleNote = simplify(note)
  const toneIndex = tones.findIndex(tone => tone.includes(simpleNote[0]))
  return tones[normalizeValue(toneIndex + intervalData.length, 12)]
}

function simplify (note: Note): Note[] {
  const accidentalOffset = (note.match(/#/g) || []).length - (note.match(/b/g) || []).length
  const root = note[0] as Note
  const toneIndex = tones.findIndex(tone => tone.includes(root))
  if (toneIndex === -1) {
    return [ note ]
  } else {
    return tones[normalizeValue(toneIndex + accidentalOffset, 12)]
  }
}

export const note = {
  transpose,
  simplify
}