import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// import store from './store'
import './common/rem'
import {
  ElLoading,
  ElInfiniteScroll
} from 'element-plus'
import 'element-plus/dist/index.css'
import 'vant/lib/index.css';

if (process.env.VUE_APP_SELF_ENV === 'prod') {
  window.console.log = function () { };
}

const pinia = createPinia()
const vueApp = createApp(App)
vueApp.directive('loading', ElLoading)
vueApp.directive('InfiniteScroll', ElInfiniteScroll)
vueApp.use(pinia)
vueApp.use(router).mount('#app')
