import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import './common/rem'
import {ElLoading,
  ElInfiniteScroll} from 'element-plus'
import 'element-plus/dist/index.css'
const vueApp = createApp(App)
vueApp.directive('loading', ElLoading)
vueApp.directive('InfiniteScroll',ElInfiniteScroll)
vueApp.use(router).mount('#app')
