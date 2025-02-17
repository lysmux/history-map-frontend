<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import type { Place } from '../types/Place.d'

const { places } = defineProps<{ places: Place[] }>()
const emit = defineEmits(['selectPlace'])

const mapRef = ref<HTMLDivElement>()

onMounted(() => {
  const map = L.map(mapRef.value as HTMLDivElement).setView([59.957355, 30.310198], 13)
  map.attributionControl.setPrefix('')

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)
  L.imageOverlay(
    '/map.jpg',
    [
      [60.064840,30.157470],
      [59.833775,30.509038],
    ],
    { opacity: 0.6 },
  ).addTo(map)

  watch(
    () => places,
    () => {
      places.forEach((place) => {
        const marker = L.marker([place.latitude, place.longitude]).addTo(map)
        marker.on('click', () => emit('selectPlace', place))
      })
    },
  )
})
</script>

<template>
  <div ref="mapRef" class="w-full h-full"></div>
</template>

<style>
.leaflet-control-zoom {
  margin-top: 100px !important;
}
</style>
