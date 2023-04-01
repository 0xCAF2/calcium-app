import * as cal from 'calcium-js'

abstract class For implements cal.Command {
  constructor(
    readonly name: string,
    readonly start: cal.Expression,
    readonly stop: cal.Expression,
    readonly step: cal.Expression
  ) {}

  execute(env: cal.Environment): cal.Behavior {
    const stopValue = env.evaluate(this.stop) as number
    if (env.previousBehavior !== cal.Behavior.Loop) {
      // initialize
      const startValue = env.evaluate(this.start) as number
      if (this.next(startValue, stopValue)) {
        env.context.register(this.name, startValue)
        env.address.shift(1)
      }
    } else {
      // execute as next step
      const currentValue =
        (env.context.lookUp(this.name) as number) + this.stepValue(env)
      if (this.next(currentValue, stopValue)) {
        env.context.register(this.name, currentValue)
        env.address.shift(1)
      }
    }
    return cal.Behavior.Forward
  }

  abstract next(current: number, stop: number): boolean
  abstract stepValue(env: cal.Environment): number
}

export class ForPlus extends For {
  next(current: number, stop: number): boolean {
    return current <= stop
  }

  stepValue(env: cal.Environment): number {
    return env.evaluate(this.step) as number
  }
}

export class ForMinus extends For {
  next(current: number, stop: number): boolean {
    return current >= stop
  }

  stepValue(env: cal.Environment): number {
    return -(env.evaluate(this.step) as number)
  }
}
