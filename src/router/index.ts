import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue'
import ArticleView from '../views/ArticleView.vue'
import NewPlaceView from '../views/NewPlaceView.vue'

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
    {
      path: '/place/new',
      name: 'newPlace',
      component: NewPlaceView,
    },
  ],
})

export default router
