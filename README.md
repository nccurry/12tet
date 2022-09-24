# 12tet Music Theory Library

A Typescript library for working with Modes, Chords, Keys, and other abstractions from the twelve-tone equal temperament music system. 

## Mode

Constants and functions to interact with musical [modes](https://en.wikipedia.org/wiki/Mode_(music)).

```typescript
// List all mode names
console.log(modeNames) // ['Ionian', 'Dorian', 'Phrygian', ..., Locrian]

// List all mode key signatures
console.log(modeKeySignatures) // ['', '1#', ..., '2b', '1b']

// List all mode degrees
console.log(modeDegrees) // ['1', '2', ..., 'b7', '#7']

// List all mode degree names
console.log(modeDegreeNames) // ['Tonic', 'Supertonic', ..., 'Subtonic', 'Leading Tone']

// List all tonic notes in the Ionian mode, including theoretical tonic notes
console.log(ionianTonics) // ['C', 'G', 'D', 'A', 'E', ..., 'Bbb', 'Fb']

// List all standard tonic notes in the Aeolian mode, ignoring theoretical tonic notes
console.log(aeolianStandardTonics) // ['A',  'E',  'B',  'F#', 'C#', ..., 'Bb', 'F']

// List all tonics across every mode
console.log(tonics) // ['C', 'G', ..., 'F']

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
// List all interval names
console.log(intervalNames) // ['Perfect Unison', 'Minor Second', 'Major Second', ..., 'Major Seventh', 'Perfect Octave']

// List all alternate interval names
console.log(alternateIntervalNames) // ['Semitone', 'Tone', 'Trisemitone', 'Tritone', ..., 'Half Step', 'Whole Step']

// List all interval short names
console.log(shortIntervalNames) // ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', ..., M7, P8]

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

// Get the interval distance between two notes
console.log(getIntervalBetweenNotes('C', 'D')) // { length: 2, name: 'Major Second', ..., tension: 3 }
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