export enum BinaryOperator {
  Addition = '+',
  Subtraction = '-',
  Multiplication = '*',
  Exponentiation = '**',
  Division = '/',
  Remainder = '%',

  Equal = '==',
  NotEqual = '!=',
  GreaterThan = '>',
  GreaterThanOrEqual = '>=',
  LessThan = '<',
  LessThanOrEqual = '<=',

  And = 'and',
  Or = 'or',
}

export const binaryOperatorTable: { [key: string]: BinaryOperator } = {
  '+': BinaryOperator.Addition,
  '-': BinaryOperator.Subtraction,
  '*': BinaryOperator.Multiplication,
  '**': BinaryOperator.Exponentiation,
  '/': BinaryOperator.Division,
  '%': BinaryOperator.Remainder,

  '==': BinaryOperator.Equal,
  '!=': BinaryOperator.NotEqual,
  '>': BinaryOperator.GreaterThan,
  '>=': BinaryOperator.GreaterThanOrEqual,
  '<': BinaryOperator.LessThan,
  '<=': BinaryOperator.LessThanOrEqual,

  '&&': BinaryOperator.And,
  '||': BinaryOperator.Or,
}

export enum Command {
  Assign = '=',
  Comment = '#',
  Else = 'else',
  ElseIf = 'else if',
  End = 'end',
  EndElse = 'end else',
  EndElseIf = 'end else if',
  EndForMinus = 'end for minus',
  EndForPlus = 'end for plus',
  EndIf = 'end if',
  EndIfs = 'end ifs',
  EndWhile = 'end while',
  ForMinus = 'for minus',
  ForPlus = 'for plus',
  If = 'if',
  Ifs = 'ifs',
  Print = 'print',
  While = 'while',
}

export enum Reference {
  Subscript = 'sub',
  Variable = 'var',
  Call = 'call',
}

export enum UnaryOperator {
  Minus = '-_',
  Not = 'not',
}

export const unaryOperatorTable: { [key: string]: UnaryOperator } = {
  '!': UnaryOperator.Not,
  '-': UnaryOperator.Minus,
}

export enum Expression {
  Call = 'call',
}
