import { ChordDegreeNumber } from "../chord"

export function getEvenArrayElements<A> (array: A[]): A[] {
  const elements: A[] = []
  array.forEach((element, index) => {
    if (index % 2 === 0) {
      elements.push(element)
    }
  })

  return elements
}

export function getWrappedArrayElement<A> (array: A[], index: number): A {
  return array[normalizeValue(index, array.length)]
}

export function getEvenNumbers (max: number): number[] {
  const numbers: number[] = []
  if (max >= 0) {
    for (let i = 0; i <= max; i++) {
      if (i % 2 === 0) {
        numbers.push(i)
      }
    }
  } else {
    for (let i = 0; i >= max; i--) {
      if (i % 2 === 0) {
        numbers.push(i)
      }
    }
  }

  return numbers
}

function indexesOf<A> (array: A[], value: A): number[] {
  const indexes: number[] = []
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      indexes.push(i)
    }
  }
  return indexes
}

export function removeDuplicates<A> (array: A[]): A[] {
  return [...new Set(array)]
}

function removeArrayOfArrayDuplicates<A> (array: A[][]): A[][] {
  const stringArray = array.map(element => JSON.stringify(element))
  const uniqueStringArray = new Set(stringArray)
  return Array.from(uniqueStringArray, element => JSON.parse(element) as A[])
}

function getShallowCopy<A> (array: A[]): A[] {
  return array.slice()
}

function removeArrayElement<A> (array: A[], index: number): A[] {
  const arrayCopy = getShallowCopy(array)

  // If the index is negative, count from the end of the array
  const effectiveIndex = index < 0 ? arrayCopy.length - Math.abs(index) : index

  if (effectiveIndex >= array.length || effectiveIndex < 0) {
    console.error(`There was a problem calling removeArrayElement. Effective index ${effectiveIndex} is out of bounds for array with length ${array.length}. Returning array unchanged.`)
  } else {
    arrayCopy.splice(effectiveIndex, 1)
  }

  return arrayCopy
}

// https://stackoverflow.com/questions/52856496/typescript-object-keys-return-string
export const getTypedObjectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

export function normalizeValue (value: number, max: number): number {
  const multiples = Math.abs(Math.floor(value / max)) * max
  return ((multiples * max) + value) % max
}