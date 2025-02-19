<script setup lang="ts">
import type { Place } from '../types/Place.d'

defineProps<{ place: Place }>()
</script>

<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-1000"
    @click="$emit('close')"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md text-center relative" @click.stop>
      <button
        class="absolute top-4 right-4 w-8 h-8 font-bold rounded-full bg-red-200 shadow-md hover:bg-red-400"
        @click="$emit('close')"
      >
        &times;
      </button>
      <img :src="`/uploaded/${place.coverImageId}`" alt="Place Image" class="w-full h-auto mb-4" />
      <h2 class="text-xl font-bold">{{ place.name }}</h2>
      <p class="text-gray-700 mb-6">{{ place.preview }}</p>
      <button
        @click="
          $router.push({
            name: 'article',
            params: { id: place.id },
          })
        "
        class="px-4 py-2 bg-blue-100 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-200"
      >
        Подробнее
      </button>
    </div>
  </div>
</template>
