import { Chord, ChordData } from './chord'
import { Interval } from './interval'
import { arrayDifference } from "./utils"
import {IonianMode, Mode} from "./mode";

const gMaj7SlashD = new Chord('G', { extension: 7, slash: 'D' })
const P0 = new Interval(0)
const bSharpMajor = new Mode('Ionian').key('B#')
const ionianMode = new IonianMode().key('2b').notes
// const cMajor2 = new Key('B#', 'Ionian')



const gMaj = new Chord('G')
// gMaj.notes()
// gMaj.generateVoicings()
const gMinAdd9Sharp5 = new Chord('G', {
  type: 'min',
  extension: 9,
  additions: ['add9'],
  alterations: ['#5']
})









