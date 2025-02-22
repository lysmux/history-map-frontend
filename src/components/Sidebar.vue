<<<<<<< HEAD
<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';
    import type { Place } from '../types/Place.d';
    
    // Define props
    const props = defineProps<{
      isVisible: boolean;
      places: Place[];
    }>();
    
    // Define emits
    const emit = defineEmits<{
      (event: 'toggle-sidebar'): void;
    }>();
    </script>
    
    <template>
      <div class="sidebar-container" :class="{ 'sidebar-hidden': !isVisible }">
        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar Content -->
          <ul>
            <li
              v-for="place in places"
              :key="place.id"
            >
              {{ place.name }}
            </li>
          </ul>
        </div>
    
        <!-- Toggle Button -->
        <button @click="emit('toggle-sidebar')" class="toggle-button">
          <span class="arrow" :class="{ 'arrow-collapsed': isVisible }"></span>
        </button>
      </div>
    </template>
    
    <style scoped>
    .sidebar-container {
      position: fixed; /* Fix the sidebar container to the left side of the screen */
      top: 60px; /* Position below the header */
      left: 0;
      z-index: 1000; /* Ensure the sidebar is above the RouterView */
      transition: transform 0.3s ease; /* Smooth transition for opening/closing */
    }
    
    .sidebar-hidden {
      transform: translateX(-250px); /* Hide the sidebar by moving it to the left */
    }
    
    .sidebar {
      width: 250px; /* Fixed width for the sidebar */
      background-color: #2c3e50;
      color: white;
      height: calc(100vh - 60px); /* Full height minus header height */
      overflow-y: auto; /* Make the sidebar scrollable if content overflows */
    }
    
    /* Toggle Button */
    .toggle-button {
      position: absolute;
      right: -20px; /* Position the button at the right edge of the sidebar */
      top: 50%; /* Center vertically */
      transform: translateY(-50%);
      width: 20px;
      height: 60px;
      background-color: #2c3e50;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 8px 8px 0; /* Rounded right edges */
      padding: 0;
      outline: none;
      z-index: 1001; /* Ensure the button is above the sidebar */
    }
    
    /* Arrow Styling */
    .arrow {
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid white; /* Arrow pointing to the right */
      transition: transform 0.3s ease;
    }
    
    .arrow-collapsed {
      transform: rotate(180deg); /* Arrow pointing to the left when sidebar is hidden */
    }
    
    /* Sidebar List Styling */
    ul {
      list-style-type: none;
      padding: 0;
    }
    
    li {
      padding: 15px;
      cursor: pointer;
    }
    
    li:hover {
      background-color: #34495e;
    }
    </style>
    
=======
<template>
  <div class="sidebar" :class="{ 'sidebar-hidden': !isVisible }">
    <button @click="$emit('toggle-sidebar')" class="toggle-button">
      {{ isVisible ? 'Hide' : 'Show' }} Sidebar
    </button>
    <ul>
      <li @click="selectItem('hydrolysis-indystry')">Институт Гидролизной Промышленности</li>
      <li @click="selectItem('vavilov')">Институт Растениеводства имени Вавилова</li>
      <li @click="selectItem('pavlov')">Институт Физиологии имени Павлова</li>
      <li @click="selectItem('pasteur')">Институт Эпидемиологии и Микробилогии имени Пастера</li>
      <li @click="selectItem('ioffe')">Ленинградский Физико-Технический Институт (имени Иоффе)</li>
      <li @click="selectItem('pediatric')">Ленинградский Педиатрический Институт</li>
      <li @click="selectItem('lor')">ЛОР НИИ</li>
      <li @click="selectItem('dzhanelidze')">НИИ Скорой Помощи (имени Джанелидзе)</li>
      <li @click="selectItem('radium')">Радиевый Институт</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    selectItem(item) {
      alert(`Selected: ${item}`);
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px; /* Fixed width for the sidebar */
  background-color: #2c3e50;
  color: white;
  height: calc(100vh - 60px); /* Full height minus header height */
  overflow-y: auto; /* Make the sidebar scrollable if content overflows */
  transition: transform 0.3s ease; /* Smooth transition for opening/closing */
}

.sidebar-hidden {
  transform: translateX(-250px); /* Hide the sidebar by moving it to the left */
}

.toggle-button {
  background-color: #34495e;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 15px;
  cursor: pointer;
}

li:hover {
  background-color: #34495e;
}
</style>
>>>>>>> 0156cc70de00d16e044e7dbf3d8f5417c0bdc862
