import { normalizeValue } from "../utils"

// Data / Types

// https://en.wikipedia.org/wiki/Interval_(music)
const INTERVAL_NAMES = [
  'Perfect Unison',
  'Minor Second',
  'Major Second',
  'Minor Third',
  'Major Third',
  'Perfect Fourth',
  'Tritone',
  'Perfect Fifth',
  'Minor Sixth',
  'Major Sixth',
  'Minor Seventh',
  'Major Seventh',
  'Perfect Octave',
] as const
export type IntervalName = typeof INTERVAL_NAMES[number]
export function isIntervalName (interval: any): interval is IntervalName {
  return INTERVAL_NAMES.includes(interval)
}

const ALTERNATE_INTERVAL_NAMES = [
  'Semitone',
  'Tone',
  'Trisemitone',
  'Tritone',
  'Tritave',
  'Double Octave',
  'Diminished Second',
  'Augmented Unison',
  'Diminished Third',
  'Augmented Second',
  'Diminished Fourth',
  'Augmented Third',
  'Diminished Fifth',
  'Augmented Fourth',
  'Diminished Sixth',
  'Augmented Fifth',
  'Diminished Seventh',
  'Augmented Sixth',
  'Diminished Octave',
  'Augmented Seventh',
  'Minor Ninth',
  'Major Ninth',
  'Minor Tenth',
  'Major Tenth',
  'Perfect Eleventh',
  'Perfect Twelfth',
  'Minor Thirteenth',
  'Major Thirteenth',
  'Minor Fourteenth',
  'Major Fourteenth',
  'Perfect Fifteenth',
  'Diminished Ninth',
  'Augmented Octave',
  'Diminished Tenth',
  'Augmented Ninth',
  'Diminished Eleventh',
  'Augmented Tenth',
  'Diminished Twelfth',
  'Augmented Eleventh',
  'Diminished Thirteenth',
  'Augmented Twelfth',
  'Diminished Fourteenth',
  'Augmented Thirteenth',
  'Diminished Fifteenth',
  'Augmented Fourteenth',
  'Augmented Fifteenth',
  'Half Tone',
  'Half Step',
  'Whole Step'
] as const
export type AlternateIntervalName = typeof ALTERNATE_INTERVAL_NAMES[number]

const INTERVAL_SHORT_NAMES = [
  'P1',
  'm2',
  'M2',
  'm3',
  'M3',
  'P4',
  'TT',
  'P5',
  'm6',
  'M6',
  'm7',
  'M7',
  'P8'
] as const
export type ShortIntervalName = typeof INTERVAL_SHORT_NAMES[number]
export function isShortIntervalName (interval: any): interval is ShortIntervalName {
  return INTERVAL_SHORT_NAMES.includes(interval)
}

export type IntervalDistance = number

export type IntervalIdentifier = IntervalName | ShortIntervalName | IntervalDistance | IntervalData

export function isIntervalData (interval: any): interval is IntervalData {
  return (interval as IntervalData).name !== undefined && (interval as IntervalData).shortName !== undefined
}

const INTERVAL_DATA: Record<ShortIntervalName, IntervalData> = {
  P1: {
    length: 0,
    name: 'Perfect Unison',
    shortName: 'P1',
    alternateNames: ['Diminished Second'],
    tension: 0
  },
  m2: {
    length: 1,
    name: 'Minor Second',
    shortName: 'm2',
    alternateNames: ['Augmented Unison', 'Semitone', 'Half Tone', 'Half Step'],
    tension: 4
  },
  M2: {
    length: 2,
    name: 'Major Second',
    shortName: 'M2',
    alternateNames: ['Diminished Third', 'Tone', 'Whole Step'],
    tension: 3
  },
  m3: {
    length: 3,
    name: 'Minor Third',
    shortName: 'm3',
    alternateNames: ['Augmented Second'],
    tension: 2
  },
  M3: {
    length: 4,
    name: 'Major Third',
    shortName: 'M3',
    alternateNames: ['Diminished Fourth'],
    tension: 1
  },
  P4:   {
    length: 5,
    name: 'Perfect Fourth',
    shortName: 'P4',
    alternateNames: ['Augmented Third'],
    tension: 1
  },
  TT:   {
    length: 6,
    name: 'Tritone',
    shortName: 'TT',
    alternateNames: ['Augmented Fourth', 'Diminished Fifth'],
    tension: 5
  },
  P5: {
    length: 7,
    name: 'Perfect Fifth',
    shortName: 'P5',
    alternateNames: ['Diminished Sixth'],
    tension: 0
  },
  m6: {
    length: 8,
    name: 'Minor Sixth',
    shortName: 'm6',
    alternateNames: ['Augmented Fifth'],
    tension: 2
  },
  M6: {
    length: 9,
    name: 'Major Sixth',
    shortName: 'M6',
    alternateNames: ['Diminished Seventh'],
    tension: 1
  },
  m7: {
    length: 10,
    name: 'Minor Seventh',
    shortName: 'm7',
    alternateNames: ['Augmented Sixth'],
    tension: 3
  },
  M7: {
    length: 11,
    name: 'Major Seventh',
    shortName: 'M7',
    alternateNames: ['Diminished Octave'],
    tension: 4
  },
  P8: {
    length: 12,
    name: 'Perfect Octave',
    shortName: 'P8',
    alternateNames: ['Augmented Seventh'],
    tension: 0
  }
}

// Functions / Classes

function getInterval(interval: IntervalIdentifier): IntervalData {
  if (isIntervalData(interval)) {
    return interval
  } else if (isIntervalName(interval)) {
    return Object.values(INTERVAL_DATA).find(element => element.name === interval)!
  } else if (isShortIntervalName(interval)) {
    return INTERVAL_DATA[interval]
  } else {
    return Object.values(INTERVAL_DATA).find(element => element.length === normalizeValue(interval, 12))!
  }
}

abstract class IntervalData {
  // The length of the interval in semitones
  readonly length: IntervalDistance
  // The long name of the interval
  readonly name: IntervalName
  // The short name of the interval
  readonly shortName: ShortIntervalName
  // Alternate long names of the interval
  readonly alternateNames: AlternateIntervalName[]
  // The intervals tension rating
  readonly tension: number

  constructor(interval: IntervalIdentifier) {
    const i = getInterval(interval)
    this.length = i.length
    this.name = i.name
    this.shortName = i.shortName
    this.alternateNames = i.alternateNames
    this.tension = i.tension
  }
}

export class Interval extends IntervalData {
  distance (interval: Interval) {
    return normalizeValue(interval.length - this.length, 12)
  }
}