import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/index'
import axios from './config/axios'

import echarts from 'echarts' ;
Vue.prototype.$echarts = echarts ;
Vue.prototype.$http = axios ;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
