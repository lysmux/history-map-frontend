<script setup lang="ts">
  defineProps<{
    isSidebarVisible: boolean;
  }>();
  
  const emit = defineEmits<{
    (event: 'toggle-sidebar'): void;
  }>();
  </script>
  
  <template>
    <div class="z-1000 flex justify-between items-center shadow-xl px-10 py-3 bg-slate-200">
      <!-- ITMO Logo -->
      <a href="https://itmo.ru">
        <img src="@/assets/itmo-logo-dark.svg" alt="ITMO logo" class="w-30" />
      </a>
  
      <!-- Title -->
      <span class="text-xl font-bold">Наука блокадного Ленинграда</span>
  
      <!-- Toggle Button -->
      <button @click="emit('toggle-sidebar')" class="sidebar-toggle">
        {{ isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar' }}
      </button>
    </div>
  </template>
  
  <style scoped>
  .sidebar-toggle {
    background-color: #4a6fa5;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .sidebar-toggle:hover {
    background-color: #3b5a8a;
  }
  </style>