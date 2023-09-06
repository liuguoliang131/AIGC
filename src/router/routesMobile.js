import Home from '../viewsMobile/Home/Index.vue'
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
    component: () => import('../viewsMobile/Login/Login.vue'),
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('../viewsMobile/Agreement/Index.vue'),
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/learn_center',
    name: 'LearnCenter',
    component: () => import('../viewsMobile/LearnCenter/Index.vue'),
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/learn_center/player',
    name: 'Player',
    component: () => import('../viewsMobile/LearnCenter/Player.vue'),
    meta: {
      title: 'AI对话课程',
      isAuthenticated: true
    }
  },
  {
    path: '/product_center',
    name: 'ProductCenter',
    component: () => import('../viewsMobile/ProductCenter/ProductCenter.vue'),
    meta: {
      isAuthenticated: false
    },
  },
]

export default routes