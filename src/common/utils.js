import { TOKEN, USER_INFO } from './keys'
import router from '../router/index'
console.log('utils')



const utils = {}

// k:String 键名  j:Boolean 是否序列化
utils.getStorageSync = function (k,j=false) {
  let val = window.localStorage.getItem(k)
  if (j) {
    val = val ? JSON.parse(val):''
  }
  return val
}

utils.setStorageSync = function (k, v) {
  v = typeof v =='object'?JSON.stringify(v):v
  window.localStorage.setItem(k,v)
}

// 获取token
utils.getToken = function () {
  return utils.getStorageSync(TOKEN)||''
}
// 储存token
utils.setToken = function (param) {
  utils.setStorageSync(TOKEN,param)
}
// 获取登陆接口返回信息
utils.getUserInfo = function () {
  return utils.getStorageSync(USER_INFO,true)
}
// 储存登录接口返回信息
utils.setUserInfo = function (param) {
  utils.setStorageSync(USER_INFO,param)
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

export default utils