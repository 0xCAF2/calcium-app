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
      case kwd.BinaryOperator.And:
        return leftValue && rightValue
      case kwd.BinaryOperator.Division:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return leftValue / rightValue
        }
        break
      case kwd.BinaryOperator.Equal:
        return leftValue === rightValue
      case kwd.BinaryOperator.Exponentiation:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return Math.pow(leftValue, rightValue)
        }
        break
      case kwd.BinaryOperator.FloorDivision:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return Math.floor(leftValue / rightValue)
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
      case kwd.BinaryOperator.GreaterThanOrEqual:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return leftValue >= rightValue
        } else if (
          typeof leftValue === 'string' &&
          typeof rightValue === 'string'
        ) {
          return leftValue >= rightValue
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
      case kwd.BinaryOperator.LessThanOrEqual:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return leftValue <= rightValue
        } else if (
          typeof leftValue === 'string' &&
          typeof rightValue === 'string'
        ) {
          return leftValue <= rightValue
        }
        break
      case kwd.BinaryOperator.Multiplication:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return leftValue * rightValue
        }
        break
      case kwd.BinaryOperator.NotEqual:
        return leftValue !== rightValue
      case kwd.BinaryOperator.Or:
        return leftValue || rightValue
      case kwd.BinaryOperator.Remainder:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return leftValue % rightValue
        }
        break
      case kwd.BinaryOperator.Subtraction:
        if (typeof leftValue === 'number' && typeof rightValue === 'number') {
          return leftValue - rightValue
        }
        break
      default:
        break
    }
    throw new OperatorNotSupported(operator)
  }
}
