import * as cal from 'calcium-js'
import { IndexNotApplied, SubscriptNotAllowed } from '../error'

export class Subscript implements cal.Assignable {
  constructor(readonly array: cal.Expression, readonly index: cal.Expression) {}

  assign(value: cal.Any, env: cal.Environment) {
    const arrayValue = this.retrieveArray(env)
    const indexValue = this.retrieveIndex(env)
    arrayValue[indexValue] = value
  }

  evaluate(env: cal.Environment): cal.Any {
    const arrayValue = this.retrieveArray(env)
    const indexValue = this.retrieveIndex(env)
    return arrayValue[indexValue]
  }

  retrieveArray(env: cal.Environment): cal.Any[] {
    const arrayValue = env.evaluate(this.array)
    if (!Array.isArray(arrayValue)) {
      throw new SubscriptNotAllowed()
    }
    return arrayValue
  }

  retrieveIndex(env: cal.Environment): number {
    const indexValue = env.evaluate(this.index)
    if (typeof indexValue !== 'number') {
      throw new IndexNotApplied()
    }
    return indexValue
  }
}
