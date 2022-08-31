import { wrapValue } from "../utils"

// Standard inter-octave interval names
export const INTERVAL_NAMES = [
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

// Alternate and extra-octave interval names
export const ALTERNATE_INTERVAL_NAMES = [
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
export function isAlternateIntervalName (interval: any): interval is AlternateIntervalName {
  return ALTERNATE_INTERVAL_NAMES.includes(interval)
}

// Abbreviated inter-octave interval names
export const SHORT_INTERVAL_NAMES = ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'TT', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'] as const
export type ShortIntervalName = typeof SHORT_INTERVAL_NAMES[number]
export function isShortIntervalName (interval: any): interval is ShortIntervalName {
  return SHORT_INTERVAL_NAMES.includes(interval)
}

// A number representing the semitone distance between two intervals inside an octaves length
export const STANDARD_INTERVAL_DISTANCES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export type StandardIntervalDistance = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export function isStandardIntervalDistance (intervalDistance: any): intervalDistance is StandardIntervalDistance {
  return intervalDistance <= 12
}

// A number representative the semitone distance between two intervals outside an octaves length
export type ComplexIntervalDistance = number
export function isComplexIntervalDistance (intervalDistance: any): intervalDistance is ComplexIntervalDistance {
  return intervalDistance > 12
}

export type IntervalDistance = StandardIntervalDistance | ComplexIntervalDistance
export function isIntervalDistance (intervalDistance: any): intervalDistance is IntervalDistance {
  return Number.isInteger(intervalDistance)
}

export interface Interval {
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
}
export function isInterval (interval: any): interval is Interval {
  return (interval as Interval).name !== undefined &&
      (interval as Interval).shortName !== undefined
}

// An identifier that uniquely identifies a given interval
export type IntervalIdentifier =
    IntervalName |
    ShortIntervalName |
    IntervalDistance |
    ComplexIntervalDistance |
    Interval

export function isIntervalIdentifier (intervalIdentifier: any): intervalIdentifier is IntervalIdentifier {
  if (isIntervalName(intervalIdentifier) ||
      isShortIntervalName(intervalIdentifier) ||
      isIntervalDistance(intervalIdentifier) ||
      isComplexIntervalDistance(intervalIdentifier) ||
      isInterval(intervalIdentifier)
  ) {
    return true
  } else {
    return false
  }
}

// Metadata of the inter-octave intervals
export const INTERVAL_DATA: Record<ShortIntervalName, Interval> = {
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

export function interval(intervalIdentifier: IntervalIdentifier): Interval {
  if (isInterval(intervalIdentifier)) {
    return intervalIdentifier

  } else if (isIntervalName(intervalIdentifier)) {
    const intervalData = Object.values(INTERVAL_DATA).find(element => element.name === intervalIdentifier)
    if (!intervalData) {
      throw TypeError(`Could not find interval with name ${intervalIdentifier}`)
    } else {
      return intervalData
    }

  } else if (isShortIntervalName(intervalIdentifier)) {
    return INTERVAL_DATA[intervalIdentifier]

  } else if (isStandardIntervalDistance(intervalIdentifier)) {
    const intervalData = Object.values(INTERVAL_DATA).find(element => element.length === intervalIdentifier)
    if (!intervalData) {
      throw TypeError(`Could find find interval with distance ${intervalIdentifier}`)
    } else {
      return intervalData
    }

  } else {
    // With complex intervals, we want to normalize to Perfect Octaves, not Perfect Unisons
    let normalizedValue = wrapValue(intervalIdentifier, 12)
    if (normalizedValue === 0) {
      normalizedValue = 12
    }

    const intervalData = Object.values(INTERVAL_DATA).find(element => element.length === normalizedValue)
    if (!intervalData) {
      throw TypeError(`Could not find interval with distance ${intervalIdentifier}`)
    } else {
      return intervalData
    }
  }
}