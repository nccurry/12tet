// rotateArray moves array elements forward or backward by the offset amount
export function rotateArray<T> (array: T[], offset: number): T[] {
  const arrayCopy = getShallowCopy(array)

  // Wrap around the array if the offset is larger or negative
  // This will prevent shift from ever causing an error
  if (offset > arrayCopy.length) {
    offset = offset % arrayCopy.length
  } else if (offset < 0 ) {
    offset = arrayCopy.length - (Math.abs(offset) % arrayCopy.length)
  }

  for (let i = 0; i < offset; i++) {
    const shift = arrayCopy.shift()
    if (shift !== undefined) {
      arrayCopy.push(shift)
    }
  }

  return arrayCopy
}

// Filter out duplicate values from an array
// Accepts multi-dimensional arrays
export function removeDuplicates<A> (array: A[]): A[] {
  if (array.length === 0) {
    return array
  } else if (Array.isArray(array[0])) {
    const stringArray = array.map(element => JSON.stringify(element))
    const uniqueStringArray = new Set(stringArray)
    return Array.from(uniqueStringArray, element => JSON.parse(element))
  } else {
    return [...new Set(array)]
  }
}

// Shallow copy an array
export function getShallowCopy<A> (array: A[]): A[] {
  return array.slice()
}

// Sum array elements up to a given index
export function sumTo (array: number[], index: number): number {
  let sum = 0
  for (let i = 0; i <= index; i++) {
    sum += array[i % array.length]
  }
  return sum
}

// Wrap number inside 0 and a max number
// i.e. wrapValue(5, 12) === 5
//      wrapValue(17, 12) === 5
//      wrapValue(-2, 12) === 10
//      wrapValue(-14, 12) === 10
export function wrapValue (value: number, max: number): number {
  const multiples = Math.abs(Math.floor(value / max)) * max
  return ((multiples * max) + value) % max
}

// Type guard for TypeError
export function isTypeError(error: unknown): error is Error {
  return error instanceof TypeError
}

// Get array element at index. Wraps around array if index is greater than the array size or negative
export function getWrappedArrayElement<A> (array: A[], index: number): A {
  return array[wrapValue(index, array.length)]
}

export function removeArrayElement<A> (array: A[], index: number): A[] {
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
export const getTypedObjectKeys = Object.keys as <T extends object>(obj: T) => T[]

export function arrayDifference <T>(array1: readonly T[], array2: readonly T[]) {
  return array1.filter((v) => !array2.includes(v))
}

export function getEvenArrayElements<A> (array: A[]): A[] {
  const elements: A[] = []
  array.forEach((element, index) => {
    if (index % 2 === 0) {
      elements.push(element)
    }
  })

  return elements
}

export function getEvenNumbers (max: number | string): number[] {
  if (typeof max === 'string') {
    max = parseInt(max)
  }

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

export function generateOrderedCombinations<A> (array: A[], result: A[][], combinationSize = array.length - 1): void {
  // Protect you from yourself
  if (Math.abs(array.length - combinationSize) > 9) {
    console.error(`You are attempting to generate too many ordered combinations of size ${combinationSize} from an array of length ${array.length}. Try reducing the array length or pickSize`)
    return
  }

  if (array.length === combinationSize) {
    result.push(array)
  } else if (array.length > combinationSize) {
    for (let i = 0; i < array.length; i++) {
      generateOrderedCombinations(removeArrayElement(array, i), result, combinationSize)
    }
  }
}



