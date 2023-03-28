import { Parser, commandTable } from './parser'
import * as cal from 'calcium-js'
import * as kwd from './keywords'

export function createRuntime(code: string): cal.Runtime {
  return new cal.Runtime({
    code,
    parser: new Parser(commandTable),
    events: {
      skip: (s, r) => {
        const keyword = s[cal.Index.Command]
        if (
          [
            kwd.Command.Comment.toString(),
            kwd.Command.EndElse,
            kwd.Command.EndElseIf,
            kwd.Command.EndIf,
            kwd.Command.EndIfs,
          ].includes(keyword)
        ) {
          const cmd = r.parser.readStmt(s)
          cmd.execute(r.env)
          r.forward()
          return true
        } else if (
          [
            kwd.Command.EndForMinus.toString(),
            kwd.Command.EndForPlus,
            kwd.Command.EndWhile,
          ].includes(keyword)
        ) {
          const loop = r.parser.readStmt(s)
          loop.execute(r.env)
          r.env.previousBehavior = cal.Behavior.Loop
          r.backward()
          return true
        }
        return false
      },
    },
  })
}
