import Home from '../viewsMobile/Home/Index.vue'
import HanHouQAOuter from '../viewsMobile/demo/HanHouQA.vue'
import HanHouQADemo from '../viewsMobile/demo/HanHouQA_demo.vue'
import HanHouQAOld from '../viewsMobile/demo/HanHouQA_old.vue'
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
    path: '/hanhouQA',
    name: 'hanhouQA',
    component: HanHouQAOld,
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/hanHouQANew',
    name: 'hanHouQANew',
    component: HanHouQADemo,
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/hsQA',
    name: 'hsQA',
    component: HanHouQAOuter,
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/lldqQA',
    name: 'lldqQA',
    component: HanHouQAOuter,
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/zsQA',
    name: 'zsQA',
    component: HanHouQAOuter,
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/lmhQA',
    name: 'lmhQA',
    component: HanHouQAOuter,
    meta: {
      isAuthenticated: false
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    children: [
      {
        path: '/chat',
        name: 'Chat',
        component: () => import('../viewsMobile/Chat/Chat.vue'),
        meta: {
          isAuthenticated: true
        }
      },
      {
        path: '/chat/history',
        name: 'ChatHistory',
        component: () => import('../viewsMobile/Chat/ChatHistory.vue'),
        meta: {
          isAuthenticated: true,
          title: '我的对话'
        }
      },
    ]
  },
  {
    path: '/draw',
    name: 'Draw',
    children: [
      {
        path: '/draw',
        name: 'Draw',
        component: () => import('../viewsMobile/Draw/Draw.vue'),
        meta: {
          isAuthenticated: true
        }
      },
      {
        path: '/draw/result',
        name: 'DrawResult',
        component: () => import('../viewsMobile/Draw/DrawResult.vue'),
        meta: {
          isAuthenticated: true
        }
      },
      {
        path: '/draw/history',
        name: 'DrawHistory',
        component: () => import('../viewsMobile/Draw/DrawHistory.vue'),
        meta: {
          isAuthenticated: true,
          title: '绘画记录'
        }
      },
    ]
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
  {
    path: '/buy_member',
    name: 'BuyMember',
    component: () => import('../viewsMobile/BuyMember/Index.vue'),
    meta: {
      title: '购买会员',
      isAuthenticated: false
    },
  },
]

export default routes