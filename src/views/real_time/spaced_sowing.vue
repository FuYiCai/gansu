<template>
  <div class="wrap" >
    <!-- table -->
    <div class="flex align-center">
        今日实时节目数据总计
        <a-button style="margin-left:auto" @click="showModal" type="primary">分析趋势</a-button>
    </div>
    <div style="flex:1;margin-top:10px;" ref="table_wrap">
        <a-table :columns="columns" bordered  
        @change="pageNumberOnChange"
         :loading="loading"  :data-source="data" :scroll="{ x: x, y: y }" 
   
        >
        <!-- <a slot="action" slot-scope="obj">
            <a-button type="link" @click="showModal(obj)" > 趋势分析 </a-button>
            <a-button type="link" > 详情数据 </a-button>
        </a> -->
     </a-table>
    </div>

    <a-modal :width="700" v-model="visible" 
    :footer="null"
    :closable="false">

        <Myecharts ref="myEcharts" />
    </a-modal>



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
//   { title: 'Column 8', dataIndex: 'address', key: '8',},  //没有width 默认站位剩下全部
//   {
//     title: 'Action',
//     key: 'operation',
//     fixed: 'right',
//     align:'center',
//     width: 200,
//     scopedSlots: { customRender: 'action' },
//   },
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


import {breadcrumb_mixins} from '@/mixins/index' ;
const option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },

    legend: {
        x: 'left',
        y: 'top',
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
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
  const data1 = [];
export default {
  mixins:[breadcrumb_mixins],
  provide(){
    return {
      me:this
    }
  },
  components:{
      Myecharts,
  },
  data() {
     return {
        x:1500,
        y:500,
        data,
        columns,
        loading:false,
        visible: false,
    };
  },
  mounted() {
    this.$nextTick(()=>{
        const {width,height} = window.getComputedStyle(this.$refs.table_wrap) ;
        this.x = parseInt(width) ;
        this.y = parseInt(height) - 40;
    })
  },
  methods: {

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
    showModal() {
      this.visible = true;
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
