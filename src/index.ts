import {offsetArray, sumTo} from './utils'
import {AnyNote, getNextNaturalNote, getTone, NaturalNote, StandardNote, Tone, ToneNotes, TONES} from './note'
import { AnyModeDegreeNumber, IonianAnyKey, ModeKey, ModeKeySignature, ModeName } from './mode'
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



// class Key {
//   tonic: AnyNote
//   mode: ModeName
//   notes: AnyNote[]
//   signature: ModeKeySignature
//   notesByDegree: Record<AnyModeDegreeNumber, AnyNote>
//   degreesByNote: Record<AnyNote, AnyModeDegreeNumber>
//   enharmonicEquivalents: AnyNote
//   theoreticalKey: boolean
//
//   constructor(tonic: AnyNote, mode: ModeName) {
//     this.tonic = tonic
//     this.mode = mode
//   }
// }

function generateKey(tonic: AnyNote, mode: ModeName): AnyNote[] {
  const tone = getTone(tonic)
  let toneIndexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  toneIndexes = offsetArray(toneIndexes, tone.index)
  const modeTonePattern = modeTonePatterns[mode]

  // Generate tones
  const keyTones: ToneNotes[] = []
  let index = -1
  while (keyTones.length < 7) {
    // If we're still at the tonic, just use the first toneIndex
    if (index === -1) {
      keyTones.push(TONES[toneIndexes[0]].notes)
    // If not, count up the appropriate number of semitones for the mode
    } else {
      keyTones.push(TONES[toneIndexes[sumTo(modeTonePattern, index)]].notes)
    }
    index++
  }

  // Convert tones to notes
  const notes: AnyNote[] = []
  keyTones.forEach((tone, index) => {
    if (index === 0) {
      notes.push(tonic)
    } else {
      const nextNote = getNextNaturalNote(notes[index - 1][0] as NaturalNote)
      tone.forEach(note => {
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
    console.log(flatScalesTones)
}

console.log(generateKey('F##', 'Ionian'))




