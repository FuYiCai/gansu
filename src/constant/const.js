const menuData = [
    {key:'实时监控',title:'实时监控',icon:'bulb',
    arr:[{key:'Real_time_overview',value:'总览'},{key:'Real_time_live_streaming',value:'直播收视'},{key:'Real_time_spaced_sowing',value:'点播收视'}]
},
    {key:'行为分析',title:'行为分析',icon:'fund',
    arr:[{key:'Analyse_page',value:'页面分析'},{key:'Analyse_recommen',value:'推荐位分析'},{key:'Analyse_hot_word',value:'搜索热词'}]
},
    {key:'收视分析',title:'收视分析',icon:'radar-chart',
    arr:[{key:'Analyse_channer',value:'频道直播分析'},{key:'Analyse_sowing',value:'点播节目分析'}]
},
    {key:'周报月报',title:'周报月报',icon:'aliwangwang',
        arr:[{key:'Report_form_supplier_routing',value:'供应商分账报表'},{key:'Report_form_trigger_order_forms',value:'触发订购报表',
        arr: [
            {key:'页面访问报表',title:'页面访问报表',icon:'radar-chart',
            arr:[{key:'Page_visit_daily',value:'页面访问日报'},{key:'Page_visit_weekly',value:'页面访问周报'},{key:'Page_visit_monthly',value:'页面访问月报'}] 
            },
            {key:'推荐位报表',title:'推荐位报表',icon:'radar-chart',
            arr:[{key:'Recommend_daily',value:'推荐位日报'},{key:'Recommend_weekly',value:'推荐位周报'},{key:'Recommend_monthly',value:'推荐位月报'}] 
            },
        ]
    }]},
]

//  就面包屑用到menu组件第一级有一个就加一个,有更好想法自己替换
const rootSubmenuKeys = ['实时监控', '行为分析', '收视分析','周报月报'] ;
const openKeys = ['实时监控'] ;

const masterMap = [
    {text:'移 动',key:'yidong'},
    {text:'联 通',key:'liantong'},
    {text:'电 信',key:'dianxing'},
]



export {
    menuData,
    rootSubmenuKeys,
    openKeys,
    masterMap
}