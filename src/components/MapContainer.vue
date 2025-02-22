<script setup lang="ts">
  import { onMounted, ref, type Ref } from 'vue'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'
  
  import type { Place } from '../types/Place.d'
  
  const { places } = defineProps<{ places: Place[] }>()
  const emit = defineEmits(['selectPlace'])
  
  const mapRef = ref<HTMLDivElement>()
  const mapInstance = ref<L.Map>()
  
  onMounted(() => {
    mapInstance.value = L.map(mapRef.value as HTMLDivElement).setView([59.957355, 30.310198], 13)
    mapInstance.value.attributionControl.setPrefix('')
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance.value)
  
    L.imageOverlay(
      '/map.jpg',
      [
        [60.06484, 30.15747],
        [59.833775, 30.509038],
      ],
      { opacity: 0.6 },
    ).addTo(mapInstance.value)
  
    places.forEach((place) => {
      const marker = L.marker([place.latitude, place.longitude]).addTo(mapInstance.value!)
      marker.on('click', () => emit('selectPlace', place))
    })
  })
  
  // Expose a method to pan the map to a specific location
  const panToLocation = (latitude: number, longitude: number) => {
    if (mapInstance.value) {
      mapInstance.value.setView([latitude, longitude], 13)
    }
  }
  
  // Expose the panToLocation method to the parent component
  defineExpose({ panToLocation })
  </script>
  
  <template>
    <div ref="mapRef" class="w-full h-full"></div>
  </template>
  
  <style>
  .leaflet-control-zoom {
    margin-top: 100px !important;
  }
  </style>