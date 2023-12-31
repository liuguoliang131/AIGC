import { TOKEN, USER_INFO } from './keys'
import router from '../router/index'


const keys = ['drawHistoryItem', 'residueQAQuantity', 'hanhou-ai-pc-token', 'hanhou-ai-pc-userInfo', 'activeTagId']

const utils = {}

// k:String 键名  j:Boolean 是否序列化
utils.getStorageSync = function (k, j = false) {
  let val = window.localStorage.getItem(k)
  if (j) {
    val = val ? JSON.parse(val) : ''
  }
  return val
}

utils.setStorageSync = function (k, v) {
  v = typeof v == 'object' ? JSON.stringify(v) : v
  window.localStorage.setItem(k, v)
}

// 获取token
utils.getToken = function () {
  return utils.getStorageSync(TOKEN) || ''
}
// 储存token
utils.setToken = function (param) {
  utils.setStorageSync(TOKEN, param)
}
// 获取登陆接口返回信息
utils.getUserInfo = function () {
  return utils.getStorageSync(USER_INFO, true)
}
// 储存登录接口返回信息
utils.setUserInfo = function (param) {
  utils.setStorageSync(USER_INFO, param)
}

// 清除所有账号信息
utils.clearAll = function () {
  try {
    keys.forEach(k => {
      window.localStorage.removeItem(k)
    })
    const { useUserStore, useChatStore, useDrawStore } = window.piniaStore
    const userStore = useUserStore()
    const chatStore = useChatStore()
    const drawStore = useDrawStore()
    userStore.clearLog()
    chatStore.saveActiveTagId(0)
    drawStore.clearHistoryItem()
  } catch (error) {
    throw error
  }
}


// 去登录页
utils.goLogin = function () {

  const current = router.currentRoute.value
  const query = JSON.parse(JSON.stringify(current.query))
  query.origin = current.path

  router.push({
    path: '/login',
    query
  })
}

// 登录+跳回
utils.loginAfter = function (data) {
  console.log(router)
  utils.setToken(data.token);
  utils.setUserInfo(data);

  const current = router.currentRoute.value
  const query = JSON.parse(JSON.stringify(current.query))
  const path = query.origin || '/'
  delete query.origin

  router.push({
    path,
    query
  })
}


// 判断浏览器是否是移动设备
utils.isMobile = function () {
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
}

// 判断浏览器是否是微信浏览器
utils.isWechat = function () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/micromessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

// 判断设备是否为ios
utils.isIOS = function () {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua);
}


// 返回上一页
utils.goBack = () => {
  const backPath = window.history.state.back
  if (backPath === null) {
    router.push({
      path: '/'
    })
  } else {
    router.go(-1)
  }
}


export default utils