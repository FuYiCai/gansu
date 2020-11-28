import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
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
        path: 'analyse',
        component: () => import('@/views/pageAnalyse/index'),
        name: 'Analyse',
        meta: { title: 'analyse', icon: 'analyse',  }
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
