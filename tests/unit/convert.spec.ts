import { createRuntime } from '@/interpreter'
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
  it('if 文の変換', () => {
    const code = convert(`
    let num = 73
    if (num > 70) {
      console.log('OK')
    } else if (num > 60) {
      console.log('NG.')
    } else {
      console.log('NG 2.')
    }`)
    console.log(code)
    const runtime = createRuntime(code)
    runtime.run()
  })
  it('while 文の変換', () => {
    const code = convert(`
    let i = 0
    while (i < 5) {
      console.log(i)
      i = i + 1
    }`)
    console.log(code)
    const runtime = createRuntime(code)
    runtime.run()
  })
})
