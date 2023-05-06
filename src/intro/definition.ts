import Blockly from 'blockly'

Blockly.defineBlocksWithJsonArray([
  {
    type: 'calcium_variable_name',
    message0: '変数「名前」',
    args0: [],
    inputsInline: true,
    output: 'calcium_variable',
    colour: 0,
    tooltip: '自己紹介の時に使う「名前」を保存するための変数です。',
    helpUrl: '',
  },
  {
    type: 'calcium_variable_favorite',
    message0: '変数「好きなもの」',
    args0: [],
    inputsInline: true,
    output: 'calcium_variable',
    colour: 0,
    tooltip: '自己紹介の時に使う「好きなもの」を保存するための変数です。',
    helpUrl: '',
  },
  {
    type: 'calcium_input',
    message0: '%1 = 【外部からの入力(文字列)】',
    args0: [
      {
        type: 'input_value',
        name: 'REF',
        check: ['calcium_variable'],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: 'アプリから入力した文字列を変数に代入します。',
    helpUrl: '',
  },
  {
    type: 'calcium_send',
    message0: '送信する( %1 , %2 )',
    args0: [
      {
        type: 'input_value',
        name: 'ARG1',
        check: ['calcium_variable'],
      },
      {
        type: 'input_value',
        name: 'ARG2',
        check: ['calcium_variable'],
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: '変数の中身をアプリから送信します。',
    helpUrl: '',
  },
])
