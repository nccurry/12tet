# 12tet Music Theory Library

A Typescript library for working with Modes, Chords, Keys, and other abstractions from the twelve-tone equal temperament music system. 

## Mode

Constants and functions to interact with musical [modes](https://en.wikipedia.org/wiki/Mode_(music)).

```typescript
// List all mode names
import { ModeName, modeNames } from '12tet'

const names: ModeName[] = modeNames
console.log(names) // ['Ionian', 'Dorian', 'Phrygian', ..., Locrian]

// List all mode key signatures
import { ModeKeySignature, modeKeySignatures } from '12tet'

const signatures: ModeKeySignature[] = modeKeySignatures
console.log(signatures) // ['', '1#', ..., '2b', '1b']

// List all mode degrees
import { ModeDegree, modeDegrees } from '12tet'

const degrees: ModeDegree[] = modeDegrees
console.log(degrees) // ['1', '2', ..., 'b7', '#7']

// List all mode degree names
import { ModeDegreeName, modeDegreeNames } from '12tet'

const degreeNames: ModeDegreeName[] = modeDegreeNames
console.log(degreeNames) // ['Tonic', 'Supertonic', ..., 'Subtonic', 'Leading Tone']

// List all tonic notes in the Ionian mode, including theoretical tonic notes
import { IonianTonic, ionianTonics } from '12tet'

const majorTonics: IonianTonic[] = ionianTonics
console.log(majorTonics) // ['C', 'G', 'D', 'A', 'E', ..., 'Bbb', 'Fb']

// List all standard tonic notes in the Aeolian mode, ignoring theoretical tonic notes
import { AeolianStandardTonic, aeolianStandardTonics } from '12tet'

const minorStandardTonics: AeolianStandardTonic[] = aeolianStandardTonics
console.log(minorStandardTonics) // ['A',  'E',  'B',  'F#', 'C#', ..., 'Bb', 'F']

// List all tonics across every mode
import { Tonic, tonics } from '12tet'

const allTonics: Tonic[] = tonics
console.log(allTonics) // ['C', 'G', ..., 'F']

// Get the Ionian mode and interact with it
import { IonianMode, mode, IonianTonic, ChordBase } from '12tet'

const ionianMode: IonianMode = mode('Ionian')

const majorKeys: IonianTonic[] = ionianMode.tonics
console.log(majorKeys) // [ 'C',   'G',   'D',   'A',   'E', ..., 'Abb', 'Ebb', 'Bbb', 'Fb' ]

const minorChords: ChordBase[] = ionianMode.chordBases
console.log(minorChords) // [ 'maj', 'min', 'min', 'maj', 'maj', 'min', 'dim' ]

// Get the Aeolian mode and interact with it
import { AeolianMode, mode, ModeKeySignature, Note } from '12tet'

const aeolianMode: AeolianMode = mode('Aeolian')

const cMinSignature: ModeKeySignature = aeolianMode.key('C').signature
console.log(cMinSignature) // 3b

const aMinNotes: Note[] = aeolianMode.key('A').notes
console.log(aMinNotes) // [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ]

const dMinEquivalents: Note[] = aeolianMode.key('D').enharmonicEquivalents
console.log(dMinEquivalents) // [ 'C##', 'Ebb' ]

const fMinb4: Note = aeolianMode.key('F').notesByDegree['b4']
console.log(fMinb4) // A
```

## Interval

Constants and functions to interact with musical [intervals](https://en.wikipedia.org/wiki/Interval_(music)).

```typescript
// List all interval names
import { IntervalName, intervalNames } from '12tet'

const intervals: IntervalName[] = intervalNames
console.log(intervals) // ['Perfect Unison', 'Minor Second', 'Major Second', ..., 'Major Seventh', 'Perfect Octave']

// List all alternate interval names
import { AlternateIntervalName, alternateIntervalNames } from '12tet'

const alternateNames: AlternateIntervalName[] = alternateIntervalNames
console.log(alternateNames) // ['Semitone', 'Tone', 'Trisemitone', 'Tritone', ..., 'Half Step', 'Whole Step']

// List all interval short names
import { ShortIntervalName, shortIntervalNames } from '12tet'

const shortNames: ShortIntervalName[] = shortIntervalNames
console.log(shortNames) // ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', ..., M7, P8]

// Create intervals and interact with them
import { Interval, interval, IntervalName, AlternateIntervalName } from '12tet'
const p8_1: Interval = interval(12)
const name: IntervalName = p8_1.name
console.log(name) // Perfect Octave

const p8_2: Interval = interval('P8')
const tension: number = p8_2.tension
console.log(tension) // 0

const p8_3: Interval = interval('Perfect Octave')
const intervalAlternateNames: AlternateIntervalName = p8_3.alternateNames
console.log(intervalAlternateNames) // ['Augmented Seventh']

// Get the interval distance between two notes
import { Interval, getIntervalBetweenNotes } from '12tet'

const intervalBetween: Interval = getIntervalBetweenNotes('C', 'D')
console.log(intervalBetween) // { length: 2, name: 'Major Second', ..., tension: 3 }
```

## Note

Constants and functions to interact with musical notes.

```typescript
// List all Natural Notes
console.log(naturalNotes) // ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// List all Standard Notes
console.log(standardNotes) // ['C', 'D', ..., 'Cb', 'Fb']

// List all Theoretical Notes
console.log(theoreticalNotes) // ['C##', 'D##', 'E##', ..., 'Abb', 'Bbb']

// List all note Registers
console.log(noteRegisters) // [1, 2, 3, ..., 7, 8]

// List enharmonic equivalents
console.log(enharmonicEquivalents('C')) // ['B#', 'Dbb']
```

## Key

Constants and functions to interact with musical [keys](https://en.wikipedia.org/wiki/Key_(music)).

```typescript
// Create a new key
const gIonian = key('G', 'Ionian')

// Interact with the key
console.log(gIonian.signature) // 1#
console.log(gIonian.tonic) // G
console.log(gIonian.notes) // ['G', 'A', ..., 'F#']
console.log(gIonian.accidentals) // ['F#']
console.log(gIonian.toneByDegree['1']) // ['F##', 'G', 'Abb']
console.log(gIonian.noteByDegree['5']) // 'D'
console.log(gIonian.degreeByNote['G']) // '1'
console.log(gIonian.enharmonicEquivalents) // ['F##', 'Abb']
```

## Voicing

Generate chord voicings

```typescript
const cMaj7SlashE = chord('C', {
    base: 'maj',
    extension: '7',
    slash: '3'
})

const voicings = chordVoicings(cMaj7SlashE, {
    startingPitch: 3,
    minSpread: 5,
    maxSpread: 20,
    minSize: 3,
    maxSize: 6,
    enforceSlash: true
})
```

## Development

### Running tests

You can execute the test suite using jest
```shell
jest
```