<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <Header />
    <RouterView />
  </div>
</template>
