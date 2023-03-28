// Commands

export enum Assign {
  Lhs = 3,
  Rhs = 4,
}

export enum Conditional {
  Expr = 3,
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

export enum Operation {
  Keyword = 0,
}

export enum Variable {
  Name = 1,
}
