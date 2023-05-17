<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import Blockly from 'blockly'
// @ts-ignore
import DarkTheme from '@blockly/theme-dark'
import './definition'
// @ts-ignore
import generator from './generator.js'

const divBlockly = ref<HTMLDivElement>()
const divPseudo = ref<HTMLDivElement>()
const iframeDisplay = ref<HTMLIFrameElement>()

enum AppState {
  Editing,
  Launched,
}

const state = reactive({ app: AppState.Editing })

// @ts-ignore
let editableWorkspace: Blockly.Workspace

declare global {
  interface Window {
    launchApp: () => void
    editCode: () => void
    send: (name: string, favorite: string) => void
    generateCode: () => string
  }
}

onMounted(() => {
  editableWorkspace = Blockly.inject(divBlockly.value!, {
    renderer: 'zelos',
    sounds: false,
    theme: DarkTheme,
    zoom: { startScale: 0.7 },
    toolbox: {
      kind: 'categoryToolbox',
      contents: [
        {
          kind: 'category',
          name: '変数',
          contents: [
            {
              kind: 'block',
              type: 'calcium_variable_name'
            },
            {
              kind: 'block',
              type: 'calcium_variable_favorite'
            }
          ]
        },
        {
          kind: 'category',
          name: '代入',
          contents: [
            {
              kind: 'block',
              type: 'calcium_input'
            }
          ]
        },
        {
          kind: 'category',
          name: '関数',
          contents: [
            {
              kind: 'block',
              type: 'calcium_send'
            }
          ]
        }
      ]
    }
  })

  iframeDisplay.value!.contentWindow!.editCode = () => {
    state.app = AppState.Editing
  }
  iframeDisplay.value!.contentWindow!.launchApp = () => {
    // TODO: parse code and show pseudo representation
    const code = generator.workspaceToCode(editableWorkspace)
    divPseudo.value!.innerText = code
    state.app = AppState.Launched
  }
  iframeDisplay.value!.contentWindow!.send = (name, favorite) => {
    console.log(name, favorite)
  }
  iframeDisplay.value!.contentWindow!.generateCode = () => {
    return generator.workspaceToCode(editableWorkspace)
  }
})

</script>

<template>
  <div>
    <div style="position: relative;" class="divBlockly">
      <div ref="divBlockly" class="divBlockly"></div>
      <div ref="divPseudo" class="divPseudo" v-show="state.app === AppState.Launched"></div>
    </div>
    <slot></slot>
  </div>
  <iframe ref="iframeDisplay" class="iframeDisplay" src="/apps/intro/favorite/build/web/index.html"></iframe>
</template>
