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

const gMaj: Chord = {
  root: 'G',
  type: 'maj',
  extension: 7,
  alterations: [],
  additions: [],
  slash: 'D'
}

// console.log(chord.setDefaults(gMaj))
console.log(chord.intervals(gMaj))
// console.log(interval.distance('P1', 'M2'))

// const myNote = "G####"
// console.log(note.simplify(myNote))
// console.log(note.transpose(myNote, -1))
// console.log(note.distance("C", "G"))