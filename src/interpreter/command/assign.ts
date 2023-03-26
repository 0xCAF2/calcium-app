import * as cal from 'calcium-js'

export class Assign implements cal.Command {
  constructor(
    public readonly lhs: cal.Assignable,
    public readonly rhs: cal.Expression
  ) {}

  execute(env: cal.Environment): cal.Behavior {
    const rhsValue = env.evaluate(this.rhs)
    this.lhs.assign(rhsValue, env)
    return cal.Behavior.Forward
  }
}
