import {offsetArray} from './utils'
import {Tone, ToneNotes, TONES} from './note'

const ionianPattern = [2, 2, 1, 2, 2, 2, 1]

function sumTo (array: number[], index: number): number {
  let sum = 0
  for (let i = 0; i <= index; i++) {
    sum += array[i % array.length]
  }
  return sum
}

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

generate()




