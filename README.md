# Musicomatic Music Theory Library

## Mode
https://en.wikipedia.org/wiki/Mode_(music)

```typescript
// List all mode names
console.log(MODE_NAMES)

// List all tonic notes in the Ionian mode
console.log(IONIAN_TONICS)

// List all standard tonic notes in the Aeolian mode
console.log(AEOLIAN_STANDARD_TONICS)

// Create a new Ionian Mode instance
const ionian = new Mode('Ionian')

// Interact with the Ionian mode
console.log(ionian.tonics) // [ 'C',   'G',   'D',   'A',   'E', ..., 'Abb', 'Ebb', 'Bbb', 'Fb' ]
console.log(ionian.chordBases) // [ 'maj', 'min', 'min', 'maj', 'maj', 'min', 'dim' ]

// Create a new Aeolian Mode instance
// Using the more specific Mode class provides better type checking
const aeolian = new AeolianMode()

// Interact with a specific Aeolian key
console.log(aeolian.key('C').signature) // 3b
console.log(aeolian.key('A').notes) // [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ]
console.log(aeolian.key('D').enharmonicEquivalents) // [ 'C##', 'Ebb' ]
console.log(aeolian.key('F').notesByDegree['b4']) // A
```

## Interval
https://en.wikipedia.org/wiki/Interval_(music)

```typescript
// List all interval names
console.log(INTERVAL_NAMES)

// List all alternate interval names
console.log(ALTERNATE_INTERVAL_NAMES)

// List all interval short names
console.log(INTERVAL_SHORT_NAMES)

// Create new Interval instance with semitone distance
const p8_1 = new Interval(12)

// Create new Interval instance with short name
const p8_2 = new Interval('P8')

// Create new Interval instance with long name
const p8_3 = new Interval('Perfect Octave')

// Interact with the Interval instance
console.log(p8_1.name) // Perfect Octave
console.log(p8_2.tension) // 0
console.log(p8_3.alternateNames) // ['Augmented Seventh']
```

## Development

### Running tests

You can execute the test suite using jest
```shell
jest
```