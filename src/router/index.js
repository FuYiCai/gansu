import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Analyse_page from '@/views/page_analyse/page'
import Not_find from '../views/not_find/index.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'analyse/page',
        component: Analyse_page,
        name: 'Analyse_page',
        meta: { title: '页面分析' }
      },
      {
        path: 'analyse/recommen',
        component: () => import('@/views/page_analyse/recommen'),
        name: 'Analyse_recommen',
        meta: { title: '推荐位分析' }
      },
      {
        path: 'analyse/order_source',
        component: () => import('@/views/page_analyse/order_source'),
        name: 'Analyse_order_source',
        meta: { title: 'order_source' }
      },
      {
        path: 'analyse/hot_word',
        component: () => import('@/views/page_analyse/hot_word'),
        name: 'Analyse_hot_word',
        meta: { title: '搜索热词' }
      },
    ]
  },
  {
    path: "*",
    component: Not_find,
    name: "NotFind",
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('logInfo')) next({ name: 'Login' })
  else next()
})
export default router
