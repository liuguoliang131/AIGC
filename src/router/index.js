import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Index.vue'
import utils from '@/common/utils'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/aigc/chat',
    name: 'Chat',
    component: () => import('../views/AIGC/Chat.vue'),
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/aigc/draw',
    name: 'Draw',
    component: () => import('../views/AIGC/Draw.vue'),
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue'),
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('../views/Agreement/Index.vue'),
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/learn_center',
    name: 'LearnCenter',
    component: () => import('../views/LearnCenter/Index.vue'),
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/product_center',
    name: 'ProductCenter',
    component: () => import('../views/ProductCenter/ProductCenter.vue'),
    meta: {
      isAuthenticated: false
    }
    ,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


// 路由守卫
router.beforeEach((to, from, next) => {
  console.log('router', to, from)
  if (utils.getToken()) {
    return next()
  }

  if (to.name !== 'Login' && to.meta.isAuthenticated) next({ name: 'Login' })
  else next()
})

document.title = 'HANHOU·AIGC'

export default router
