import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const master = window.sessionStorage.masterMapItem ? JSON.parse(window.sessionStorage.masterMapItem) : false ;
export default new Vuex.Store({
  state: {
    master: master || {text:'移 动',key:'yidong'},
  },
  mutations: {
    changMaster (state, n) {
      state.master = n ;
      window.location.reload()
    }
  },
  actions: {
  },
  modules: {
  }
})
