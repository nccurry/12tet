import { chord, Chord } from './chord'
import { interval } from './interval'
import { mode } from './mode'
import { voicing } from "./voicing"

export {
  chord,
  interval,
  mode,
}

const gDim: Chord = {
  root: 'G',
  type: 'min',
  extension: 9,
  alterations: ['#9']
}

console.log(chord.setDefaults(gDim))
console.log(chord.intervals(gDim))