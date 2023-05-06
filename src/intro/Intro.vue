<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import Editor from './Editor.vue';

enum Display {
  ShowMessage,
  ViewCode,
  ShowResult,
}

const state = reactive({ display: Display.ShowMessage })

const messageApp = ref<HTMLIFrameElement>()

declare global {
  interface Window {
    viewCode: () => void
  }
}

onMounted(() => {
  messageApp.value!.contentWindow!.viewCode = () => state.display = Display.ViewCode
})

</script>
<template>
  <div style="display: flex;">
    <iframe ref="messageApp" id="messageApp" class="iframeDisplay" src="/apps/intro/message1/build/web/"
      v-if="state.display === Display.ShowMessage"></iframe>
    <Editor v-if="state.display === Display.ViewCode"></Editor>
  </div>
</template>
