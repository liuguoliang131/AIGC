import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/AIGC/Chat.vue'
import Login from '../views/Login/Login.vue'
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
    component:Login,
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

export default router
