export class NameNotFound extends Error {
  constructor(readonly name: string) {
    super(`変数 ${name} が見つかりませんでした。`)
  }
}

export class OperatorNotSupported extends Error {
  constructor(readonly op: string) {
    super(`${op} 演算が実行できませんでした。`)
  }
}
