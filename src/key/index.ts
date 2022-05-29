import {
  wrapValue,
  rotateArray,
  sumTo, isTypeError
} from '../utils'
import {
  Note,
  getNextNaturalNote,
  isNaturalNote,
  isStandardFlatNote,
  isStandardSharpNote,
  isTheoreticalFlatNote,
  isTheoreticalSharpNote,
  Tone, TONES_BY_NOTE, TONES
} from '../note'
import {
  ModeDegreeNumber,
  isModeTonic,
  ModeKeySignature,
  ModeName,
  ALTERED_MODE_DEGREE_NUMBERS,
  STANDARD_MODE_DEGREE_NUMBERS,
  isModeKeySignature,
  IonianTonic,
  DorianTonic,
  PhrygianTonic,
  LydianTonic,
  MixolydianTonic,
  AeolianTonic,
  LocrianTonic,
  ISMODETONIC_BY_MODE_NAME,
  MODE_BY_NAME
} from '../mode'

// Given the notes of a key, return the key signature
export function getKeySignatureFromKeyNotes(notes: Note[]): ModeKeySignature | TypeError {
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
export function getKeyTones(tonic: Note, mode: ModeName): Tone[] {
  const tone = TONES_BY_NOTE[tonic]
  let toneIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  toneIndexes = rotateArray(toneIndexes, tone.index)
  const modeTonePattern = MODE_BY_NAME[mode].semitoneStructure

  // Generate tones
  const keyTones: Tone[] = []
  let index = -1
  while (keyTones.length < 7) {
    // If we're still at the tonic, just use the first toneIndex
    if (index === -1) {
      keyTones.push(TONES[toneIndexes[0]])
      // If not, count up the appropriate number of semitones for the mode
    } else {
      keyTones.push(TONES[toneIndexes[sumTo([...modeTonePattern], index)]])
    }
    index++
  }

  return keyTones
}

// Given a tonic and an array of Tones, simplify to an array of notes
export function convertKeyTonesToNotes(tonic: Note, keyTones: Tone[]): Note[] | TypeError {
  if (keyTones.length != 7) {
    return TypeError(`The list of key tones does not have 7 tones`)
  }

  if (!keyTones[0].includes(tonic)) {
    return TypeError(`The first key tone ${keyTones[0]} does not include the tonic note ${tonic}`)
  }

  const notes: Note[] = []

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

        if (isTypeError(nextNaturalNote)) {
          return nextNaturalNote
        }

        tone.forEach(note => {
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
export function adjustNote(note: Note, adjustment: 'b' | '#' | ''): Note {
  if (adjustment === '') {
    return note
  }

  const toneAdjustment = adjustment === 'b' ? -1 : 1
  const tone = TONES[wrapValue(TONES_BY_NOTE[note].index + toneAdjustment, 12)]

  const adjustedToneNaturalNote = tone.filter(isNaturalNote)
  const adjustedToneStandardSharpNote = tone.filter(isStandardSharpNote)
  const adjustedToneStandardFlatNote = tone.filter(isStandardFlatNote)

  // Prefer natural notes over all others
  if (adjustedToneNaturalNote.length) {
    return adjustedToneNaturalNote[0]
  // Prefer standard sharps, if given a theoretical sharp
  } else if (isTheoreticalSharpNote(note) && adjustedToneStandardSharpNote.length) {
    return adjustedToneStandardSharpNote[0]
  // Prefer standard flats, if given a theoretical flat
  } else if (isTheoreticalFlatNote(note) && adjustedToneStandardFlatNote.length) {
    return adjustedToneStandardFlatNote[0]
  // If adding a sharp, use a standard sharp if possible
  } else if (adjustedToneStandardSharpNote.length && adjustment === '#') {
    return adjustedToneStandardSharpNote[0]
  // If adding a flat, use a standard flat if possible
  } else if (adjustedToneStandardFlatNote.length && adjustment === 'b') {
    return adjustedToneStandardFlatNote[0]
  // If we can't do any of the above, return whatever standard note we have
  } else {
    return adjustedToneStandardSharpNote[0] || adjustedToneStandardFlatNote[0]
  }
}

// Given a list of notes, return an object with degree keys and note values
// It is assumed that the notes are given in order - i.e. index 0 is the first degree of the key
export function generateNotesByDegree(notes: Note[]): Record<ModeDegreeNumber, Note> {
  const notesByDegree: { [key in ModeDegreeNumber]?: Note } = {}
  STANDARD_MODE_DEGREE_NUMBERS.forEach((degree, index)=> {
    notesByDegree[degree] = notes[index]
  })

  ALTERED_MODE_DEGREE_NUMBERS.forEach(degree => {
    notesByDegree[degree] = adjustNote(notes[parseInt(degree[1]) - 1], degree[0] as 'b' | '#' | '')
  })

  return notesByDegree as Record<ModeDegreeNumber, Note>
}

export interface KeyData {
  readonly tonic: Note
  readonly mode: ModeName
  readonly notes: Note[]
  readonly signature: ModeKeySignature
  readonly notesByDegree: Record<ModeDegreeNumber, Note>
  readonly enharmonicEquivalents: Note[]
  readonly theoreticalKey: boolean
  readonly tones: Tone[]
}

export class Key implements KeyData {
  readonly tonic: Note
  readonly mode: ModeName
  readonly notes: Note[]
  readonly signature: ModeKeySignature
  readonly notesByDegree: Record<ModeDegreeNumber, Note>
  readonly enharmonicEquivalents: Note[]
  readonly theoreticalKey: boolean
  readonly tones: Tone[]

  constructor(tonic: Note, mode: ModeName) {
    // Not every mode has a key with a tonic of every possible theoretical note
    // For example there is no B## Ionian
    // If we're given a mismatch, simplify to the lowest enharmonic equivalent and use that
    if (!isModeTonic(tonic, mode)) {
      throw TypeError(`There is no key in mode ${mode} with tonic ${tonic}`)
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
    this.enharmonicEquivalents = this.tones[0].filter(note => note !== this.tonic && ISMODETONIC_BY_MODE_NAME[this.mode](note))
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

export class IonianKey extends Key {
  readonly tonic: IonianTonic

  constructor(tonic: IonianTonic) {
    super(tonic, 'Ionian')
    this.tonic = tonic
  }
}

export class DorianKey extends Key {
  readonly tonic: DorianTonic

  constructor(tonic: DorianTonic) {
    super(tonic, 'Dorian')
    this.tonic = tonic
  }
}

export class PhrygianKey extends Key {
  readonly tonic: PhrygianTonic

  constructor(tonic: PhrygianTonic) {
    super(tonic, 'Phrygian')
    this.tonic = tonic
  }
}

export class LydianKey extends Key {
  readonly tonic: LydianTonic

  constructor(tonic: LydianTonic) {
    super(tonic, 'Lydian')
    this.tonic = tonic
  }
}

export class MixolydianKey extends Key {
  readonly tonic: MixolydianTonic

  constructor(tonic: MixolydianTonic) {
    super(tonic, 'Mixolydian')
    this.tonic = tonic
  }
}

export class AeolianKey extends Key {
  readonly tonic: AeolianTonic

  constructor(tonic: AeolianTonic) {
    super(tonic, 'Aeolian')
    this.tonic = tonic
  }
}

export class LocrianKey extends Key {
  readonly tonic: LocrianTonic

  constructor(tonic: LocrianTonic) {
    super(tonic, 'Locrian')
    this.tonic = tonic
  }
}