import { mode, ModeName } from "./mode"

const modeName: ModeName = 'Ionian'
const ionian = mode(modeName)

console.log(ionian.keyByTonic('A'))
