// Types

import {IntervalIdentifier, interval as i, Interval, interval} from '../interval'
import {normalizeValue} from '../utils'

export const naturalNote = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
export type NaturalNote = typeof naturalNote[number]

// "Simplest" notes that appear in any key in any mode. Excludes "complex" enharmonic equivalents.
export const modeNote = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'] as const
export type ModeNote = typeof modeNote[number]

export const noteAccidental = ['', '#', '##', '###', '####', '#####', '######', '#######', 'b', 'bb', 'bbb', 'bbbb', 'bbbbb', 'bbbbbb', 'bbbbbbb'] as const
export type NoteAccidental = typeof noteAccidental[number]

export const noteRegister = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const
export type NoteRegister = typeof noteRegister[number]

export type Note = `${NaturalNote}${NoteAccidental}`
export type RegisterNote = `${Note}${NoteRegister}`

// Data

const tones: ModeNote[][] = [
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
  const intervalData = i.getInterval(interval)
  const simpleNote = simplify(note)
  const toneIndex = tones.findIndex(tone => tone.includes(simpleNote[0] as ModeNote))
  return tones[normalizeValue(toneIndex + intervalData.length, 12)]
}

function simplify (note: Note): ModeNote[] {
  const accidentalOffset = (note.match(/#/g) || []).length - (note.match(/b/g) || []).length
  const root = note[0] as Note
  const toneIndex = tones.findIndex(tone => tone.includes(root as ModeNote))
  if (toneIndex === -1) {
    return []
  } else {
    return tones[normalizeValue(toneIndex + accidentalOffset, 12)]
  }
}

function distance (firstNote: Note, secondNote: Note): Interval {
  const simpleFirstNote = simplify(firstNote)
  const simpleSecondNote = simplify(secondNote)
  const firstToneIndex = tones.findIndex(tone => tone.includes(simpleFirstNote[0]))
  const secondToneIndex = tones.findIndex(tone => tone.includes(simpleSecondNote[0]))

  if (firstToneIndex === -1 || secondToneIndex === -1) {
    console.error(`There was a problem getting the distance between ${firstNote} and ${secondNote}`)
    return interval.getInterval(0)  // TODO: Probably don't want to do this
  } else {
    return interval.getInterval(normalizeValue(secondToneIndex - firstToneIndex, 12))
  }
}

export const note = {
  transpose,
  simplify,
  distance
}