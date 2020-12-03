import Vue from 'vue'
import Vuex from 'vuex'
import { Modal } from 'ant-design-vue';

Vue.use(Vuex)
const  countDown = () => {
  let secondsToGo = 3;
  const modal = Modal.success({
    title: '切换中,请稍后',
    content: `资源加载中... ${secondsToGo} `,
  });
  const interval = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `资源加载中... ${secondsToGo} `,
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
    window.location.reload() ;
    modal.destroy();
  }, secondsToGo * 1000);
};
const master = window.sessionStorage.masterMapItem ? JSON.parse(window.sessionStorage.masterMapItem) : false ;


export default new Vuex.Store({
  state: {
    master: master || {text:'移 动',key:'yidong'},
  },
  getters:{
    masterType: state => {
      // 运营商（t:电信,u:联通,m:移动,a:全部数据,不分运营商）;
       const map =  {
          yidong:'m',
          liantong:'u',
          dianxing:'t'
      }
      const type = map[state.master.key] ? map[state.master.key] : 'a' ;
      return type ;
    }
  },
  mutations: {
    changMaster (state, n) {
      state.master = n ;
      countDown()
    }
  },
  actions: {
  },
  modules: {
  }
})
