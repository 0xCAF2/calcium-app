import * as cal from 'calcium-js'

export class Print implements cal.Command {
  constructor(public readonly args: cal.Expression[]) {}

  execute(env: cal.Environment): cal.Behavior {
    console.log(this.args.map((a) => env.evaluate(a)).join(' '))
    return cal.Behavior.Forward
  }
}
