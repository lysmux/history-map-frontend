<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'

import MapContainer from '../components/MapContainer.vue'
import PlacePreview from '../components/PlacePreview.vue'

import type { Place } from '../types/Place.d'


const places = inject<Ref<Place[]>>('places')
const selectedPlace = ref<Place | null>()
const mapContainerRef = ref<InstanceType<typeof MapContainer>>()


// Handle place selection from the sidebar
const handlePlaceSelect = (place: Place) => {
  if (mapContainerRef.value) {
    mapContainerRef.value.panToLocation(place.latitude, place.longitude)
  }
}
</script>
<template>
  <MapContainer v-if="places" :places="places" @selectPlace="(place) => (selectedPlace = place)" />
  <PlacePreview v-if="selectedPlace" :place="selectedPlace" @close="selectedPlace = null" />
</template>
