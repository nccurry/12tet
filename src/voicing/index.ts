import { IntervalDistance } from "../interval"
import { Chord } from "../chord"
import { ModeDegree } from "../mode"

// Data / Types

type Voicing = IntervalDistance[]

interface VoicingOptions {
  minToneSpread: IntervalDistance,
  maxToneSpread: IntervalDistance,
  maxSize: number,
  minSize: number,
  omitDegrees?: ModeDegree[],
  guaranteeDegrees?: ModeDegree[]
}



// Functions / Classes

export const voicing = {
  generate: function (chord: Required<Chord>, voicing: VoicingOptions) {},
}