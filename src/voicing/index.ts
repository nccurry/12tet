import { IntervalDistance } from "../interval"
import { Chord } from "../chord"
import { ModeDegree } from "../mode"

type Voicing = IntervalDistance[]

export interface VoicingOptions {
  minToneSpread: IntervalDistance,
  maxToneSpread: IntervalDistance,
  maxSize: number,
  minSize: number,
  omitDegrees?: ModeDegree[],
  guaranteeDegrees?: ModeDegree[]
}

export function generateVoicing (chord: Chord, voicing: VoicingOptions): IntervalDistance[] {

  return []
}