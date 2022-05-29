import { adjustNote, convertKeyTonesToNotes, getKeySignatureFromKeyNotes, getKeyTones } from './index'
import { Note, Tone } from '../note'

describe('Test getKeySignatureFromKeyNotes', () => {
  test('Execute getKeySignatureFromKeyNotes with no sharps or flats', () => {
    expect(getKeySignatureFromKeyNotes(['C', 'D', 'E', 'F', 'G', 'A', 'B'])).toStrictEqual('')
  })

  test('Execute getKeySignatureFromKeyNotes with 2 sharps', () => {
    expect(getKeySignatureFromKeyNotes(['D', 'E', 'F#', 'G', 'A', 'B', 'C#'])).toStrictEqual('2#')
  })

  test('Execute getKeySignatureFromKeyNotes with 2 flats', () => {
    expect(getKeySignatureFromKeyNotes(['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'])).toStrictEqual('2b')
  })

  test('Execute getKeySignatureFromKeyNotes with 9 sharps', () => {
    expect(getKeySignatureFromKeyNotes(['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C##'])).toStrictEqual('9#')
  })

  test('Execute getKeySignatureFromKeyNotes with 9 flats', () => {
    expect(getKeySignatureFromKeyNotes(['Bbb', 'Cb', 'Db', 'Ebb', 'Fb', 'Gb', 'Ab'])).toStrictEqual('9b')
  })

  test('Execute getKeySignatureFromKeyNotes with too few notes', () => {
    expect(getKeySignatureFromKeyNotes(['B'])).toStrictEqual(TypeError(`Invalid key. Notes array ${['B']} does not have enough notes to make a valid key`))
  })

  test('Execute getKeySignatureFromKeyNotes with sharps and flats', () => {
    expect(getKeySignatureFromKeyNotes(['C', 'D', 'E', 'F', 'G', 'A#', 'Bb'])).toStrictEqual(TypeError(`Invalid key. Notes array ${['C', 'D', 'E', 'F', 'G', 'A#', 'Bb']} cannot contain both sharps and flats`))
  })

  test('Execute getKeySignatureFromKeyNotes with 15 sharps', () => {
    expect(getKeySignatureFromKeyNotes(['C###', 'D##', 'E##', 'F##', 'G##', 'A##', 'B##'] as Note[])).toStrictEqual(TypeError(`Invalid key. Cannot have more than 14 sharps or flats`))
  })
})

describe('Test getKeyTones', () => {
  test('Execute getKeyTones with C Ionian', () => {
    expect(getKeyTones('C', 'Ionian')).toStrictEqual([{ "index": 0, "notes": ["B#", "C", "Dbb"] }, { "index": 2, "notes": ["C##", "D", "Ebb"] }, { "index": 4, "notes": ["D##", "E", "Fb"] }, { "index": 5, "notes": ["E#", "F", "Gbb"] }, { "index": 7, "notes": ["F##", "G", "Abb"] }, { "index": 9, "notes": ["G##", "A", "Bbb"] }, { "index": 11, "notes": ["A##", "B", "Cb"] }])
  })
})

describe('Test convertKeyTonesToNotes', () => {
  test('Execute convertKeyTonesToNotes', () => {
    const keyTones: Tone[] = [{ "index": 0, "notes": ["B#", "C", "Dbb"] }, { "index": 2, "notes": ["C##", "D", "Ebb"] }, { "index": 4, "notes": ["D##", "E", "Fb"] }, { "index": 5, "notes": ["E#", "F", "Gbb"] }, { "index": 7, "notes": ["F##", "G", "Abb"] }, { "index": 9, "notes": ["G##", "A", "Bbb"] }, { "index": 11, "notes": ["A##", "B", "Cb"] }]
    expect(convertKeyTonesToNotes('C', keyTones)).toStrictEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
  })

  test('Execute convertKeyTonesToNotes with less than 7 tones', () => {
    const keyTones: Tone[] = [{ "index": 0, "notes": ["B#", "C", "Dbb"] }]
    expect(convertKeyTonesToNotes('C', keyTones)).toStrictEqual(TypeError(`The list of key tones does not have 7 tones`))
  })

  test('Execute convertKeyTonesToNotes with wrong tonic', () => {
    const keyTones: Tone[] = [{ "index": 0, "notes": ["B#", "C", "Dbb"] }, { "index": 2, "notes": ["C##", "D", "Ebb"] }, { "index": 4, "notes": ["D##", "E", "Fb"] }, { "index": 5, "notes": ["E#", "F", "Gbb"] }, { "index": 7, "notes": ["F##", "G", "Abb"] }, { "index": 9, "notes": ["G##", "A", "Bbb"] }, { "index": 11, "notes": ["A##", "B", "Cb"] }]
    expect(convertKeyTonesToNotes('D', keyTones)).toStrictEqual(TypeError(`The first key tone ${["B#", "C", "Dbb"]} does not include the tonic note D`))
  })
})

describe('Test adjustNote', () => {
  test('Execute adjustNote with natural note and a sharp', () => {
    expect(adjustNote('C', '#')).toStrictEqual('C#')
  })

  test('Execute adjustNote with sharp note and a sharp', () => {
    expect(adjustNote('C#', '#')).toStrictEqual('D')
  })

  test('Execute adjustNote with natural note and a flat', () => {
    expect(adjustNote('D', 'b')).toStrictEqual('Db')
  })

  test('Execute adjustNote with flat note and a flat', () => {
    expect(adjustNote('Db', 'b')).toStrictEqual('C')
  })
})