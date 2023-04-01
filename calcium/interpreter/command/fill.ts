import * as cal from 'calcium-js'
import { FillNotApplied } from '../error'

export class Fill implements cal.Command {
  constructor(readonly array: cal.Expression) {}

  execute(env: cal.Environment): cal.Behavior {
    const arrayValue = env.evaluate(this.array)
    if (!Array.isArray(arrayValue)) {
      throw new FillNotApplied()
    }
    for (let i = 0; i < arrayValue.length; ++i) {
      arrayValue[i] = 0
    }
    return cal.Behavior.Forward
  }
}
