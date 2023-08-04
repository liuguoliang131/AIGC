import axios from 'axios'
// 环境变量
// console.log('环境变量', process.env.VUE_APP_SELF_ENV) // dev test prod
import {
  _getSign
} from './sign.js'

import utils from '../common/utils'
import router from '../router/index'
import {ElMessage} from 'element-plus'



const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 20000,
  headers: {
    sys:'',
    token:'',
    version:'',
    timestamp:'',
    sign: '',
    'x-token':''
  }
})

// 添加请求拦截器
instance.interceptors.request.use(async (config) => {
  console.log('request',config)
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
  console.log('request error',error)
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('响应拦截器', response.data)
  if (response.data.code === 1000) {
    utils.setToken('')
    utils.setUserInfo('')
    router.push({
      path: '/',
      replace:true
    })
    window.history.go(0)
  }
  return response.data
}, function (error) {
  // 对响应错误做点什么
  if(error.response.status == 500){
    ElMessage({
      message: '网络连接中断，请检查您的网络并重试。',
      type:'error'
    })
  }
  return Promise.reject(error)
})

const request = {
  get(url, params) {
    return instance.get(url, { params });
  },
  post(url, data) {
    return instance.post(url, data);
  },
};

export default request
