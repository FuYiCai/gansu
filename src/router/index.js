import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home.vue'
import Not_find from '@/views/not_find/index.vue'
import Analyse_page from '@/views/page_analyse/page'
import Analyse_channer from '@/views/tv/channer'
import Analyse_sowing from '@/views/tv/sowing'

import Report_form_supplier_routing from '@/views/weekly_monthly/supplier_routing_report_forms'
import Report_form_trigger_order_forms from '@/views/weekly_monthly/trigger_order_forms'
import Detail_supplier_trigger from '@/views/weekly_monthly/detail_supplier_trigger'
import Page_visit_daily from '@/views/weekly_monthly/page_visit_form/daily'
import Page_visit_weekly from '@/views/weekly_monthly/page_visit_form/weekly'
import Page_visit_monthly from '@/views/weekly_monthly/page_visit_form/monthly'


Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

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
      {
        path: 'analyse/channer',
        component: Analyse_channer,
        name: 'Analyse_channer',
        meta: { title: '搜索热词' }
      },
      {
        path: 'analyse/sowing',
        component: Analyse_sowing ,
        name: 'Analyse_sowing',
        meta: { title: '搜索热词' }
      },
      {
        path: 'report_form/supplier_routing_report_forms',
        component: Report_form_supplier_routing,
        name: 'Report_form_supplier_routing',
        meta: { title: '供应商分账报表' }
      },
      {
        path: 'report_form/trigger_order_forms',
        component: Report_form_trigger_order_forms ,
        name: 'Report_form_trigger_order_forms',
        meta: { title: '触发订购报表' }
      },
      {
        path: 'detail_supplier_trigger',
        component: Detail_supplier_trigger ,
        name: 'Detail_supplier_trigger',
        meta: { title: '详情' }
      },
      {
        path: 'page_visit_weekly',
        component: Page_visit_weekly ,
        name: 'Page_visit_weekly',
        meta: { title: '页面访问周报' }
      },
      {
        path: 'page_visit_daily',
        component: Page_visit_daily ,
        name: 'Page_visit_daily',
        meta: { title: '页面访问日报' }
      },
      {
        path: 'page_visit_monthly',
        component: Page_visit_monthly ,
        name: 'Page_visit_monthly',
        meta: { title: '页面访问月报' }
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
