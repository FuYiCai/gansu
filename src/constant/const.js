const menuData = [
    {key:'实时监控',title:'实时监控',icon:'bulb',
    arr:[{key:'Analyse_page5',value:'总览'},{key:'Analyse_recommen1',value:'直播收视'},{key:'Analyse_order_source',value:'点播收视'}]
},
    {key:'行为分析',title:'行为分析',icon:'fund',
    arr:[{key:'Analyse_page',value:'页面分析'},{key:'Analyse_recommen',value:'推荐位分析'},{key:'Analyse_hot_word',value:'搜索热词'}]
},
    {key:'收视分析',title:'收视分析',icon:'radar-chart',
    arr:[{key:'Analyse_page3',value:'频道直播分析'},{key:'Analyse_recommen3',value:'点播节目分析'},{key:'Analyse_hot_word',value:'搜索热词'}]
},
    {key:'周报月报',title:'周报月报',icon:'radar-chart',
        arr:[{key:'Analyse_page2',value:'供应商分账报表'},{key:'Analyse_recommen4',value:'触发订购报表',
        arr: [
            {key:'页面访问报表',title:'页面访问报表',icon:'radar-chart',arr:[{key:'Analyse_page1',value:'页面访问日报'},{key:'Analyse_recommen1',value:'页面访问周报'},{key:'Analyse_recommen1',value:'页面访问月报'}] },
            {key:'推荐位报表',title:'推荐位报表',icon:'radar-chart',arr:[{key:'Analyse_page12',value:'推荐位日报'},{key:'Analyse_recommen2',value:'推荐位周报'},{key:'Analyse_recommen2',value:'推荐位月报'}] },
        ]
    }]},
]

//  就面包屑用到,有更好想法自己替换
const rootSubmenuKeys = ['实时监控', '行为分析', '收视分析','周报月报'] ;
const openKeys = ['实时监控'] ;


export {
    menuData,
    rootSubmenuKeys,
    openKeys
}