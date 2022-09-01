import {interval, isInterval} from "../../src";

describe('Test insertDegree function', () => {
    test('Execute insertDegree function with shortName', () => {
        const p8 = interval('P8')
        if (isInterval(p8)) {
            expect(p8.name).toStrictEqual('Perfect Octave')
        } else {
            fail('getInterval returned unexpected TypeError')
        }
    })

    test('Execute getInterval function with name', () => {
        const p8 = interval('Perfect Octave')
        if (isInterval(p8)) {
            expect(p8.name).toStrictEqual('Perfect Octave')
        } else {
            fail('getInterval returned unexpected TypeError')
        }
    })

    test('Execute getInterval function with interval distance', () => {
        const p8 = interval(12)
        if (isInterval(p8)) {
            expect(p8.name).toStrictEqual('Perfect Octave')
        } else {
            fail('getInterval returned unexpected TypeError')
        }
    })

    test('Execute getInterval function with complex interval distance', () => {
        const p8 = interval(24)
        if (isInterval(p8)) {
            expect(p8.name).toStrictEqual('Perfect Octave')
        } else {
            fail('getInterval returned unexpected TypeError')
        }
    })

    // test('Execute getInterval function with bad interval identifier', () => {
    //   expect(interval('wrong' as IntervalIdentifier)).toThrow(TypeError(`Could not find interval with distance wrong`))
    // })
})