export class ArrayRequired extends Error {
  constructor() {
    super('要素数() には配列を渡す必要があります。')
  }
}

export class FillNotApplied extends Error {
  constructor() {
    super('すべての値を0にするには、配列が必要です。')
  }
}

export class FunctionNotFound extends Error {}

export class IndexNotApplied extends Error {
  constructor() {
    super('要素を指定するには、整数が必要です。')
  }
}

export class MinusNotApplied extends Error {
  constructor() {
    super('- 演算子を使うには、数が必要です。')
  }
}

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

export class SubscriptNotAllowed extends Error {
  constructor() {
    super('配列ではないため、要素を取り出すことができません。')
  }
}
