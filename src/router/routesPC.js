import Home from '../views/Home/Index.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      titleBar: true,
      isAuthenticated: false
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat/Chat.vue'),
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: '/draw',
    name: 'Draw',
    component: () => import('../views/Draw/Draw.vue'),
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
      titleBar: true,
      isAuthenticated: false
    }
  },
  {
    path: '/learn_center',
    name: 'LearnCenter',
    component: () => import('../views/LearnCenter/Index.vue'),
    meta: {
      titleBar: true,
      isAuthenticated: true
    }
  },
  {
    path: '/learn_center/player',
    name: 'Player',
    component: () => import('../views/LearnCenter/Player.vue'),
    meta: {
      titleBar: true,
      isAuthenticated: true
    }
  },
  {
    path: '/product_center',
    name: 'ProductCenter',
    component: () => import('../views/ProductCenter/ProductCenter.vue'),
    meta: {
      titleBar: true,
      isAuthenticated: false
    },
  }
]

export default routes