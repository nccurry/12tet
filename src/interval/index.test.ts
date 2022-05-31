import { interval, Interval, IntervalIdentifier, isInterval } from './index'
import { isTypeError } from "../utils"

describe('Test getInterval function', () => {
  test('Execute getInterval function with shortName', () => {
    const interval = interval('P8')
    if (isInterval(interval)) {
      expect(interval.name).toStrictEqual('Perfect Octave')
    } else {
      fail('getInterval returned unexpected TypeError')
    }
  })

  test('Execute getInterval function with name', () => {
    const interval = interval('Perfect Octave')
    if (isInterval(interval)) {
      expect(interval.name).toStrictEqual('Perfect Octave')
    } else {
      fail('getInterval returned unexpected TypeError')
    }
  })

  test('Execute getInterval function with interval distance', () => {
    const interval = interval(12)
    if (isInterval(interval)) {
      expect(interval.name).toStrictEqual('Perfect Octave')
    } else {
      fail('getInterval returned unexpected TypeError')
    }
  })

  test('Execute getInterval function with complex interval distance', () => {
    const interval = interval(24)
    if (isInterval(interval)) {
      expect(interval.name).toStrictEqual('Perfect Octave')
    } else {
      fail('getInterval returned unexpected TypeError')
    }
  })

  test('Execute getInterval function with bad interval identifier', () => {
    const interval = interval('wrong' as IntervalIdentifier)
    if (isInterval(interval)) {
      fail('getInterval should return a TypeError with a bad interval identifier')
    } else {
      expect(isTypeError(interval)).toStrictEqual(true)
    }
  })
})

describe('Test Interval class', () => {
  test('Create Interval class with interval distance', () => {
    const interval = new Interval(12)
    expect(interval.name).toStrictEqual('Perfect Octave')
  })

  test('Create Interval class with bad interval identifier', () => {
    expect(() => new Interval('wrong' as IntervalIdentifier)).toThrow(`wrong is not of type IntervalIdentifier`)
  })
})