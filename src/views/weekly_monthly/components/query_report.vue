<template>
   <div>
     <mySearch :inputVisibel="inputVisibel" 
     :rangePickerVisibel="rangePickerVisibel"
     :inputText="inputText"
     @search="query"
      :timesArrVisibel="timesArrVisibel">
        <template  v-slot:right>
          <div class="flex">
              <a-button>趋势</a-button>
              <a-button style="margin-left:30px">导出</a-button>
          </div>
      </template>
     </mySearch>
    <div class="flex" >
      <a-table :columns="columns" :data-source="tableData" :scroll="{ y: 440 }"
      :loading="loading"
       >
        <div slot="action" slot-scope="scope">
           <a-button style="margin:20px" @click="lookDetail">查看详情</a-button>
           <a-button  style="margin:20px 0" @click="exportExcel">下载报表</a-button>
        </div>
      </a-table>
    </div>
   
   </div>
</template>
<script>
import FileSaver from 'file-saver' ;
import XLSX from 'xlsx' ;
import {breadcrumb_mixins} from '@/mixins/index' ;
import mySearch from '@/views/page_analyse/components/search' ;

const columns = [
  {
    title: '年月',
    dataIndex: 'name',
    key: 'name',
    width:100,
  },
  {
    title: '统计日期范围',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Action',
    align:'center',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
const data = [
  {
    key: '1',
    name: '202010',
    date: '20201001~20201030',
  },
  {
    key: '2',
    name: 'Jim Green',
    date: 42,
  },
];

export default {
  mixins:[breadcrumb_mixins],
  components:{
    mySearch
  },
  props:{
    router:{
      type:Object,
      default: function (){
        return {}
      }
    },
    loading:{
      type:Boolean,
      default:false
    },
    timesArrVisibel:Boolean,
    rangePickerVisibel:Boolean,
    inputVisibel:Boolean,
    tableData:Array,
    columns:Array,
    inputText:String
  },
  data() {
    return {
  
    }
  },
  methods: {
    onChangeMonth(e){
      console.log(e);
    },
    query(v){
      this.$emit('search',v)
    },
    lookDetail(){
        const obj = this.router.name ? this.router : {name:'Detail_supplier_trigger'} ;
        this.$router.push(obj)
    },
  },
}
</script>