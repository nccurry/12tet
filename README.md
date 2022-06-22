# Musicomatic Music Theory Library

## Mode

Functions and classes to interact with musical [modes](https://en.wikipedia.org/wiki/Mode_(music)).

```typescript
// List all mode names
console.log(MODE_NAMES)

// List all tonic notes in the Ionian mode, including theoretical tonic notes
console.log(IONIAN_TONICS)

// List all standard tonic notes in the Aeolian mode, ignoring theoretical tonic notes
console.log(AEOLIAN_STANDARD_TONICS)

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

Functions and classes to interact with musical [intervals](https://en.wikipedia.org/wiki/Interval_(music)).

```typescript
// List all interval names
console.log(INTERVAL_NAMES)

// List all alternate interval names
console.log(ALTERNATE_INTERVAL_NAMES)

// List all interval short names
console.log(INTERVAL_SHORT_NAMES)

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

## Key

Functions and classes to interact with musical [keys](https://en.wikipedia.org/wiki/Key_(music)).

```typescript
// Create a new key
const cIonian = key('C', 'Ionian')

// Interact with the key
console.log(cIonian.signature) // ''
```

## Development

### Running tests

You can execute the test suite using jest
```shell
jest
```