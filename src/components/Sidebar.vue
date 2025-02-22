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