import {TOKEN} from  './keys'
const utils = {}
utils.getToken = function () {
  return window.localStorage.getItem(TOKEN) || ''
}
utils.setToken = function (param) {
  window.localStorage.setItem(TOKEN, param)
}
utils.getStorageSync = function (k) {
  const val = window.localStorage.getItem(k) || ''
  return val
}

export default utils