import * as cal from 'calcium-js'

export class Ifs implements cal.Command {
  execute(env: cal.Environment): cal.Behavior {
    env.address.shift(1)
    return cal.Behavior.Forward
  }
}
