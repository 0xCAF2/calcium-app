import { convert } from '@/interpreter/converter'

describe('convert 関数のテスト', () => {
  it('console.log() の変換', () => {
    console.log(
      convert(`
  console.log('Hello, World.')
  `)
    )
  })
  it('関数の変換', () => {
    console.log(convert(`let dice = 整数(乱数() * 6) + 1`))
  })
})
