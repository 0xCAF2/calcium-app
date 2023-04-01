import * as cal from 'calcium-js'

export abstract class Conditional implements cal.Command {
  constructor(readonly condition: cal.Expression) {}

  execute(env: cal.Environment): cal.Behavior {
    if (env.evaluate(this.condition)) {
      env.address.shift(1)
    }
    return cal.Behavior.Forward
  }
}

export class If extends Conditional {}
export class ElseIf extends Conditional {}

export class Else implements cal.Command {
  execute(env: cal.Environment): cal.Behavior {
    env.address.shift(1)
    return cal.Behavior.Forward
  }
}
