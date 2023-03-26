import * as cal from 'calcium-js'

abstract class EndBlock implements cal.Command {
  execute(env: cal.Environment): cal.Behavior {
    env.address.shift(this.delta)
    return cal.Behavior.Forward
  }

  abstract get delta(): number
}

export class EndElse extends EndBlock {
  delta = -2
}

export class EndElseIf extends EndElse {}

export class EndIf extends EndElse {}

export class EndIfs extends EndBlock {
  delta = -1
}
