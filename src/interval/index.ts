// Types

// https://en.wikipedia.org/wiki/Interval_(music)
import { ModeKeyNote } from "../mode"
import { normalizeValue } from "../utils"
import { ChordType } from "../chord"

const intervalNames = [
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
export type IntervalName = typeof intervalNames[number]

const alternateIntervalNames = [
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
export type AlternateIntervalName = typeof alternateIntervalNames[number]

const intervalShortNames = [
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
export type ShortIntervalName = typeof intervalShortNames[number]

export function isIntervalName (interval: any): interval is IntervalName {
  return intervalNames.includes(interval)
}

export function isShortIntervalName (interval: any): interval is ShortIntervalName {
  return intervalShortNames.includes(interval)
}

export type IntervalDistance = number

export type IntervalIdentifier = IntervalName | ShortIntervalName | IntervalDistance

export interface Interval {
  length: number,
  name: IntervalName,
  shortName: ShortIntervalName,
  alternateNames: AlternateIntervalName[],
  tension: number
}

// Data

const intervalData2: Record<ShortIntervalName, Interval> = {
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

const intervalData: Interval[] = [
  {
    length: 0,
    name: 'Perfect Unison',
    shortName: 'P1',
    alternateNames: ['Diminished Second'],
    tension: 0
  },
  {
    length: 1,
    name: 'Minor Second',
    shortName: 'm2',
    alternateNames: ['Augmented Unison', 'Semitone', 'Half Tone', 'Half Step'],
    tension: 4
  },
  {
    length: 2,
    name: 'Major Second',
    shortName: 'M2',
    alternateNames: ['Diminished Third', 'Tone', 'Whole Step'],
    tension: 3
  },
  {
    length: 3,
    name: 'Minor Third',
    shortName: 'm3',
    alternateNames: ['Augmented Second'],
    tension: 2
  },
  {
    length: 4,
    name: 'Major Third',
    shortName: 'M3',
    alternateNames: ['Diminished Fourth'],
    tension: 1
  },
  {
    length: 5,
    name: 'Perfect Fourth',
    shortName: 'P4',
    alternateNames: ['Augmented Third'],
    tension: 1
  },
  {
    length: 6,
    name: 'Tritone',
    shortName: 'TT',
    alternateNames: ['Augmented Fourth', 'Diminished Fifth'],
    tension: 5
  },
  {
    length: 7,
    name: 'Perfect Fifth',
    shortName: 'P5',
    alternateNames: ['Diminished Sixth'],
    tension: 0
  },
  {
    length: 8,
    name: 'Minor Sixth',
    shortName: 'm6',
    alternateNames: ['Augmented Fifth'],
    tension: 2
  },
  {
    length: 9,
    name: 'Major Sixth',
    shortName: 'M6',
    alternateNames: ['Diminished Seventh'],
    tension: 1
  },
  {
    length: 10,
    name: 'Minor Seventh',
    shortName: 'm7',
    alternateNames: ['Augmented Sixth'],
    tension: 3
  },
  {
    length: 11,
    name: 'Major Seventh',
    shortName: 'M7',
    alternateNames: ['Diminished Octave'],
    tension: 4
  },
  {
    length: 12,
    name: 'Perfect Octave',
    shortName: 'P8',
    alternateNames: ['Augmented Seventh'],
    tension: 0
  }
]

// Functions

function getIntervalData(nameShortNameOrLength: IntervalIdentifier): Interval {
  let filteredData: Interval
  if (isIntervalName(nameShortNameOrLength)) {
    filteredData = intervalData.find(element => element.name === nameShortNameOrLength)!
  } else if (isShortIntervalName(nameShortNameOrLength)) {
    filteredData = intervalData.find(element => element.shortName === nameShortNameOrLength)!
  } else {
    filteredData = intervalData.find(element => element.length === normalizeValue(nameShortNameOrLength, 12))!
  }

  return filteredData
}

function getKeyNoteFromChordInterval(chord: ChordType, root: ModeKeyNote, interval: IntervalIdentifier) {
  const intervalData = getIntervalData(interval)

}

export const interval = {
  toName: function(shortNameOrLength: ShortIntervalName | number): IntervalName {
    const intervalData = getIntervalData(shortNameOrLength)
    return intervalData.name
  },
  toShortName: function(nameOrLength: IntervalName | number): ShortIntervalName {
    const intervalData = getIntervalData(nameOrLength)
    return intervalData.shortName
  },
  toLength: function(nameOrShortName: IntervalName | ShortIntervalName): number {
    const intervalData = getIntervalData(nameOrShortName)
    return intervalData.length
  },
  alternateNames: function(nameShortNameOrLength: IntervalIdentifier): AlternateIntervalName[] {
    const intervalData = getIntervalData(nameShortNameOrLength)
    return intervalData.alternateNames
  },
  tension: function(nameShortNameOrLength: IntervalIdentifier): number {
    const intervalData = getIntervalData(nameShortNameOrLength)
    return intervalData.tension
  },
  getIntervalData: getIntervalData,
  distance: function(first: IntervalIdentifier, second: IntervalIdentifier): IntervalDistance {
    const firstData = getIntervalData(first)
    const secondData = getIntervalData(second)
    return normalizeValue(secondData.length - firstData.length, 12)
  }
}
