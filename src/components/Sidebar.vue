<script setup lang="ts">
    import type { Place } from '../types/Place.d'
    
    defineProps<{
      isVisible: boolean;
      places: Place[];
    }>();
    
    const emit = defineEmits<{
      (event: 'toggle-sidebar'): void;
      (event: 'select-place', place: Place): void;
    }>();
    
    const handlePlaceClick = (place: Place) => {
      emit('select-place', place);
    };
    </script>
    
    <template>
      <div class="sidebar-container" :class="{ 'sidebar-hidden': !isVisible }">
        <div class="sidebar">
          <ul>
            <li
              v-for="place in places"
              :key="place.id"
              @click="handlePlaceClick(place)"
            >
              {{ place.name }}
            </li>
          </ul>
        </div>
    
        <button @click="emit('toggle-sidebar')" class="toggle-button">
          <span class="arrow" :class="{ 'arrow-collapsed': isVisible }"></span>
        </button>
      </div>
    </template>
    
    <style scoped>
      /* TODO: tailwind.css */
    .sidebar-container {
      position: fixed;
      top: 60px;
      left: 0;
      z-index: 1000;
      transition: transform 0.3s ease;
    }
    
    .sidebar-hidden {
      transform: translateX(-250px);
    }
    
    .sidebar {
      width: 250px;
      background-color: #2c3e50;
      color: white;
      height: calc(100vh - 60px);
      overflow-y: auto;
    }
    
    .toggle-button {
      position: absolute;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 60px;
      background-color: #2c3e50;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0 8px 8px 0;
      padding: 0;
      outline: none;
      z-index: 1001;
    }
    
    .arrow {
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid white;
      transition: transform 0.3s ease;
    }
    
    .arrow-collapsed {
      transform: rotate(180deg);
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