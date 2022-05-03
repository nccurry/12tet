import {offsetArray, sumTo} from './utils'
import {AnyNote, getNextNaturalNote, getTone, NaturalNote, StandardNote, Tone, ToneNotes, TONES} from './note'
import {AnyModeDegreeNumber, IonianAnyKey, isModeKey, ModeKey, ModeKeySignature, ModeName} from './mode'
import { ChordAlteration } from "./chord"

const modeTonePatterns: Record<ModeName, number[]> = {
  Ionian: [2, 2, 1, 2, 2, 2, 1],
  Dorian: [2, 1, 2, 2, 2, 1, 2],
  Phrygian: [1, 2, 2, 2, 1, 2, 2],
  Lydian: [2, 2, 2, 1, 2, 2, 1],
  Mixolydian: [2, 2, 1, 2, 2, 1, 2],
  Aeolian: [2, 1, 2, 2, 1, 2, 2],
  Locrian: [1, 2, 2, 1, 2, 2, 2],
}
const ionianPattern = [2, 2, 1, 2, 2, 2, 1]



class Key {
  tonic: AnyNote
  mode: ModeName
  notes?: AnyNote[]
  signature?: ModeKeySignature
  notesByDegree?: Record<AnyModeDegreeNumber, AnyNote>
  degreesByNote?: Record<AnyNote, AnyModeDegreeNumber>
  enharmonicEquivalents?: AnyNote[]
  theoreticalKey?: boolean
  private _tones?: Tone[]

  constructor(tonic: AnyNote, mode: ModeName) {
    this.tonic = tonic
    this.mode = mode

    this._tones = getKeyTones(tonic, mode)
    this.notes = convertKeyTonesToNotes(tonic, this._tones)
    this.signature = getKeySignatureFromNotes(this.notes)
    this.enharmonicEquivalents = this._tones[0].notes.filter(note => note !== this.tonic && isModeKey(note, mode))
  }
}

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

function getKeyTones(tonic: AnyNote, mode: ModeName): Tone[] {
  const tone = getTone(tonic)
  let toneIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  toneIndexes = offsetArray(toneIndexes, tone.index)
  const modeTonePattern = modeTonePatterns[mode]

  // Generate tones
  const keyTones: Tone[] = []
  let index = -1
  while (keyTones.length < 7) {
    // If we're still at the tonic, just use the first toneIndex
    if (index === -1) {
      keyTones.push(TONES[toneIndexes[0]])
      // If not, count up the appropriate number of semitones for the mode
    } else {
      keyTones.push(TONES[toneIndexes[sumTo(modeTonePattern, index)]])
    }
    index++
  }
  console.log('?', keyTones)
  return keyTones
}

function convertKeyTonesToNotes(tonic: AnyNote, keyTones: Tone[]): AnyNote[] {
  // Convert tones to notes
  const notes: AnyNote[] = []
  keyTones.forEach((tone, index) => {
    if (index === 0) {
      notes.push(tonic)
    } else {
      console.log('???', tone, index, notes) // TODO: ??
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

// function generateSharpScales(): { [key in IonianAnyKey]?: { signature: ModeKeySignature, notes: AnyNote[], tones: number[] } } {
//   const sharpScales: { [key in IonianAnyKey]?: ModeKey } = {}
//
//   let tones: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
//
//   for (let i = 0; i <= 14; i++) {
//     const scale: number[] = []
//     const scaleTones: ToneNotes[] = []
//     let index = -1
//     while (scale.length < 7) {
//       if (index === -1) {
//         scale.push(tones[0])
//         scaleTones.push(TONES[tones[0]].notes)
//       } else {
//         scale.push(tones[sumTo(ionianPattern, index)])
//         scaleTones.push(TONES[tones[sumTo(ionianPattern, index)]].notes)
//       }
//       index++
//     }
//     sharpScales.push(scale)
//     sharpScalesTones.push(scaleTones)
//     tones = offsetArray(tones, 7)
//   }
//   return sharpScales
// }

function generate() {
  // const result: Record<number, number[]> = {}
  const sharpScales: number[][] = []
  const sharpScalesTones: ToneNotes[][] = []
  let tones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  for (let i = 0; i <= 14; i++) {
    const scale: number[] = []
    const scaleTones: ToneNotes[] = []
    let index = -1
    while (scale.length < 7) {
      if (index === -1) {
        scale.push(tones[0])
        scaleTones.push(TONES[tones[0]].notes)
      } else {
        scale.push(tones[sumTo(ionianPattern, index)])
        scaleTones.push(TONES[tones[sumTo(ionianPattern, index)]].notes)
      }
      index++
    }
    sharpScales.push(scale)
    sharpScalesTones.push(scaleTones)
    tones = offsetArray(tones, 7)
  }
  const flatScales: number[][] = []
  const flatScalesTones: ToneNotes[][] = []
  tones = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  for (let i = 0; i <= 14; i++) {
    const scale: number[] = []
    const scaleTones: ToneNotes[] = []
    let index = -1
    while (scale.length < 7) {
      if (index === -1) {
        scale.push(tones[0])
        scaleTones.push(TONES[tones[0]].notes)
      } else {
        scale.push(tones[sumTo(ionianPattern, index)])
        scaleTones.push(TONES[tones[sumTo(ionianPattern, index)]].notes)
      }
      index++
    }
    flatScales.push(scale)
    flatScalesTones.push(scaleTones)
    tones = offsetArray(tones, 5)
  }
}

const test = new Key('B##', 'Ionian')
console.log(test)



