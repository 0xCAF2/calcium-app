export class ArrayRequired extends Error {
  constructor() {
    super('要素数() には配列を渡す必要があります。')
  }
}

export class FunctionNotFound extends Error {}

export class NameNotFound extends Error {
  constructor(readonly name: string) {
    super(`変数 ${name} が見つかりませんでした。`)
  }
}

export class NumberRequired extends Error {
  constructor() {
    super('整数() には数値を渡す必要があります。')
  }
}

export class OperatorNotSupported extends Error {
  constructor(readonly op: string) {
    super(`${op} 演算が実行できませんでした。`)
  }
}
