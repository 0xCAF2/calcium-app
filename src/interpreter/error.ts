export class NameNotFound extends Error {
  constructor(readonly name: string) {
    super(`変数 ${name} が見つかりませんでした。`)
  }
}
