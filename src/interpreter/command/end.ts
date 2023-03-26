import * as cal from 'calcium-js'

export class End implements cal.Command {
  execute(env: cal.Environment): cal.Behavior {
    return cal.Behavior.Stop
  }
}
