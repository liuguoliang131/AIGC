import { createRouter, createWebHashHistory } from 'vue-router'
import routesMobile from './routesMobile'
import routesPC from './routesPC'
import utils from '@/common/utils'
import { useRouterConfigStore } from '@/store/routerConfigStore';
console.log('Router')

const routes = utils.isMobile() ? routesMobile : routesPC
console.log('routes', routes)
const router = createRouter({
  history: createWebHashHistory(),
  routes
})


// 路由守卫
router.beforeEach((to, from, next) => {
  const useRouterConfig = useRouterConfigStore();
  useRouterConfig.saveConfig({
    titleBar: to.meta.titleBar || false,
    currentPath: to.path
  })

  console.log('router', to, from)
  if (utils.getToken()) {
    return next()
  }

  if (to.name !== 'Login' && to.meta.isAuthenticated) {
    const query = JSON.parse(JSON.stringify(from.query))
    query.origin = to.path
    next({
      name: 'Login',
      query
    })
  }
  else {
    next()
  }
})

document.title = 'HANHOU·AI'

export default router
