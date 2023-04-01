// Commands

export enum Assign {
  Lhs = 3,
  Rhs = 4,
}

export enum Conditional {
  Expr = 3,
}

export enum Fill {
  Target = 3,
}

export enum For {
  Name = 3,
  Start = 4,
  Stop = 5,
  Step = 6,
}

export enum Print {
  Args = 3,
}

export enum While {
  Condition = 3,
}

// Expressions

export enum BinaryOperator {
  Left = 1,
  Right = 2,
}

export enum Call {
  Callee = 1,
  Arguments = 2,
}

export enum Operation {
  Keyword = 0,
}

export enum Subscript {
  Ref = 1,
  Index = 2,
}

export enum UnaryOperator {
  Operand = 1,
}

export enum Variable {
  Name = 1,
}
