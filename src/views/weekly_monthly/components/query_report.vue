<template>
   <div>
     <mySearch :inputVisibel="false" >
        <template  v-slot:right>
          <div class="flex">
              <a-button>趋势</a-button>
              <a-button style="margin-left:30px">导出</a-button>
          </div>
      </template>
     </mySearch>
    <div class="flex">
      <a-table :columns="columns" :data-source="data" style="width:35%" >
        <a slot="name" slot-scope="text">{{ text }}222</a>
      </a-table>
      <a-button style="margin:20px" @click="lookDetail">查看详情</a-button>
      <a-button  style="margin:20px 0" @click="exportExcel">下载报表</a-button>
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
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '统计日期范围',
    dataIndex: 'date',
    key: 'date',
    width: 80,
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
  {
    key: '3',
    name: 'Joe Black',
    date: 32,
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
      default:() =>{}
    }
  },
  data() {
    return {
      data,
      columns,

    }
  },
  methods: {
    onChangeMonth(e){
      console.log(e);
    },
    query(){

    },
    lookDetail(){
        const obj = this.router.name ? this.router : {name:'Detail_supplier_trigger'} ;
        this.$router.push(obj)
    },
    exportExcel() {
      var xlsxParam = { raw: true };//转换成excel时，使用原始的格式
      var wb = XLSX.utils.table_to_book(document.querySelector("#outTable"),xlsxParam);//outTable为列表id
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  },
}
</script>