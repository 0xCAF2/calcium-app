import * as cal from 'calcium-js'

export class Comment implements cal.Command {
  execute(): cal.Behavior {
    // do nothing
    return cal.Behavior.Forward
  }
}
