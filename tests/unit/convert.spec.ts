import { convert } from '@/interpreter/converter'

describe('convert 関数のテスト', () => {
  it('console.log() の変換', () => {
    console.log(
      convert(`
  console.log('Hello, World.')
  `)
    )
  })
})
