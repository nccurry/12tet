import {
  wrapValue,
  rotateArray,
  sumTo, isTypeError
} from '../utils'
import {
  AnyNote,
  getNextNaturalNote,
  getTone,
  isNaturalNote,
  isStandardFlatNote,
  isStandardSharpNote, isTheoreticalFlatNote,
  isTheoreticalSharpNote, NATURAL_NOTES,
  simplifyNote, STANDARD_FLAT_NOTES, STANDARD_SHARP_NOTES, THEORETICAL_FLAT_NOTES, THEORETICAL_SHARP_NOTES,
  Tone
} from '../note'
import {
  AnyModeDegreeNumber,
  isModeAnyKey,
  ModeKeySignature,
  AnyModeName, getModeTonePattern,
  ALTERED_MODE_DEGREE_NUMBERS,
  STANDARD_MODE_DEGREE_NUMBERS, isModeKeySignature, StandardModeDegreeNumber, IonianAnyKey, IonianModeName
} from '../mode'

// Given the notes of a key, return the key signature
export function getKeySignatureFromKeyNotes(notes: AnyNote[]): ModeKeySignature | TypeError {
  if (notes.length != 7) {
    return TypeError(`Invalid key. Notes array ${notes} does not have enough notes to make a valid key`)
  }

  // Count the total number of sharps and flats present in the notes array
  let sharps = 0
  let flats = 0
  notes.forEach(note => {
    sharps += (note.match(/#/g) || []).length
    flats += (note.match(/b/g) || []).length
  })

  if (sharps !==0 && flats !==0) {
    return TypeError(`Invalid key. Notes array ${notes} cannot contain both sharps and flats`)
  } else if (sharps > 14 || flats > 14) {
    return TypeError(`Invalid key. Cannot have more than 14 sharps or flats`)
  } else if (sharps === 0 && flats === 0) {
    return ''
  } else {
    const keySignature = flats === 0 ? `${sharps}#` : `${flats}b`
    return isModeKeySignature(keySignature) ? keySignature : TypeError(`Key signature ${keySignature} is not a valid key signature`)
  }
}

// Given a tonic note and a mode, return an array of Tones
export function getKeyTones(tonic: AnyNote, mode: AnyModeName): Tone[] {
  const tone = getTone(tonic)
  let toneIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  toneIndexes = rotateArray(toneIndexes, tone.index)
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

// Given a tonic and an array of Tones, simplify to an array of notes
export function convertKeyTonesToNotes(tonic: AnyNote, keyTones: Tone[]): AnyNote[] | TypeError {
  if (keyTones.length != 7) {
    return TypeError(`The list of key tones does not have 7 tones`)
  }

  if (!keyTones[0].notes.includes(tonic)) {
    return TypeError(`The first key tone ${keyTones[0].notes} does not include the tonic note ${tonic}`)
  }

  const notes: AnyNote[] = []

  // Starting with the supplied tonic, iterate over the list of tones and get the next in the sequence
  // We exploit the fact that every valid mode has only a single instance of each of A, B, C, D, E, F, G
  // and that every tone always contains different 2-3 instances of each of A, B, C, D, E, F, G
  // So if the last note was B# we know the next note has to have a root C
  keyTones.forEach((tone, index) => {
    if (index === 0) {
      notes.push(tonic)
    } else {
      const lastNaturalNote = notes[index - 1][0]
      if (isNaturalNote(lastNaturalNote)) {
        const nextNaturalNote = getNextNaturalNote(lastNaturalNote)
        tone.notes.forEach(note => {
          if (note[0] === nextNaturalNote) {
            notes.push(note)
          }
        })
      } else {
        return TypeError(`Note ${lastNaturalNote} is not a valid natural note`)
      }
    }
  })

  if (notes.length != 7) {
    return TypeError(`The generated list of notes ${notes} does not contain 7 notes`)
  }

  return notes
}

// Get the note a sharp or flat above or below a given note
export function adjustNote(note: AnyNote, adjustment: 'b' | '#' | ''): AnyNote {
  if (adjustment === '') {
    return note
  }

  let tone = getTone(note)
  switch (adjustment) {
    case "b":
      tone = getTone(wrapValue(tone.index - 1, 12))
      break
    case "#":
      tone = getTone(wrapValue(tone.index + 1, 12))
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

// Given a list of notes, return an object with degree keys and note values
// It is assumed that the notes are given in order - i.e. index 0 is the first degree of the key
export function generateNotesByDegree(notes: AnyNote[]): Record<AnyModeDegreeNumber, AnyNote> {
  const notesByDegree: { [key in AnyModeDegreeNumber]?: AnyNote } = {}
  STANDARD_MODE_DEGREE_NUMBERS.forEach((degree, index)=> {
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
  readonly notesByDegree: Record<AnyModeDegreeNumber, AnyNote>
  readonly enharmonicEquivalents: AnyNote[]
  readonly theoreticalKey: boolean
  readonly tones: Tone[]

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
    this.tones = getKeyTones(this.tonic, this.mode)
    const notes = convertKeyTonesToNotes(this.tonic, this.tones)
    if (isTypeError(notes)) {
      throw notes
    } else {
      this.notes = notes
    }
    this.enharmonicEquivalents = this.tones[0].notes.filter(note => note !== this.tonic && isModeAnyKey(note, this.mode))
    this.notesByDegree = generateNotesByDegree(this.notes)
    const signature = getKeySignatureFromKeyNotes(this.notes)
    if (isTypeError(signature)) {
      throw signature
    } else {
      this.signature = signature
    }
    this.theoreticalKey = parseInt(this.signature[0]) > 7
  }
}

export class Key extends KeyData {}

export class IonianKey extends KeyData {
  declare readonly tonic: IonianAnyKey
  declare readonly mode: IonianModeName

  constructor(tonic: AnyNote) {
    super(tonic, 'Ionian')
  }
}