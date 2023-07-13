import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/aigc/chat',
    name: 'AIGC',
    component: () => import('../views/AIGC/Chat.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
