import { chord, Chord } from './chord'
import { interval, ShortIntervalName } from './interval'
import { mode } from './mode'
import { voicing } from "./voicing"
import { note, Note } from "./note"

export {
  chord,
  interval,
  mode,
}

const gDim: Chord = {
  root: 'G',
  type: 'maj',
  extension: 5,
  alterations: [],
  additions: [],
  slash: 'F#'
}

console.log(chord.setDefaults(gDim))
console.log(chord.intervals(gDim))
// console.log(interval.distance('P1', 'M2'))

// const myNote = "G####"
// console.log(note.simplify(myNote))
// console.log(note.transpose(myNote, -1))
// console.log(note.distance("C", "G"))