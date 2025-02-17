<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import type { Place } from '../types/Place.d'
import { apiClient } from '../utils/apiClient'

import data from '@/assets/data.json'

const route = useRoute()
const place = ref<Place | null>()
place.value = data[Number(route.params.id)]

onMounted(() => {
  // place.value = await apiClient.get<Place>({ url: `/place/${route.params.id}` })
})
</script>

<template>
  <div class="mt-10 rounded-xl p-10 w-4/5 bg-white m-auto flex flex-col gap-15 shadow-xl">
    <p v-html="place.article"></p>
  </div>
</template>
