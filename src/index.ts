import { chord } from "./chord"

console.log(chord('G', {
  base: 'min',
  extension: '7',
  alterations: ['#5'],
  additions: ['13'],
  slash: 'D#'
}))