<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { MdPreview } from 'md-editor-v3'

import type { Place } from '../types/Place.d'
import { getPlace } from '../utils/apiClient'

const route = useRoute()
const place = ref<Place>()

onMounted(async () => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  place.value = await getPlace(id)
})
</script>

<template>
  <div class="mt-10 rounded-xl p-10 w-4/5 bg-white m-auto flex flex-col gap-15 shadow-xl">
    <MdPreview v-if="place" :modelValue="place.article" />
  </div>
</template>
