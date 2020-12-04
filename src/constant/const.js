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
        arr:[{key:'Report_form_supplier_routing',value:'供应商分账报表'},{key:'Report_form_trigger_order_forms',value:'触发订购报表'},
        {key:'Page_visit_form_page',value:'页面访问报表'},
        {key:'Recommend_form_page',value:'推荐位报表'}
    ]},
]

//  就面包屑用到menu组件第一级有一个就加一个,有更好想法自己替换
const rootSubmenuKeys = ['实时监控', '行为分析', '收视分析','周报月报'] ;
const openKeys = ['实时监控'] ;

const masterMap = [
    {text:'移 动',key:'yidong'},
    {text:'联 通',key:'liantong'},
    {text:'电 信',key:'dianxing'},
]

const broken_line = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    // title
    // legend: {
    //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    // },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    // 保存图片
    // toolbox: {
    //     feature: {
    //         saveAsImage: {}
    //     }
    // },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ],
    dataZoom: {
        show: true,
        realtime: true,
        y: 36,
        height: 20,
        start: 20,
        end: 80
  }
};

export {
    menuData,
    rootSubmenuKeys,
    openKeys,
    masterMap,
    broken_line
}