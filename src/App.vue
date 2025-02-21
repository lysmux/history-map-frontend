<script setup lang="ts">
/// <reference types="vite/client" />

import { provide, ref, readonly } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'

import type { Place } from './types/Place.d'

const places = ref<Place[]>([])

const modules = import.meta.glob<{ default: unknown }>('@/assets/articles/*.json', { eager: true })
const requiredKeys: (keyof Place)[] = [
  'name',
  'id',
  'latitude',
  'longitude',
  'preview',
  'previewImage',
  'article',
]
places.value = Object.values(modules)
  .map((mod) => mod.default)
  .filter((el) => {
    return requiredKeys.every((key) => key in (el as object))
  }) as Place[]

provide('places', readonly(places))
</script>

<template>
  <div class="w-full h-screen flex flex-col">
    <Header />
    <RouterView />
  </div>
</template>
