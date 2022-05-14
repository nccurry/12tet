import { getInterval, Interval, IntervalIdentifier, isIntervalData } from './index'
import { isTypeError } from "../utils"

describe('Test getInterval function', () => {
  test('Execute getInterval function with shortName', () => {
    const interval = getInterval('P8')
    if (isIntervalData(interval)) {
      expect(interval.name).toStrictEqual('Perfect Octave')
    } else {
      fail('getInterval returned unexpected TypeError')
    }
  })

  test('Execute getInterval function with name', () => {
    const interval = getInterval('Perfect Octave')
    if (isIntervalData(interval)) {
      expect(interval.name).toStrictEqual('Perfect Octave')
    } else {
      fail('getInterval returned unexpected TypeError')
    }
  })

  test('Execute getInterval function with interval distance', () => {
    const interval = getInterval(12)
    if (isIntervalData(interval)) {
      expect(interval.name).toStrictEqual('Perfect Octave')
    } else {
      fail('getInterval returned unexpected TypeError')
    }
  })

  test('Execute getInterval function with complex interval distance', () => {
    const interval = getInterval(24)
    if (isIntervalData(interval)) {
      expect(interval.name).toStrictEqual('Perfect Octave')
    } else {
      fail('getInterval returned unexpected TypeError')
    }
  })

  test('Execute getInterval function with bad interval identifier', () => {
    const interval = getInterval('wrong' as IntervalIdentifier)
    if (isIntervalData(interval)) {
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