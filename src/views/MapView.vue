<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Map from '../components/MapContainer.vue'
import PlacePreview from '../components/PlacePreview.vue'

import { apiClient } from '../utils/apiClient'
import type { Place } from '../types/Place.d'

const places = ref<Place[]>([])
const selectedPlace = ref<Place | null>()

onMounted(async () => {
  // places.value = await apiClient.get<Place[]>({ url: '/place' })
  places.value = [
    {
      category: 'Соборы',
      cover_image_id: 'ce42f772-803b-402f-ab30-1aa4c06c63f3',
      id: '7a1dfe49-18ba-462b-b4d5-61a7a14af34e',
      latitude: 59.934185,
      longitude: 30.324537,
      name: 'Казанский собор',
      preview: 'Один из крупнейших храмов Санкт-Петербурга',
    },
  ]
})
</script>

<template>
  <Map :places="places" @selectPlace="(place) => (selectedPlace = place)" />
  <PlacePreview v-if="selectedPlace" :place="selectedPlace" @close="selectedPlace = null" />
</template>
