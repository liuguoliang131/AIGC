import axios from 'axios'
// 环境变量
// console.log('环境变量', process.env.VUE_APP_ENV) // dev test prod
import {
  _getSign
} from './sign.js'

import utils from '../common/utils'
import {router} from 'vue-router'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 20000,
  headers: {
    sys:'',
    token:'',
    version:'',
    timestamp:'',
    sign: ''
  }
})

// 添加请求拦截器
instance.interceptors.request.use(async (config) => {
  console.log(config)
  const sign = await _getSign(config.headers)
  // 在发送请求之前做些什么
  config.headers = {
    ...config.headers,
    ...sign
  }
  if (process.env.VUE_APP_ENV === 'dev' && config.mock) {
    config.baseURL = `/mock/${config.mock}`
  }
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      ...sign
    }
  } else if (config.method === 'post') {
    config.data = {
      ...config.data,
      ...sign
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('响应拦截器', response.data)
  if (response.data.code === 1000) {
    utils.setUserInfo('')
    utils.setToken('')
    router.replace({
      path: '/login'
    })
  }
  return response.data
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error)
})
export default instance
