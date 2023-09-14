import { TOKEN, USER_INFO } from './keys'
import router from '../router/index'
console.log('utils')



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


// 返回上一页
utils.goBack = () => {
  const routes = router.getRoutes()
  if (routes.length < 2) {
    router.push({
      path: '/',
      replace: true
    })
  } else {
    router.go(-1)
  }
}

export default utils