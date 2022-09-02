import {
  interval,
  intervalDistance,
  isInterval,
  ShortIntervalName,
} from "../interval"
import {
  rotateArray,
  removeArrayElement,
  getShallowCopy
} from '../utils'
import {
  isNote,
  Note,
} from '../note'
import {
  ALTERED_MODE_DEGREES,
  IonianTonic, isModeDegree,
  MODE_DEGREES,
  ModeDegree,
} from '../mode'
import { ionianKey, key } from "../key"

export const DIATONIC_CHORD_BASES = ['maj', 'min', 'dim'] as const
export type DiatonicChordBase = typeof DIATONIC_CHORD_BASES[number]
export function isDiatonicChordBase (chordType: any): chordType is DiatonicChordBase {
  return DIATONIC_CHORD_BASES.includes(chordType)
}

export const CHORD_BASES = [...DIATONIC_CHORD_BASES, 'dom', 'sus2', 'sus4', 'aug'] as const
export type ChordBase = typeof CHORD_BASES[number]
export function isChordBase (chordType: any): chordType is ChordBase {
  return CHORD_BASES.includes(chordType)
}

export const CHORD_ADDITIONS = ['2', '4', '6', '9', '11', '13'] as const
export type ChordAddition = typeof CHORD_ADDITIONS[number]
export function isChordAddition (chordAddition: any): chordAddition is ChordAddition {
  return CHORD_ADDITIONS.includes(chordAddition)
}

export const CHORD_EXTENSIONS = ['7', '9', '11', '13'] as const
export type ChordExtension = typeof CHORD_EXTENSIONS[number]
export function isChordExtension (chordExtension: any): chordExtension is ChordExtension {
  return CHORD_EXTENSIONS.includes(chordExtension)
}

export const STANDARD_CHORD_DEGREES = [...MODE_DEGREES, '9', '11', '13'] as const
export type StandardChordDegree = typeof STANDARD_CHORD_DEGREES[number]
export function isStandardChordDegree (degreeNumber: any): degreeNumber is StandardChordDegree {
  return STANDARD_CHORD_DEGREES.includes(degreeNumber)
}

export const ALTERED_CHORD_DEGREES = [...ALTERED_MODE_DEGREES, 'b9', '#9', 'b11', '#11', 'b13', '#13'] as const
export type AlteredChordDegree = typeof ALTERED_CHORD_DEGREES[number]
export function isAlteredChordDegree (degreeNumber: any): degreeNumber is AlteredChordDegree {
  return ALTERED_CHORD_DEGREES.includes(degreeNumber)
}

export const CHORD_DEGREES = [...STANDARD_CHORD_DEGREES, ...ALTERED_CHORD_DEGREES]
export type ChordDegree = typeof CHORD_DEGREES[number]
export function isChordDegree (degreeNumber: any): degreeNumber is ChordDegree {
  return CHORD_DEGREES.includes(degreeNumber)
}

export function chordDegreeToModeDegree(chordDegree: ChordDegree): ModeDegree {
  switch (chordDegree) {
    case 'b9':
      return 'b2'
    case '#9':
      return '#2'
    case '9':
      return '2'
    case 'b11':
      return 'b4'
    case '#11':
      return '#4'
    case '11':
      return '4'
    case 'b13':
      return 'b6'
    case '#13':
      return '#6'
    case '13':
      return '6'
    default:
      return chordDegree
  }
}

export function chordDegreesToModeDegrees(chordDegrees: ChordDegree[]): ModeDegree[] {
  const modeDegrees = chordDegrees.map(chordDegree => chordDegreeToModeDegree(chordDegree))

  return modeDegrees.filter(isModeDegree)
}

// https://en.wikipedia.org/wiki/Roman_numeral_analysis#Modes
// \u1d47 -> superscript b
// \u2070 -> superscript 0
// \u2075 -> superscript 5
export const CHORD_NUMERALS = [
  'I', 'i', 'i\u2070',
  'II', '\u1d47II', 'ii', 'ii\u2070',
  '\u1d47III', 'iii', '\u1d47iii', 'iii\u2070',
  'IV', 'iv', '#iv\u2070',
  'V', '\u1d47V', 'v', 'v\u2070',
  '\u1d47VI', 'vi', 'vi\u2070',
  '\u1d47VII', 'vii', '\u1d47vii', 'vii\u2070'
] as const
export type ChordNumeral = typeof CHORD_NUMERALS[number]

const CHORD_DEGREES_BY_BASE: Record<ChordBase, ChordDegree[]> = {
  maj: ['1', '3', '5', '7', '9', '11', '13'],
  // b3, b7
  min: ['1', 'b3', '5', 'b7', '9', '11', '13'],
  // b3, b5
  dim: ['1', 'b3', 'b5', '7', '9', '11', '13'],
  // b7
  dom: ['1', '3', '5', 'b7', '9', '11', '13'],
  // #5
  aug: ['1', '3', '#5', '7', '9', '11', '13'],
  // 3 -> 2
  sus2: ['1', '2', '5', '7', '9', '11', '13'],
  // 3 -> 4
  sus4: ['1', '4', '5', '7', '9', '11', '13']
}

export interface ChordType {
  base: ChordBase,
  extension?: ChordExtension,
  additions?: ChordAddition[],
  alterations?: AlteredChordDegree[],
  slash?: ChordDegree
}

export interface Chord {
  root: Note
  base: ChordBase
  extension?: ChordExtension
  additions?: ChordAddition[]
  alterations?: AlteredChordDegree[]
  slash?: ChordDegree
  slashNote?: Note
  intervals: ShortIntervalName[]
  degrees: ChordDegree[]
  notes: Note[]
  name: string
}

export function isChord(chord: any): chord is Chord {
  if (!chord.root || !isNote(chord.root)) {
    return false
  }
  if (!chord.base || !isChordBase(chord.base)) {
    return false
  }
  if (chord.extension && !isChordExtension(chord.extension)) {
    return false
  }
  for (let i=0; i < chord.additions.length; i++) {
    if (!isChordAddition(chord.additions[i])) {
      return false
    }
  }
  for (let i=0; i < chord.alterations.length; i++) {
    if (!isAlteredChordDegree(chord.alterations[i])) {
      return false
    }
  }
  if (chord.slash && !isChordDegree(chord.slash)){
    return false
  }
  if (chord.slashNote && !isNote(chord.slashNote)) {
    return false
  }
  for (let i=0; i < chord.intervals.length; i++) {
    if (!isInterval(chord.intervals[i])) {
      return false
    }
  }
  for (let i=0; i < chord.degrees.length; i++) {
    if (!isChordDegree(chord.degrees[i])) {
      return false
    }
  }
  for (let i=0; i < chord.notes.length; i++) {
    if (!isNote(chord.notes[i])) {
      return false
    }
  }
  if (!chord.name || typeof chord.name !== "string") {
    return false
  }
  return true
}

// Strip b or #
function degreeNumber(degree: ChordDegree | ModeDegree): number {
  if (degree[0] !== '#' && degree[0] !== 'b') {
    return parseInt(degree)
  } else {
    return parseInt(degree.slice(1, degree.length))
  }
}

function generateChordName(tonic: IonianTonic, type: ChordType): string {
  let name = `${tonic}${type.base}${type.extension || ''}`
  if (type.alterations) {
    type.alterations.forEach(alteration => { name = name.concat(alteration)})
  }

  if (type.additions) {
    type.additions.forEach(addition => {name = name.concat(`add${addition}`)})
  }

  if (type.slash) {
    const slashNote = key(tonic, 'Ionian').noteByDegree[chordDegreeToModeDegree(type.slash)]
    name = name.concat(`/${slashNote}`)
  }

  return name
}

function insertDegree(degrees: ChordDegree[], degree: ChordDegree): ChordDegree[]
function insertDegree(degrees: ModeDegree[], degree: ModeDegree): ModeDegree[]
function insertDegree(degrees: ModeDegree[] | ChordDegree[], degree: ModeDegree | ChordDegree): ModeDegree[] | ChordDegree[] {
  const degreesCopy = getShallowCopy(degrees)

  for (let i = degreesCopy.length - 1; i >= 0; i--) {
    const chordDegree = degreesCopy[i]
    if (degreeNumber(chordDegree) < degreeNumber(degree)) {
      degreesCopy.splice(i + 1, 0, degree)
      break
    }
  }

  return degreesCopy
}

export function chord(tonic: IonianTonic, type: ChordType): Chord {
  const chordKey = key(tonic, 'Ionian')
  const extensionIndex = type.extension ? Math.ceil(parseInt(type.extension) / 2) : 3
  let chordDegrees: ChordDegree[] = CHORD_DEGREES_BY_BASE[type.base].slice(0, extensionIndex)

  if (type.additions) {
    type.additions.forEach(addition => {
      chordDegrees = insertDegree(chordDegrees, addition)
    })
  }

  if (type.alterations) {
    type.alterations.forEach(alteration => {
      const unalteredIndex = chordDegrees.findIndex(degree => degree === alteration[1])
      if (unalteredIndex) {
        chordDegrees = removeArrayElement(chordDegrees, unalteredIndex)
      }

      chordDegrees = insertDegree(chordDegrees, alteration)
    })
  }

  if (type.slash) {
    chordDegrees = insertDegree(chordDegrees, type.slash)

    const slashDegreeIndex = chordDegrees.findIndex(degree => degree === type.slash)
    if (slashDegreeIndex) {
      chordDegrees = rotateArray(chordDegrees, slashDegreeIndex)
    } else {
      console.error('There was a problem finding the slash degree index.')
    }
  }

  const modeDegrees = chordDegreesToModeDegrees(chordDegrees)

  const notes = modeDegrees.map(degree => chordKey.noteByDegree[degree])

  const intervals: ShortIntervalName[] = []
  for (let i = 0; i < notes.length; i++) {
    // The first note is always a perfect unison
    if (i === 0) {
      intervals.push(interval(0).shortName)
    } else {
      intervals.push(interval(intervalDistance(tonic, notes[i])).shortName)
    }
  }

  return {
    ...type,
    root: tonic,
    notes: notes,
    name: generateChordName(tonic, type),
    intervals: intervals,
    degrees: chordDegrees,
    slash: type.slash,
    slashNote: type.slash ? chordKey.noteByDegree[chordDegreeToModeDegree(type.slash)] : undefined
  }
}