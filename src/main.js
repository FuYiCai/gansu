import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/index'
import axios from './config/axios'

import userAgent from './assets/lib/userAgent'


if(userAgent(window.navigator.userAgent) !== -1) {
  window.confirm('暂不支持浏览器为IE内核，请下载其它浏览器，例如火狐、360、谷歌等等') ;
  window.location = "http://www.mozilla.org";
}


import echarts from 'echarts' ;
Vue.prototype.$echarts = echarts ;
Vue.prototype.$http = axios ;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
