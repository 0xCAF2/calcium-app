import { Parser, commandTable } from './parser'
import * as cal from 'calcium-js'

export function createRuntime(code: string): cal.Runtime {
  return new cal.Runtime({ code, parser: new Parser(commandTable) })
}
