<template>
  <div class="wrap" >
    <mySearch ref="mySearch"
     inputText="频道名称:"
     :dataSource="dataSource"
     @search="searchFn" @getTimesChange="getTimesChange" />
    <!-- table -->
    <div style="flex:1;margin-top:10px;" ref="table_wrap">
        <a-table :columns="columns" bordered  
        @change="pageNumberOnChange"
         :loading="loading"  :data-source="data" :scroll="{ x: x, y: y }" 
   
        >
        <a slot="action" slot-scope="obj">
            <a-button type="link" @click="showModal(obj)" > 趋势分析 </a-button>
            <a-button type="link" @click="lookdetail"> 详情数据 </a-button>
        </a>
     </a-table>
    </div>
    <!-- <div class="flex justify-between align-center" style="margin-top:10px">
        <div>共 500 条记录 第 {{currentPage}} / 50 页</div>
        <a-pagination show-quick-jumper :default-current="currentPage" :total="500" @change="pageNumberOnChange" />
    </div> -->
     <myModal ref="showModal" >
        <Myecharts  ref="myEcharts" />
    </myModal>
  </div>
</template>
<script>
const columns = [
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' ,
  sorter: (a, b) => {
            // a,b就是数据Data
        return a.age - b.age ;
   },
  },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8',},
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    align:'center',
    width: 200,
    scopedSlots: { customRender: 'action' },
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: i,
    address: `London Park no. ${i}`,
  });
}
import Myecharts  from '@/components/My_echarts' ;


import {breadcrumb_mixins,menuTabelMinxis} from '@/mixins/index' ;
import mySearch from '@/views/page_analyse/components/search' ;
import myModal from '@/views/page_analyse/components/modal' ;
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
  const data1 = [];
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
      myModal
  },
  data() {
     return {
        x:1500,
        y:450,
        data:[],
        endTime:'',startTime:'',
        columns:[
           { title: '频道名称', dataIndex: 'chName', key: 'chName' },
           { title: '频道分组', dataIndex: 'chGroup', key: 'chGroup' },
           { title: '收视人数', dataIndex: 'chViewersCount', key: 'chViewersCount' },
           { title: '收视次数', dataIndex: 'chCount', key: 'chCount' },
           { title: '收视时长', dataIndex: 'chTime', key: 'chTime' },
           { title: '收视份额(人数占比)', dataIndex: 'chViewersRate', key: 'chViewersRate' },
           { title: '收视份额(次数占比)', dataIndex: 'chCountRate', key: 'chCountRate' },
           { title: '收视份额(时长占比)', dataIndex: 'chTimeRate', key: 'chTimeRate' },
           {
            title: 'Action',
            fixed: 'right',
            align:'center',
            width: 200,
            scopedSlots: { customRender: 'action' },
          },
        ],
        loading:false,
        visible: false,
    };
  },
    computed:{
      // 导出报表数据
      dataSource(){
          const len = this.data.length ;
          if(len){
              const tabel = [] ;
              const title = this.columns.map(item => item.title !== 'Action'? item.title : '');
              for(let i=0;i<len;i++){}
              this.data.forEach((item,i) =>{
                  const params = {
                      [title[0]]: item.chName,
                      [title[1]]: item.chGroup,
                      [title[2]]: item.chViewersCount,
                      [title[3]]: item.chCount,
                      [title[4]]: item.chTime,
                      [title[5]]: item.chViewersRate,
                      [title[6]]: item.chCountRate,
                      [title[7]]: item.chTimeRate,
                  } ;
              tabel[i] = params ;
              })
              return {tabelName:'频道分析',arr:tabel};
          }
              return {arr:[]}
      }
  },
  mounted() {
    this.getChanneltvdata()
  },
  methods: {
    getTimesChange(e){
        //  日
        if( typeof e === "string"){
            this.startTime = this.endTime =  e.split('T')[0];
            // 周
        }else if(Array.isArray(e) && typeof e[0] === "string"){
            const [start,end] = e ;
            this.startTime = start ;
            this.endTime = end;
            // 月
        }else{
            const [start,end] = e ;
            this.startTime = start._i ;
            this.endTime = end._i;
        }
        this.getChanneltvdata()
    },
    lookdetail(){
      this.$router.push({name: 'Page_visit_detail'})
    },   
    searchFn(){
      if(this.$refs.mySearch.pickerRange){
            [this.startTime,this.endTime] = this.$refs.mySearch.pickerRange ;
        }
        if(this.$refs.mySearch.inputValue || this.$refs.mySearch.pickerRange) {
            this.getChanneltvdata()
        }
    },
    //  
    getChanneltvdata(){
      const inputValue = this.$refs.mySearch && this.$refs.mySearch.inputValue || "" ;
      const {endTime,startTime} = this;
      const url = inputValue? `&chName=${inputValue}` : ''
      this.$http.get(`channeltvdata/page?&size=1000&sysId=${this.$store.getters.masterType}&endTime=${endTime}&startTime=${startTime}${url}`).then(res => {
        console.log('res',res);
        this.data = res.data.data.records ;
      })
    },
    pageNumberOnChange(pageNumber) {
      console.log('Page: ', pageNumber);
      
      const {current, pageSize} = pageNumber ;
      if(data1.length !== 0)return ;
      // HTTP ... this.loading = true ;
      for (let i = 101; i < 200; i++) {
        data1.push({
          key: i,
          name: `101 ${i}`,
          age: i,
          address: `London Park no. ${i}`,
        });
      }
      // this.loading = false ;
      this.data =  this.data.concat(data1) ;
    },
    showModal(obj) {
      this.$refs.showModal.showModal();
      this.$message.loading('加载中....', 0);
      setTimeout(()=>{
        this.$nextTick(()=>{
          this.$message.destroy()
          this.$refs.myEcharts.init(option)
        })
      }, 1500);
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
