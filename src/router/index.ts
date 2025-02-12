import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue'
import ArticleView from '../views/ArticleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'map',
      component: MapView,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleView,
    },
  ],
})

export default router
