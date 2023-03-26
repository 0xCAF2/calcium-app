import * as cal from 'calcium-js'
import { OperatorNotSupported } from '../error'
import * as kwd from '../keywords'

export class BinaryOperator implements cal.Reference {
  constructor(
    readonly op: string,
    readonly left: cal.Expression,
    readonly right: cal.Expression
  ) {}

  evaluate(env: cal.Environment): cal.Any {
    const leftValue = env.evaluate(this.left)
    const rightValue = env.evaluate(this.right)
    const operator = kwd.binaryOperatorTable[this.op]
    switch (operator) {
      case kwd.BinaryOperator.Addition:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return leftValue + rightValue
        } else if (
          typeof leftValue === 'string' &&
          typeof rightValue === 'string'
        ) {
          return leftValue + rightValue
        }
        break
      case kwd.BinaryOperator.GreaterThan:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return leftValue > rightValue
        } else if (
          typeof leftValue === 'string' &&
          typeof rightValue === 'string'
        ) {
          return leftValue > rightValue
        }
        break
      case kwd.BinaryOperator.LessThan:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return leftValue < rightValue
        } else if (
          typeof leftValue === 'string' &&
          typeof rightValue === 'string'
        ) {
          return leftValue < rightValue
        }
        break
    }
    throw new OperatorNotSupported(operator)
  }
}
