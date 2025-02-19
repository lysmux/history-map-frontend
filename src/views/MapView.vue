<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Map from '../components/MapContainer.vue'
import PlacePreview from '../components/PlacePreview.vue'

import { getPlaces } from '../utils/apiClient'
import type { Place } from '../types/Place.d'

const places = ref<Place[]>([])
const selectedPlace = ref<Place | null>()

onMounted(async () => {
  places.value = await getPlaces()
})
</script>

<template>
  <Map :places="places" @selectPlace="(place) => (selectedPlace = place)" />
  <PlacePreview v-if="selectedPlace" :place="selectedPlace" @close="selectedPlace = null" />
</template>
