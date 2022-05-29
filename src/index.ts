import { IonianMode, MODE_BY_NAME } from "./mode"

const ionian = new IonianMode()
const dorian = MODE_BY_NAME['Dorian']

console.log(ionian.key('C'))