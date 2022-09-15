# 12tet Music Theory Library

A Typescript library for working with Modes, Chords, Keys, and other abstractions from the twelve-tone equal temperament music system. 

## Mode

Constants and functions to interact with musical [modes](https://en.wikipedia.org/wiki/Mode_(music)).

```typescript
import {
    MODE_NAMES,
    IONIAN_TONICS,
    AEOLIAN_STANDARD_TONICS,
    mode,
    ionianMode,
    aeolianMode
} from '12tet'

// List all mode names
console.log(MODE_NAMES) // ['Ionian', 'Dorian', 'Phrygian', ..., Locrian]

// List all tonic notes in the Ionian mode, including theoretical tonic notes
console.log(IONIAN_TONICS) // ['C', 'G', 'D', 'A', 'E', ..., 'Bbb', 'Fb']

// List all standard tonic notes in the Aeolian mode, ignoring theoretical tonic notes
console.log(AEOLIAN_STANDARD_TONICS) // ['A',  'E',  'B',  'F#', 'C#', ..., 'Bb', 'F']

// Get the Ionian mode
const ionianMode = mode('Ionian')

// Interact with the Ionian mode
console.log(ionianMode.tonics) // [ 'C',   'G',   'D',   'A',   'E', ..., 'Abb', 'Ebb', 'Bbb', 'Fb' ]
console.log(ionianMode.chordBases) // [ 'maj', 'min', 'min', 'maj', 'maj', 'min', 'dim' ]

// Get the Aeolian mode
const aeolianMode = mode('Aeolian')

// Interact with a specific Aeolian key
console.log(aeolianMode.key('C').signature) // 3b
console.log(aeolianMode.key('A').notes) // [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ]
console.log(aeolianMode.key('D').enharmonicEquivalents) // [ 'C##', 'Ebb' ]
console.log(aeolianMode.key('F').notesByDegree['b4']) // A
```

## Interval

Constants and functions to interact with musical [intervals](https://en.wikipedia.org/wiki/Interval_(music)).

```typescript
import {
    INTERVAL_NAMES,
    ALTERNATE_INTERVAL_NAMES,
    INTERVAL_SHORT_NAMES,
    interval
} from '12tet'

// List all interval names
console.log(INTERVAL_NAMES) // ['Perfect Unison', 'Minor Second', 'Major Second', ..., 'Major Seventh', 'Perfect Octave']

// List all alternate interval names
console.log(ALTERNATE_INTERVAL_NAMES) // ['Semitone', 'Tone', 'Trisemitone', 'Tritone', ..., 'Half Step', 'Whole Step']

// List all interval short names
console.log(SHORT_INTERVAL_NAMES) // ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', ..., M7, P8]

// Create new Interval instance with semitone distance
const p8_1 = interval(12)

// Create new Interval instance with short name
const p8_2 = interval('P8')

// Create new Interval instance with long name
const p8_3 = interval('Perfect Octave')

// Interact with the Interval instance
console.log(p8_1.name) // Perfect Octave
console.log(p8_2.tension) // 0
console.log(p8_3.alternateNames) // ['Augmented Seventh']
```

## Note

Constants and functions to interact with musical notes.

```typescript
// List all Natural Notes
console.log(NATURAL_NOTES) // ['C', 'D', 'E', 'F', 'G', 'A', 'B']
```

## Key

Constants and functions to interact with musical [keys](https://en.wikipedia.org/wiki/Key_(music)).

```typescript
import {
    key
} from '12tet'

// Create a new key
const gIonian = key('G', 'Ionian')

// Interact with the key
console.log(gIonian.signature) // 1#
console.log(gIonian.tonic) // G
console.log(gIonian.enharmonicEquivalents) // ['F##', 'Abb']
```

## Voicing

Generate chord voicings

```typescript
import {
    chord,
    chordVoicings,
} from '12tet'

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