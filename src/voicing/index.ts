import { IntervalDistance } from "../interval"
import { Chord } from "../chord"
import { ModeDegreeNumber } from "../mode"

type Voicing = IntervalDistance[]

interface VoicingOptions {
  minToneSpread: IntervalDistance,
  maxToneSpread: IntervalDistance,
  maxSize: number,
  minSize: number,
  omitDegrees?: ModeDegreeNumber[],
  guaranteeDegrees?: ModeDegreeNumber[]
}

export const voicing = {
  generate: function (chord: Required<Chord>, voicing: VoicingOptions) {}
}