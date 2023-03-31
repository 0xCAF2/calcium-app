import * as cal from 'calcium-js'
import { ArrayRequired, FunctionNotFound, NumberRequired } from '../error'

export class Call implements cal.Reference {
  constructor(readonly name: string, readonly args: cal.Expression[]) {}

  evaluate(env: cal.Environment): cal.Any {
    // TODO: enable to call arbitrary functions.
    const arg = env.evaluate(this.args[0])
    switch (this.name) {
      case 'int':
        if (typeof arg === 'number') {
          return Math.floor(arg)
        }
        throw new NumberRequired()
      case 'len':
        if (Array.isArray(arg)) {
          return arg.length
        }
        throw new ArrayRequired()
      case 'random':
        return Math.random()
      default:
        throw new FunctionNotFound()
    }
  }
}
