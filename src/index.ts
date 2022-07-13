import { chord } from "./chord"
import {key, keyTonesByDegree} from "./key";

console.log(keyTonesByDegree('Cbb', 'Aeolian'))

// console.log(chord('C', {
//   base: 'maj'
// }))
//
// console.log(chord('C', {
//   base: 'maj',
//   extension: '9'
// }))
//
// console.log(chord('G', {
//   base: 'min',
//   extension: '7',
//   alterations: [],
//   additions: []
// }))

// console.log(chord('G', {
//   base: 'min',
//   extension: '7',
//   alterations: ['#5'],
//   additions: ['13'],
//   slash: '3'
// }))
//
// console.log(chord('G', {
//   base: 'min',
//   extension: '7',
//   alterations: ['#5'],
//   additions: ['13']
// }))
