<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Blockly from 'blockly'
// @ts-ignore
import DarkTheme from '@blockly/theme-dark'

const divBlockly = ref()

let editableWorkspace: Blockly.Workspace

onMounted(() => {
  editableWorkspace = Blockly.inject(divBlockly.value, {
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
})

</script>

<template>
  <div ref="divBlockly" id="divBlockly"></div>
</template>

<style scoped>
#divBlockly {
  width: 640px;
  height: 400px;
}
</style>
