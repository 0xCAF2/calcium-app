<script setup lang="ts">
import { ref } from 'vue'
const hint = ref<HTMLHeadingElement>()
</script>
<template>
  <h4 style="cursor: pointer; color: grey;" @click="hint!.style.display = 'block'">💡ヒントを表示</h4>
  <h5 ref="hint" style="display: none;">
    <slot></slot>
  </h5>
</template>