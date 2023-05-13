import Blockly from 'blockly'
import { removeParens } from '../common/generator_utils'

const generator = new Blockly.Generator('CalciumIntro')

generator['calcium_variable_name'] = function () {
  return [JSON.stringify(['var', 'name']), 0]
}

generator['calcium_variable_favorite'] = function () {
  return [JSON.stringify(['var', 'favorite']), 0]
}

generator['calcium_input'] = function (block) {
  const variable = JSON.parse(removeParens(generator.valueToCode(block, 'REF', 0)) || 'null')
  return JSON.stringify([1, [], 'input', variable]) + ','
}

generator['calcium_send'] = function (block) {
  const arg1 = JSON.parse(removeParens(generator.valueToCode(block, 'ARG1', 0)) || 'null')
  const arg2 = JSON.parse(removeParens(generator.valueToCode(block, 'ARG2', 0)) || 'null')
  return JSON.stringify([1, [], 'send', arg1, arg2]) + ','
}

generator.scrub_ = function (block, code, opt_thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock()
  const nextCode = opt_thisOnly ? '' : generator.blockToCode(nextBlock)
  return code + nextCode
}

generator.finish = function (code) {
  return `[${code}[1, [], "end"]]`
}

export default generator
