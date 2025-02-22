<template>
  <div class="w-screen h-screen flex flex-col">
    <!-- Header -->
    <Header :is-sidebar-visible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />

    <!-- Main Content Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <Sidebar :is-visible="isSidebarVisible" />

      <!-- RouterView -->
      <div class="flex-1 overflow-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
  /// <reference types="vite/client" />
  
  import { provide, ref, readonly } from 'vue';
  import { RouterView } from 'vue-router';
  import Header from './components/AppHeader.vue';
  import Sidebar from './components/Sidebar.vue'; // Import the Sidebar component
  
  import type { Place } from './types/Place.d';
  
  // State for places
  const places = ref<Place[]>([]);
  
  // Load places from JSON files
  const modules = import.meta.glob<{ default: unknown }>('@/assets/articles/*.json', { eager: true });
  const requiredKeys: (keyof Place)[] = [
    'name',
    'id',
    'latitude',
    'longitude',
    'preview',
    'previewImage',
    'article',
  ];
  places.value = Object.values(modules)
    .map((mod) => mod.default)
    .filter((el) => {
      return requiredKeys.every((key) => key in (el as object));
    }) as Place[];
  
  // Provide places to the app
  provide('places', readonly(places));
  
  // State for sidebar visibility
  const isSidebarVisible = ref(true);
  
  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
  };
  </script>
  
  <template>
    <div class="w-full h-screen flex flex-col">
      <!-- Header -->
      <Header
        :is-sidebar-visible="isSidebarVisible"
        @toggle-sidebar="toggleSidebar"
      />
  
      <!-- Main Content Area -->
      <div class="flex flex-1 overflow-hidden relative">
        <!-- Sidebar -->
        <Sidebar
          :is-visible="isSidebarVisible"
          :places="places"
          @toggle-sidebar="toggleSidebar"
        />
  
        <!-- RouterView -->
        <div class="router-view">
          <RouterView />
        </div>
      </div>
    </div>
  </template>
  
  <style>
  /* Optional: Add global styles if needed */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .router-view {
    flex: 1;
    overflow: auto;
    width: 100%; /* Ensure RouterView takes up the full width */
  }
  </style>
=======
/// <reference types="vite/client" />

import { provide, ref, readonly } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'
import Sidebar from './components/Sidebar.vue'

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
>>>>>>> 0156cc70de00d16e044e7dbf3d8f5417c0bdc862
