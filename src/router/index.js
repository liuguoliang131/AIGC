import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/AIGC/Chat.vue'
import utils from '@/common/utils'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      isAuthenticated:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component:()=>import('../views/Login/Login.vue'),
    meta: {
      isAuthenticated:false
    }
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component:()=>import('../views/Agreement/Index.vue'),
    meta: {
      isAuthenticated:false
    }
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
