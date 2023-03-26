import * as cal from 'calcium-js'
import * as cmd from './command'
import * as expr from './expression'
import * as idx from './indexes'
import * as kwd from './keywords'

export class Parser extends cal.Parser {
  constructor(table: cal.CommandTable) {
    super(table)
  }

  readExpr(elem: cal.Element): cal.Expression {
    if (Array.isArray(elem)) {
      if (Array.isArray(elem[0])) {
        // Calcium の配列リテラルです。ネストされています。
        return elem[0].map((e) => this.readExpr(e))
      } else {
        const keyword = elem[idx.Operation.Keyword]
        if (
          [
            kwd.Reference.Variable.toString(),
            kwd.Reference.Subscript.toString(),
          ].includes(keyword)
        ) {
          return this.readRef(elem as cal.Operation)
        }
      }
    } else {
      return elem
    }
    throw new Error(`未実装です: ${elem}`)
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
t.set(kwd.Command.End, () => {
  return new cmd.End()
})
t.set(kwd.Command.Print, (p, s) => {
  const args = s.slice(idx.Print.Args).map((arg) => p.readExpr(arg))
  return new cmd.Print(args)
})

export const commandTable = t
