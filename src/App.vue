<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Blockly from 'blockly'
// @ts-ignore
import DarkTheme from '@blockly/theme-dark'

const divBlockly = ref<HTMLDivElement>()
const iframeAppDisplay = ref<HTMLIFrameElement>()

// @ts-ignore
let editableWorkspace: Blockly.Workspace

declare global {
  interface Window {
    hello: () => void
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
          name: '代入',
          contents: [
            {
              kind: 'block',
              type: 'controls_if'
            }
          ]
        }
      ]
    }
  })

  iframeAppDisplay.value!.contentWindow!.hello = () => console.log('Hello, World.')
})

</script>

<template>
  <div ref="divBlockly" id="divBlockly"></div>
  <iframe ref="iframeAppDisplay" id="iframeAppDisplay" src="/apps/intro/build/web/index.html"></iframe>
</template>

<style scoped>
#divBlockly {
  width: 640px;
  height: 400px;
}

#iframeAppDisplay {
  width: 360px;
  height: 640px;
}
</style>
