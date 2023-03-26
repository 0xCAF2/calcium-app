import { NameNotFound } from '../error'
import * as cal from 'calcium-js'

export class Variable implements cal.Assignable {
  constructor(public readonly name: string) {}

  assign(value: cal.Any, env: cal.Environment) {
    env.context.register(this.name, value)
  }

  evaluate(env: cal.Environment): cal.Any {
    const value = env.context.lookUp(this.name)
    if (value === undefined) {
      throw new NameNotFound(this.name)
    }
    return value
  }
}
