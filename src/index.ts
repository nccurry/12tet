import { Key } from "./key"
import { AeolianMode, IonianMode, Mode } from "./mode"

const ionian = new Mode('Ionian')

console.log(ionian.chordBases)

const aeolian = new AeolianMode()

console.log(aeolian.key('F').notesByDegree['b4'])

const cIonian = new Key('C', 'Phrygian')
console.log(cIonian)
