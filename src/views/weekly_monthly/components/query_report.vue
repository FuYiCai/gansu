<template>
   <div>
      <a-row type="flex"  style="margin-bottom:10px">
      <a-col :span="6">
          年月 <a-month-picker placeholder="请选择年月" @change="onChangeMonth" />

        <a-button @click="query" style="margin-left:10px" type="primary"> 查询 </a-button>
      </a-col>
    </a-row>
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
        this.$router.push({name:'Detail_supplier_trigger'})
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