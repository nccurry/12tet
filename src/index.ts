import { chord } from "./chord"
import {key} from "./key";

console.log(chord('C', {
  base: 'maj'
}))

console.log(chord('C', {
  base: 'maj',
  extension: '9'
}))

console.log(chord('G', {
  base: 'min',
  extension: '7',
  alterations: ['#5'],
  additions: ['13'],
  slash: 'Bb'
}))

console.log(chord('G', {
  base: 'min',
  extension: '7',
  alterations: ['#5'],
  additions: ['13']
}))
