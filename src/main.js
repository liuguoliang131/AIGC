import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/rem'
import ElementPlus,{ElLoadingDirective,
  ElInfiniteScrollDirective,} from 'element-plus'
import 'element-plus/dist/index.css'
const vueApp = createApp(App)
vueApp.use(ElementPlus)
vueApp.directive('loading', ElLoadingDirective)
vueApp.directive('infinite-scroll',ElInfiniteScrollDirective)
vueApp.use(store).use(router).mount('#app')
