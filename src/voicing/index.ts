import { IntervalDistance } from "../interval"
import { Chord } from "../chord"
import { ModeDegree } from "../mode"

// Types

type Voicing = IntervalDistance[]

interface VoicingOptions {
  minToneSpread: IntervalDistance,
  maxToneSpread: IntervalDistance,
  maxSize: number,
  minSize: number,
  omitDegrees?: ModeDegree[],
  guaranteeDegrees?: ModeDegree[]
}

// Data



// Functions

export const voicing = {
  generate: function (chord: Required<Chord>, voicing: VoicingOptions) {},
}