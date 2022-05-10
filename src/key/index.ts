import { normalizeValue, offsetArray, sumTo } from '../utils'
import {
  AnyNote,
  getNextNaturalNote,
  getTone,
  isNaturalNote,
  isStandardFlatNote,
  isStandardSharpNote, isTheoreticalFlatNote,
  isTheoreticalSharpNote,
  NaturalNote,
  simplifyNote, StandardNote,
  Tone,
} from '../note'
import {
  AnyModeDegreeNumber,
  isModeAnyKey,
  ModeKeySignature,
  AnyModeName, getModeTonePattern, ALTERED_MODE_DEGREE_NUMBERS, MODE_DEGREE_NUMBERS, ModeKey
} from '../mode'

function getKeySignatureFromNotes(notes: AnyNote[]): ModeKeySignature {
  let sharps = 0
  let flats = 0
  notes.forEach(note => {
    sharps += (note.match(/#/g) || []).length
    flats += (note.match(/b/g) || []).length
  })
  if (sharps === 0 && flats === 0) {
    return ''
  } else if (flats === 0) {
    return `${sharps}#` as ModeKeySignature
  } else {
    return `${flats}#` as ModeKeySignature
  }
}

function getKeyTones(tonic: AnyNote, mode: AnyModeName): Tone[] {
  const tone = getTone(tonic)
  let toneIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  toneIndexes = offsetArray(toneIndexes, tone.index)
  const modeTonePattern = getModeTonePattern(mode)

  // Generate tones
  const keyTones: Tone[] = []
  let index = -1
  while (keyTones.length < 7) {
    // If we're still at the tonic, just use the first toneIndex
    if (index === -1) {
      keyTones.push(getTone(toneIndexes[0]))
      // If not, count up the appropriate number of semitones for the mode
    } else {
      keyTones.push(getTone(toneIndexes[sumTo(modeTonePattern, index)]))
    }
    index++
  }
  return keyTones
}

// TODO: Gracefully handle enharmonic equivalents without a mode key
function convertKeyTonesToNotes(tonic: AnyNote, keyTones: Tone[]): AnyNote[] {
  // Convert tones to notes
  const notes: AnyNote[] = []
  keyTones.forEach((tone, index) => {
    if (index === 0) {
      notes.push(tonic)
    } else {
      const nextNote = getNextNaturalNote(notes[index - 1][0] as NaturalNote)
      tone.notes.forEach(note => {
        if (note[0] === nextNote) {
          notes.push(note)
        }
      })
    }
  })
  return notes
}

function adjustNote(note: AnyNote, adjustment: 'b' | '#' | ''): AnyNote {
  if (adjustment === '') {
    return note
  }

  let tone = getTone(note)
  switch (adjustment) {
    case "b":
      tone = getTone(normalizeValue(tone.index - 1, 12))
      break
    case "#":
      tone = getTone(normalizeValue(tone.index + 1, 12))
      break
  }

  const adjustedToneNaturalNote = tone.notes.filter(isNaturalNote)
  const adjustedToneStandardSharpNote = tone.notes.filter(isStandardSharpNote)
  const adjustedToneStandardFlatNote = tone.notes.filter(isStandardFlatNote)

  if (adjustedToneNaturalNote.length) {
    return adjustedToneNaturalNote[0]
  } else if (isTheoreticalSharpNote(note) && adjustedToneStandardSharpNote.length) {
    return adjustedToneStandardSharpNote[0]
  } else if (isTheoreticalFlatNote(note) && adjustedToneStandardFlatNote.length) {
    return adjustedToneStandardFlatNote[0]
  } else if (adjustedToneStandardSharpNote.length && adjustment === '#') {
    return adjustedToneStandardSharpNote[0]
  } else if (adjustedToneStandardFlatNote.length && adjustment === 'b') {
    return adjustedToneStandardFlatNote[0]
  } else {
    return adjustedToneStandardSharpNote[0] || adjustedToneStandardFlatNote[0]
  }
}

function generateNotesByDegree(notes: AnyNote[]): Record<AnyModeDegreeNumber, AnyNote> {
  const notesByDegree: { [key in AnyModeDegreeNumber]?: AnyNote } = {}
  MODE_DEGREE_NUMBERS.forEach((degree, index)=> {
    notesByDegree[degree] = notes[index]
  })

  ALTERED_MODE_DEGREE_NUMBERS.forEach(degree => {
    notesByDegree[degree] = adjustNote(notes[parseInt(degree[1]) - 1], degree[0] as 'b' | '#' | '')
  })

  return notesByDegree as Record<AnyModeDegreeNumber, AnyNote>
}

export abstract class KeyData {
  readonly tonic: AnyNote
  readonly mode: AnyModeName
  readonly notes: AnyNote[]
  readonly signature: ModeKeySignature
  readonly notesByDegree?: Record<AnyModeDegreeNumber, AnyNote>
  readonly degreesByNote?: Record<AnyNote, AnyModeDegreeNumber>
  readonly enharmonicEquivalents: AnyNote[]
  readonly theoreticalKey: boolean
  private readonly _tones?: Tone[]

  constructor(tonic: AnyNote, mode: AnyModeName) {
    // Not every mode has a key with a tonic of every possible theoretical note
    // For example there is no B## Ionian
    // If we're given a mismatch, simplify to the lowest enharmonic equivalent and use that
    if (!isModeAnyKey(tonic, mode)) {
      this.tonic = simplifyNote(tonic, mode)
    } else {
      this.tonic = tonic
    }
    this.mode = mode
    this._tones = getKeyTones(this.tonic, this.mode)
    this.notes = convertKeyTonesToNotes(this.tonic, this._tones)
    this.signature = getKeySignatureFromNotes(this.notes)
    this.enharmonicEquivalents = this._tones[0].notes.filter(note => note !== this.tonic && isModeAnyKey(note, this.mode))
    this.theoreticalKey = parseInt(this.signature[0]) > 7
    this.notesByDegree = generateNotesByDegree(this.notes)
  }
}

export class Key extends KeyData {

}