import { createRouter, createWebHashHistory } from 'vue-router'
import routesMobile from './routesMobile'
import routesPC from './routesPC'
import utils from '@/common/utils'
import { useRouterConfigStore } from '@/store/routerConfigStore';
import { closeToast, showToast } from 'vant';
console.log('Router')
const isMoBible = utils.isMobile()
const routes = isMoBible ? routesMobile : routesPC
console.log('routes', routes)
const router = createRouter({
  history: createWebHashHistory(),
  routes
})


// 路由守卫
router.beforeEach((to, from, next) => {
  if (isMoBible) {
    showToast({
      duration: 0,
      forbidClick: true,
      type: "loading",
      message: "加载中",
    });
  }

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

router.afterEach(() => {
  if (isMoBible) {
    closeToast()
  }
})

document.title = '憨猴·AI'

export default router
