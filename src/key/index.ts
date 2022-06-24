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
  Tone,
  TONES_BY_NOTE,
  TONES, NOTES
} from '../note'
import {
  ModeDegree,
  ModeKeySignature,
  ModeName,
  ALTERED_MODE_DEGREE,
  STANDARD_MODE_DEGREE,
  isModeKeySignature,
  IonianTonic,
  DorianTonic,
  PhrygianTonic,
  LydianTonic,
  MixolydianTonic,
  AeolianTonic,
  LocrianTonic,
  isModeTonicByModeName,
  MODE_DATA, Tonic, isModeDegree,
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
export function getKeyTones(tonic: Note, modeName: ModeName): Tone[] {
  const tone = TONES_BY_NOTE[tonic]
  let toneIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  toneIndexes = rotateArray(toneIndexes, tone.index)
  const modeTonePattern = MODE_DATA[modeName].semitoneStructure

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
  for (let i = 0; i < keyTones.length; i++) {
    const tone = keyTones[i]

    if (i === 0) {
      notes.push(tonic)
    } else {
      const lastNaturalNote = notes[i - 1][0]
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
  }

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
export function generateNotesByDegree(notes: Note[]): Record<ModeDegree, Note> {
  const notesByDegree: { [key in ModeDegree]?: Note } = {}
  STANDARD_MODE_DEGREE.forEach((degree, index)=> {
    notesByDegree[degree] = notes[index]
  })

  ALTERED_MODE_DEGREE.forEach(degree => {
    notesByDegree[degree] = adjustNote(notes[parseInt(degree[1]) - 1], degree[0] as 'b' | '#' | '')
  })

  return notesByDegree as Record<ModeDegree, Note>
}

function invertObject (object: Record<ModeDegree, Note>): { [key in Note]?: ModeDegree } {
  const entries = Object.entries(object)
  return Object.entries(object).reduce((acc, [key, value]) => (acc[value] = key, acc), {})
}

function generateDegreesByNote(notesByDegree: Record<ModeDegree, Note>): Record<Note, ModeDegree> {
  const degreesByNote: { [key in Note]?: ModeDegree } = {}
  NOTES.forEach(note => {
    for (const [degree, degreeNote] of Object.entries(notesByDegree)) {
      const tone = TONES_BY_NOTE[note]
      if (degreeNote === note) {
        degreesByNote[note] = degree as ModeDegree
      } else {

      }
    }
  })

  return degreesByNote as Record<Note, ModeDegree>
}

export interface Key {
  readonly tonic: Tonic
  readonly mode: ModeName
  readonly notes: Note[]
  readonly signature: ModeKeySignature
  readonly notesByDegree: Record<ModeDegree, Note>
  readonly enharmonicEquivalents: Note[]
  readonly theoreticalKey: boolean
  readonly tones: Tone[]
  readonly degreesByNote: Record<Note, ModeDegree>
}

export interface IonianKey extends Key {
  readonly tonic: IonianTonic
}

export interface DorianKey extends Key {
  readonly tonic: DorianTonic
}

export interface PhrygianKey extends Key {
  readonly tonic: PhrygianTonic
}

export interface LydianKey extends Key {
  readonly tonic: LydianTonic
}

export interface MixolydianKey extends Key {
  readonly tonic: MixolydianTonic
}

export interface AeolianKey extends Key {
  readonly tonic: AeolianTonic
}

export interface LocrianKey extends Key {
  readonly tonic: LocrianTonic
}

export function key(tonic: IonianTonic, modeName: 'Ionian'): IonianKey
export function key(tonic: DorianTonic, modeName: 'Dorian'): DorianKey
export function key(tonic: PhrygianTonic, modeName: 'Phrygian'): PhrygianKey
export function key(tonic: LydianTonic, modeName: 'Lydian'): LydianKey
export function key(tonic: MixolydianTonic, modeName: 'Mixolydian'): MixolydianKey
export function key(tonic: AeolianTonic, modeName: 'Aeolian'): AeolianKey
export function key(tonic: LocrianTonic, modeName: 'Locrian'): LocrianKey
export function key(tonic: Tonic, modeName: ModeName): Key | TypeError {
  if (!isModeTonicByModeName[modeName](tonic)) {
    return TypeError(`There is no key in mode ${modeName} with tonic ${tonic}`)
  } else {
    const tones = getKeyTones(tonic, modeName)

    const notes = convertKeyTonesToNotes(tonic, tones)
    if (isTypeError(notes)) {
      return notes
    }

    const signature = getKeySignatureFromKeyNotes(notes)
    if (isTypeError(signature)) {
      return signature
    }

    const key: Key = {
      tonic: tonic,
      mode: modeName,
      tones: tones,
      notes: notes,
      enharmonicEquivalents: tones[0].filter(note => note !== tonic && isModeTonicByModeName[modeName](note)),
      notesByDegree: generateNotesByDegree(notes),
      signature: signature,
      theoreticalKey: parseInt(signature[0]) > 7
    }
    return key
  }
}

export function ionianKey(tonic: IonianTonic): IonianKey {
  return key(tonic, 'Ionian')
}

export function dorianKey(tonic: DorianTonic): DorianKey {
  return key(tonic, 'Dorian')
}

export function phrygianKey(tonic: PhrygianTonic): PhrygianKey {
  return key(tonic, 'Phrygian')
}

export function lydianKey(tonic: LydianTonic): LydianKey {
  return key(tonic, 'Lydian')
}

export function mixolydianKey(tonic: MixolydianTonic): MixolydianKey {
  return key(tonic, 'Mixolydian')
}

export function aeolianKey(tonic: AeolianTonic): AeolianKey {
  return key(tonic, 'Aeolian')
}

export function locrianKey(tonic: LocrianTonic): LocrianKey {
  return key(tonic, 'Locrian')
}