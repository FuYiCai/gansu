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
import Page_visit_form_page from '@/views/weekly_monthly/page_visit_form_page'
import Recommend_form_page from '@/views/weekly_monthly/recommend_form_page'


import Page_visit_detail from '@/views/weekly_monthly/page_visit_form/detail'
import Recommend_detail from '@/views/weekly_monthly/recommend_form/detail'

import Real_time_overview from '@/views/real_time/overview'
import Real_time_live_streaming from '@/views/real_time/live_streaming'
import Real_time_spaced_sowing from '@/views/real_time/spaced_sowing'



// ！！ 新增menu一级菜单时 记得去constant目录配置跳转路由

Vue.use(VueRouter) ;

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
    redirect: { name: 'Real_time_overview' },
    children: [
      {
        path: 'real_time_overview',
        component: Real_time_overview,
        name: 'Real_time_overview',
        meta: { title: '总览' }
      },
      {
        path: 'real_time_live_streaming',
        component: Real_time_live_streaming,
        name: 'Real_time_live_streaming',
        meta: { title: '直播收视' }
      },
      {
        path: 'real_time_spaced_sowing',
        component: Real_time_spaced_sowing,
        name: 'Real_time_spaced_sowing',
        meta: { title: '点播收视' }
      },
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
        path: 'analyse/hot_word',
        component: () => import('@/views/page_analyse/hot_word'),
        name: 'Analyse_hot_word',
        meta: { title: '搜索热词' }
      },
      {
        path: 'analyse/channer',
        component: Analyse_channer,
        name: 'Analyse_channer',
        meta: { title: '频道直播分析' }
      },
      {
        path: 'analyse/sowing',
        component: Analyse_sowing ,
        name: 'Analyse_sowing',
        meta: { title: '点播节目分析' }
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
        path: 'page_visit_form',
        component: Page_visit_form_page ,
        name: 'Page_visit_form_page',
        meta: { title: '页面访问报表' }
      },
      {
        path: 'page_visit_detail',
        component: Page_visit_detail ,
        name: 'Page_visit_detail',
        meta: { title: '页面访问详情' }
      },
      {
        path: 'recommend_form',
        component: Recommend_form_page ,
        name: 'Recommend_form_page',
        meta: { title: '推荐位报表' }
      },
      {
        path: 'recommend_detail',
        component: Recommend_detail ,
        name: 'Recommend_detail',
        meta: { title: '推荐位详情' }
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
