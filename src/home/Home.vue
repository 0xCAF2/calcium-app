<script setup lang="ts">
import { routeName } from '../router';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <RouterLink :to="{ name: routeName.intro }">
      <h2>こんにちは、世界！ はじめまして！</h2>
    </RouterLink>
  </div>
</template>