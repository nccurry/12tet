import { getShallowCopy, isTypeError, removeDuplicates, rotateArray, sumTo, wrapValue } from '../../src/utils'

describe('Test offsetArray function', () => {
  test('Execute offsetArray with positive integer', () => {
    const array = rotateArray([0, 1, 2, 3], 1)
    expect(array).toStrictEqual([1, 2, 3, 0])
  })

  test('Execute offsetArray with positive integer greater than array length', () => {
    const array = rotateArray([0, 1, 2, 3], 5)
    expect(array).toStrictEqual([1, 2, 3, 0])
  })

  test('Execute offsetArray with negative integer', () => {
    const array = rotateArray([0, 1, 2, 3], -1)
    expect(array).toStrictEqual([3, 0, 1, 2])
  })

  test('Execute offsetArray with negative integer greater than array length', () => {
    const array = rotateArray([0, 1, 2, 3], -5)
    expect(array).toStrictEqual([3, 0, 1, 2])
  })
})

describe('Test removeDuplicates function', () => {
  test('Execute removeDuplicates with integers and no duplicates', () => {
    const array = removeDuplicates([0, 1, 2, 3])
    expect(array).toStrictEqual([0, 1, 2, 3])
  })

  test('Execute removeDuplicates with strings', () => {
    const array = removeDuplicates(['a', 'b', 'c', 'c', 'd', 'a'])
    expect(array).toStrictEqual(['a', 'b', 'c', 'd'])
  })

  test('Execute removeDuplicates with multidimensional array of integers', () => {
    const array = removeDuplicates([[1], [2, 3], [3, 2], [2], [1], [2, 3], [5, 6]])
    expect(array).toStrictEqual([[1], [2, 3], [3, 2], [2], [5, 6]])
  })

  test('Execute removeDuplicates with multidimensional array of objects', () => {
    const array = removeDuplicates([[{ one: 'one' }], [{ one: 'two' }], [{ one: 'one' }, { two: 'two' }], [{ one: 'one' }]])
    expect(array).toStrictEqual([[ { one: 'one' } ], [ { one: 'two' } ], [ { one: 'one' }, { two: 'two' } ]])
  })
})

describe('Test getShallowCopy function', () => {
  test('Execute getShallowCopy', () => {
    const array = getShallowCopy([0, 1, 2, 3])
    expect(array).toStrictEqual([0, 1, 2, 3])
  })
})

describe('Test sumTo function', () => {
  test('Execute sumTo', () => {
    const array = sumTo([0, 1, 2, 3], 2)
    expect(array).toStrictEqual(3)
  })
})

describe('Test wrapValue function', () => {
  test('Execute wrapValue with positive integer inside max', () => {
    const array = wrapValue(5, 12)
    expect(array).toStrictEqual(5)
  })

  test('Execute wrapValue with positive integer outside max', () => {
    const array = wrapValue(17, 12)
    expect(array).toStrictEqual(5)
  })

  test('Execute wrapValue with negative integer inside max', () => {
    const array = wrapValue(-2, 12)
    expect(array).toStrictEqual(10)
  })

  test('Execute wrapValue with negative integer outside max', () => {
    const array = wrapValue(-14, 12)
    expect(array).toStrictEqual(10)
  })
})

describe('Test isTypeError function', () => {
  test('Execute isTypeError with a TypeError', () => {
    const array = isTypeError(new TypeError('test'))
    expect(array).toStrictEqual(true)
  })

  test('Execute isTypeError with a non-TypeError', () => {
    const array = isTypeError('test')
    expect(array).toStrictEqual(false)
  })
})