<script setup lang="ts">
import { ref, inject, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { MdPreview } from 'md-editor-v3'

import type { Place } from '../types/Place.d'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const place = ref<Place>()
const places = inject<Ref<Place[]>>('places')

if (places) place.value = places.value.filter((place) => place.id == id)[0]
</script>

<template>
  <div class="mt-10 rounded-xl p-10 w-4/5 bg-white m-auto flex flex-col gap-15 shadow-xl">
    <MdPreview v-if="place" :modelValue="place.article" />
  </div>
</template>
