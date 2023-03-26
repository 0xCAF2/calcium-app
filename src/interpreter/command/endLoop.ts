import * as cal from 'calcium-js'

abstract class EndLoop implements cal.Command {
  execute(env: cal.Environment): cal.Behavior {
    env.address.shift(-1)
    return cal.Behavior.Loop
  }
}

export class EndWhile extends EndLoop {}
