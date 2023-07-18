import {TOKEN,USER_INFO} from  './keys'
const utils = {}
utils.getToken = function () {
  return window.localStorage.getItem(TOKEN) || ''
}
utils.setToken = function (param) {
  window.localStorage.setItem(TOKEN, param)
}
utils.getUserInfo = function () {
  return window.localStorage.getItem(USER_INFO) || ''
}
utils.setUserInfo = function (param) {
  param = typeof param =='object'?JSON.stringify(param):param
  window.localStorage.setItem(USER_INFO, param)
}
utils.getStorageSync = function (k) {
  const val = window.localStorage.getItem(k) || ''
  return val
}

export default utils