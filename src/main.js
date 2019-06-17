import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss'
// import { localStorage } from '@/utils'

// 导航守卫
router.beforeEach((to, from, next) => {
  if (store.state.token || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
