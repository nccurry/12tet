import { chord } from "./chord"
import {key} from "./key";

// console.log(chord('G', {
//   base: 'min',
//   extension: '7',
//   alterations: ['#5'],
//   additions: ['13'],
//   slash: 'D#'
// }))

const test = key('A', 'Ionian')
console.log(test)