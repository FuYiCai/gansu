<template>
  <div class="wrap" >
    <div class="flex justify-between">
      <p></p>
      <DownloadXlsx :dataSource="dataSource" />
    </div>
    <div style="flex:1;margin-top:10px;" ref="table_wrap">
      <a-table :columns="columns" bordered  
      @change="pageNumberOnChange"
        :loading="loading"  :data-source="data" :scroll="{ y: 400 }" 
  
      >
         <div slot="viewClickRate" slot-scope="scope">
            {{scope + '%'}} 
        </div>
     </a-table>
    </div>
  </div>
</template>
<script>
import DownloadXlsx from '@/components/Download_xlsx'  ;
import Myecharts  from '@/components/My_echarts' ;
import moment from 'moment';
import {breadcrumb_mixins,menuTabelMinxis} from '@/mixins/index' ;
import mySearch from '@/views/page_analyse/components/search' ;
const option = {
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
    ]
};
export default {
  mixins:[breadcrumb_mixins,menuTabelMinxis],
  provide(){
    return {
      me:this
    }
  },
  components:{
      Myecharts,
      mySearch,
      DownloadXlsx
  },
  data() {
     return {
        x:1500,
        y:500,
        data:[],
        loading:false,
        propsData:{},
        startTime:'',
        endTime:'',
        paramsObj:{selfFrom:'ri'},
        columns:[
          {
          title: '日期',
          dataIndex: 'dateTime',
          key: 'dateTime',
          },
          {
          title: '页面名称',
          dataIndex: 'tbName',
          key: 'tbName',
          },
          {
            title: '浏览量',
            dataIndex: 'pv',
            key: 'pv',
            sorter: (a, b) => a.pv - b.pv,
          },
          {
            title: '浏览量人数',
            dataIndex: 'uv',
            key: 'uv',
            sorter: (a, b) => a.uv - b.uv,
          },
          {
            title: '推荐位点击量总计',
            dataIndex: 'recommendClickCount',
            key: 'recommendClickCount',
            sorter: (a, b) => a.recommendClickCount - b.recommendClickCount,
            },
          {
            title: '浏览-点击转化率',
            dataIndex: 'viewClickRate',
            key: 'viewClickRate',
            scopedSlots: { customRender: 'viewClickRate' },
            sorter: (a, b) => a.viewClickRate - b.viewClickRate,
          },
        ],
    };
  },
  computed:{
    // 导出报表数据
    dataSource(){
        const len = this.data.length ;
        if(len){
            const tabel = [] ;
            const title = this.columns.map(item => item.title );
            for(let i=0;i<len;i++){}
            this.data.forEach((item,i) =>{
                const params = {
                    [title[0]]: item.dateTime,
                    [title[1]]: item.tbName,
                    [title[2]]: item.pv,
                    [title[3]]: item.uv,
                    [title[4]]: item.recommendClickCount,
                    [title[5]]: item.viewClickRate + '%',
                } ;
            tabel[i] = params ;
            })
            const inputmap = {
                ri:'日报详情',
                zhou:'周报详情',
                yue:'月报详情'
            }
            return {tabelName:inputmap[this.paramsObj.selfFrom],arr:tabel};
        }
            return {arr:[]}
    }
  },
  mounted() {
    console.log('this.$route.params',this.$route.params.scope);
    const scopeObj = this.$route.params.scope ;
    this.paramsObj = scopeObj ;
    if(scopeObj.selfFrom === 'zhou'){
      this.startTime = scopeObj.dateTime ;
      const ee = moment(scopeObj.dateTime).format('E') ;
      this.endTime = moment(ee).add(7 - start, 'days').format('YYYY-MM-DD');
    }
    if(scopeObj.selfFrom === 'yue') {
      const  [start,end] = [moment(moment(scopeObj.dateTime).format('YYYY-MM-01')), moment(moment(scopeObj.dateTime).add(1, 'months').format('YYYY-MM-01')).subtract(1, 'days')] ;
      this.startTime = start._i ;
      this.endTime  = end._i ;
    }
    if(scopeObj.selfFrom === 'ri') {
      this.startTime = this.endTime = scopeObj.dateTime ;
    }
    this.getPageviewdwmdata() ;
  },
  methods: {
    searchFn(){
      this.getPageviewdwmdata()
    },
    getTimesChange(e){
      console.log(e);
    },
    getPageviewdwmdata(){
      this.loading = true ;
      const {startTime,endTime} =this;
      this.$http(`pageviewdwmdata/page?startTime=${startTime}&endTime=${endTime}&size=10000`).then(res =>{
        this.loading = false ;
       this.data = res.data.data.records ;
      })
    },
    pageNumberOnChange(pageNumber) {
      console.log(pageNumber);
    },  


  },
};
</script>
<style scoped>
.wrap{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
</style>
