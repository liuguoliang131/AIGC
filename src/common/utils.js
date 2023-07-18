import {TOKEN,USER_INFO} from  './keys'
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
  return utils.getStorageSync(USER_INFO)
}
// 储存登录接口返回信息
utils.setUserInfo = function (param) {
  utils.setStorageSync(USER_INFO,param)
}


export default utils