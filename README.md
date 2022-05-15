# Musicomatic Music Theory Library

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