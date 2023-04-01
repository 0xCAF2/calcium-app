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
    const code = convert(`let dice = int(random() * 6) + 1
    console.log(dice)
    `)
    console.log(code)
    const runtime = createRuntime(code)
    runtime.run()
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
  it('for 文の変換', () => {
    const code = convert(`
    for (let i = 5; i >= 0; i -= 2) {
      console.log(i)
    }`)
    console.log(code)
    const runtime = createRuntime(code)
    runtime.run()
  })
  it('subscript 式の変換', () => {
    const code = convert(`
    let a = [0, 1, 2]
    console.log(a[1])
    a[1] = 7
    console.log(a)
    let sum = 0
    for (let i = 0; i <= 2; i += 1) {
      sum = sum + a[i]
    }
    console.log(sum)
    `)
    console.log(code)
    const runtime = createRuntime(code)
    runtime.run()
  })
  it('fill 文の実行', () => {
    const code = `[
      [1, [], "=", ["var", "a"], [[1, 1, 1]]],
      [1, [], "print", ["var", "a"]],
      [1, [], "fill", ["var", "a"]],
      [1, [], "print", ["var", "a"]],
      [1, [], "end"]
    ]`
    const runtime = createRuntime(code)
    runtime.run()
  })
})
