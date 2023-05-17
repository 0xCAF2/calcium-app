<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import Editor from './Editor.vue';
import Hint from '../components/Hint.vue'

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
    <Editor v-if="state.display === Display.ViewCode">
      <h3>自己紹介の時に好きなものを共有するアプリを作ります。</h3>
      <h3>名前、好きなもの、の順に送信する必要があります。</h3>
      <Hint>
        <ul>
          <li>変数に代入する（値を入れる）には、＝ の左に変数ブロックを置きます。</li>
          <li>変数ブロックを関数に渡すと、変数の中身を取り出すことができます。</li>
          <li>関数に渡す変数の順番に注意しましょう。</li>
        </ul>
      </Hint>
    </Editor>
  </div>
</template>
<style></style>