import * as ts from 'typescript'
import * as cal from 'calcium-js'
import * as kwd from './keywords'

class Print extends Error {
  constructor(readonly args: cal.Element[]) {
    super()
  }
}

function parseExpr(n: ts.Node): cal.Element {
  if (ts.isIdentifier(n)) {
    // 変数
    return [kwd.Reference.Variable, n.text]
  } else if (ts.isExpressionStatement(n)) {
    // console.log() を print コマンドへ変換します。

    if (ts.isCallExpression(n.expression)) {
      const args = n.expression.arguments.map((n) => parseExpr(n))
      throw new Print(args)
    }
    throw new Error('console.log() 以外の式文はサポートされていません')
  } else if (ts.isNumericLiteral(n)) {
    if (n.text.includes('.')) {
      return parseFloat(n.text)
    } else {
      return parseInt(n.text)
    }
  } else if (ts.isStringLiteral(n)) {
    return n.text
  } else if (n.kind === ts.SyntaxKind.FalseKeyword) {
    return false
  } else if (n.kind === ts.SyntaxKind.TrueKeyword) {
    return true
  } else if (ts.isBinaryExpression(n)) {
    const op = n.operatorToken.getText()
    return [kwd.binaryOperatorTable[op], parseExpr(n.left), parseExpr(n.right)]
  } else if (ts.isPrefixUnaryExpression(n)) {
    return [kwd.unaryOperatorTable[n.operator], parseExpr(n.operand)]
  } else if (ts.isArrayLiteralExpression(n)) {
    // Calcium における配列リテラルは、ネストする必要があります。
    return [n.elements.map((e) => parseExpr(e))]
  } else if (ts.isElementAccessExpression(n)) {
    const obj = parseExpr(n.expression)
    const index = parseExpr(n.argumentExpression)
    return [kwd.Reference.Subscript, obj, index]
  } else {
    throw new Error('未実装です: ' + n.toString())
  }
}

export function convert(sourceCode: string): string {
  const code: cal.Statement[] = []
  let indent = 1

  const _visit = function (stmt: ts.Node) {
    if (ts.isVariableStatement(stmt)) {
      // 変数宣言の場合

      // 変数の名前を取得します。
      const name = stmt.declarationList.declarations[0].name.getText()

      // 初期値を取得します。
      let rhs: cal.Element = null
      ts.visitNode(stmt.declarationList.declarations[0].initializer, (n) => {
        rhs = parseExpr(n)
        return n
      })

      code.push([indent, kwd.Command.Assign, [name, rhs]])
    } else if (ts.isExpressionStatement(stmt)) {
      // 代入の場合
      if (
        stmt
          .getChildren()
          .some(
            (n) =>
              n.kind === ts.SyntaxKind.BinaryExpression &&
              n.getChildAt(1).kind === ts.SyntaxKind.FirstAssignment
          )
      ) {
        let lhs: cal.Operation = [kwd.Reference.Variable, 'x']
        let rhs: cal.Element = null
        ts.visitNode(
          stmt
            .getChildren()
            .filter((n) => n.kind === ts.SyntaxKind.BinaryExpression)[0],
          (n) => {
            const assignment = n as ts.BinaryExpression
            lhs = parseExpr(assignment.left) as unknown as cal.Operation
            rhs = parseExpr(assignment.right)
            return n
          }
        )
        code.push([indent, kwd.Command.Assign, [lhs, rhs]])
      } else {
        try {
          parseExpr(stmt)
        } catch (e) {
          if (e instanceof Print) {
            // print 文としてコードへ追加します。
            code.push([indent, kwd.Command.Print, e.args])
          }
        }
      }
    } else if (ts.isIfStatement(stmt)) {
      // if 文の条件部
      const condition = parseExpr(stmt.expression)

      // Calcium では ifs { if {} else if {} } とネストします。
      code.push([indent, kwd.Command.Ifs, []])
      ++indent
      code.push([indent, kwd.Command.If, [condition]])
      ++indent
      _visit(stmt.thenStatement)
      code.push([indent, kwd.Command.EndIf, []])
      --indent

      if (stmt.elseStatement !== undefined) {
        const _visitElseIf = (n: ts.Node) => {
          if (ts.isIfStatement(n)) {
            // else if 文
            code.push([indent, kwd.Command.ElseIf, [parseExpr(n.expression)]])
            ++indent
            _visit(n.thenStatement)
            code.push([indent, kwd.Command.EndElseIf, []])
            --indent
            // 連続した eise if 文
            if (n.elseStatement !== undefined) {
              _visitElseIf(n.elseStatement)
            }
          } else {
            // else 文
            code.push([indent, kwd.Command.Else, []])
            ++indent
            _visit(n)
            code.push([indent, kwd.Command.EndElse, []])
            --indent
          }
        }
        _visitElseIf(stmt.elseStatement)
      }
      code.push([indent, kwd.Command.EndIfs, []])
      --indent
    } else if (ts.isForStatement(stmt)) {
      debugger
    } else if (ts.isWhileStatement(stmt)) {
      // while 文
      const condition = parseExpr(stmt.expression)
      code.push([indent, kwd.Command.While, [condition]])
      ++indent
      _visit(stmt.statement)
      code.push([indent, kwd.Command.EndWhile, []])
      --indent
    } else if (ts.isBlock(stmt)) {
      for (const s of stmt.statements) {
        _visit(s)
      }
    }
  }

  for (const stmt of ts.createSourceFile(
    'converted.js',
    sourceCode,
    ts.ScriptTarget.ES2015,
    true
  ).statements) {
    _visit(stmt)
  }

  code.push([indent, kwd.Command.End, []])

  // フォーマットします。
  const lines = code.map((a) => JSON.stringify(a))
  return `[\n${lines.reduce((c, l) => c + ',\n' + l)}\n]`
}
