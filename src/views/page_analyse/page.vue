<template>
  <div class="wrap" >
    <a-row type="flex" justify="space-between" style="margin-bottom:10px">
      <a-col :span="22">
          页面标题： <a-input placeholder="Basic usage" style="width:15%" /> 
         营运商：
           <a-select default-value="lucy" style="width: 120px" @change="handleChange">
            <a-select-option value="jack">
                Jack
            </a-select-option>
            <a-select-option value="lucy">
                Lucy
            </a-select-option>
            <a-select-option value="disabled" disabled>
                Disabled
            </a-select-option>
            <a-select-option value="Yiminghe">
                yiminghe
            </a-select-option>
            </a-select> 
       <a-button type="link" size="small"> 本周 </a-button>
       <a-button type="link" size="small"> 本月 </a-button>
       <a-button type="link" size="small"> 上月 </a-button>
       <a-range-picker @change="onChangeRange" style="width:25%" />
        <a-button style="margin-left:10px" type="primary"> 查询 </a-button>
    </a-col>
      <a-col :span="2"> 
         <a-button>导出报表</a-button>
      </a-col>
    </a-row>
    <!-- table -->
    <div style="flex:1;margin-top:10px;" ref="table_wrap">
        <a-table :columns="columns" bordered
         :loading="loading"  :data-source="data" :scroll="{ x: x, y: y }" :pagination="false" 
   
        >
        <a slot="action" slot-scope="text">
            <a-button type="link" @click="showModal" > 趋势分析 </a-button>
            <a-button type="link" > 详情数据 </a-button>
        </a>
     </a-table>
    </div>
    <div class="flex justify-between align-center" style="margin-top:10px">
        <div>共 400 条记录 第 1 / 80 页</div>
        <a-pagination show-quick-jumper :default-current="2" :total="500" @change="pageNumberOnChange" />
    </div>
    <a-modal :width="600" v-model="visible" title=" " @ok="handleOk">
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
    age: 32,
    address: `London Park no. ${i}`,
  });
}
import Myecharts  from '@/components/My_echarts' ;
const option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
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
 components:{
     Myecharts
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
        this.$refs.myEcharts.drawLine(option)
    })
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    onChangeRange(date,dateString) {
        console.log(date, dateString);
    },
    pageNumberOnChange(pageNumber) {
      console.log('Page: ', pageNumber);
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
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
