import { IntervalDistance } from "../interval"
import { Chord } from "../chord"
import { ModeDegree } from "../mode"

type Voicing = IntervalDistance[]

interface VoicingOptions {
  minToneSpread: IntervalDistance,
  maxToneSpread: IntervalDistance,
  maxSize: number,
  minSize: number,
  omitDegrees?: ModeDegree[],
  guaranteeDegrees?: ModeDegree[]
}

export const voicing = {
  generate: function (chord: Required<Chord>, voicing: VoicingOptions) {}
}