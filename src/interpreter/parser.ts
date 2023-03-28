import * as cal from 'calcium-js'
import * as cmd from './command'
import * as expr from './expression'
import * as idx from './indexes'
import * as kwd from './keywords'

export class Parser extends cal.Parser {
  constructor(table: cal.CommandTable) {
    super(table)
  }

  readBinOp(elem: cal.Operation): cal.Expression {
    const op = elem[idx.Operation.Keyword]
    const left = this.readExpr(elem[idx.BinaryOperator.Left])
    const right = this.readExpr(elem[idx.BinaryOperator.Right])
    return new expr.BinaryOperator(op, left, right)
  }

  readExpr(elem: cal.Element): cal.Expression {
    if (Array.isArray(elem)) {
      if (Array.isArray(elem[0])) {
        // Calcium の配列リテラルです。ネストされています。
        return elem[0].map((e) => this.readExpr(e))
      } else {
        const keyword = elem[idx.Operation.Keyword]
        if (
          [kwd.Reference.Variable.toString(), kwd.Reference.Subscript].includes(
            keyword
          )
        ) {
          return this.readRef(elem as cal.Operation)
        } else {
          return this.readBinOp(elem as cal.Operation)
        }
      }
    } else {
      return elem
    }
  }

  readRef(elem: cal.Operation): cal.Reference {
    const keyword = elem[idx.Operation.Keyword]
    switch (keyword) {
      case kwd.Reference.Variable:
        return new expr.Variable(elem[idx.Variable.Name] as string)
      default:
        throw new Error(`未実装です: ${elem}`)
    }
  }
}

const t: cal.CommandTable = new Map()
t.set(kwd.Command.Assign, (p, s) => {
  const lhs = p.readRef(s[idx.Assign.Lhs] as cal.Operation) as cal.Assignable
  const rhs = p.readExpr(s[idx.Assign.Rhs]) as cal.Expression
  return new cmd.Assign(lhs, rhs)
})
t.set(kwd.Command.Comment, () => {
  return new cmd.Comment()
})
t.set(kwd.Command.Else, () => {
  return new cmd.Else()
})
t.set(kwd.Command.ElseIf, (p, s) => {
  const condition = p.readExpr(s[idx.Conditional.Expr])
  return new cmd.ElseIf(condition)
})
t.set(kwd.Command.End, () => {
  return new cmd.End()
})
t.set(kwd.Command.EndElse, () => {
  return new cmd.EndElse()
})
t.set(kwd.Command.EndElseIf, () => {
  return new cmd.EndElseIf()
})
t.set(kwd.Command.EndForMinus, () => {
  return new cmd.EndFor()
})
t.set(kwd.Command.EndForPlus, () => {
  return new cmd.EndFor()
})
t.set(kwd.Command.EndIf, () => {
  return new cmd.EndIf()
})
t.set(kwd.Command.EndIfs, () => {
  return new cmd.EndIfs()
})
t.set(kwd.Command.EndWhile, () => {
  return new cmd.EndWhile()
})
t.set(kwd.Command.ForMinus, (p, s) => {
  const name = s[idx.For.Name] as string
  const start = p.readExpr(s[idx.For.Start])
  const stop = p.readExpr(s[idx.For.Stop])
  const step = p.readExpr(s[idx.For.Step])
  return new cmd.ForMinus(name, start, stop, step)
})
t.set(kwd.Command.ForPlus, (p, s) => {
  const name = s[idx.For.Name] as string
  const start = p.readExpr(s[idx.For.Start])
  const stop = p.readExpr(s[idx.For.Stop])
  const step = p.readExpr(s[idx.For.Step])
  return new cmd.ForPlus(name, start, stop, step)
})
t.set(kwd.Command.If, (p, s) => {
  const condition = p.readExpr(s[idx.Conditional.Expr])
  return new cmd.If(condition)
})
t.set(kwd.Command.Ifs, () => {
  return new cmd.Ifs()
})
t.set(kwd.Command.Print, (p, s) => {
  const args = s.slice(idx.Print.Args).map((arg) => p.readExpr(arg))
  return new cmd.Print(args)
})
t.set(kwd.Command.While, (p, s) => {
  const condition = p.readExpr(s[idx.While.Condition])
  return new cmd.While(condition)
})

export const commandTable = t
