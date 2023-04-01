import * as cal from 'calcium-js'
import * as kwd from '../keywords'
import { MinusNotApplied } from '../error'

export class UnaryOperator implements cal.Reference {
  constructor(readonly op: string, readonly operand: cal.Expression) {}

  evaluate(env: cal.Environment): cal.Any {
    const value = env.evaluate(this.operand)
    if (this.op === kwd.UnaryOperator.Minus) {
      if (typeof value !== 'number') {
        throw new MinusNotApplied()
      }
      return -value
    } else {
      return !value
    }
  }
}
