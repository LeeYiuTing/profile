import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PhotoWall from '../components/PhotoWall.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/photo', component: PhotoWall }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 