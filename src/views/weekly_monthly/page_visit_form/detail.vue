<template>
  <div>
    <mySearch :inputVisibel="false" />
    <!-- table -->
    <div style="flex: 1; margin-top: 10px" ref="table_wrap">
      <a-table
        :columns="columns"
        bordered
        @change="pageNumberOnChange"
        :loading="loading"
        :data-source="data"
        :scroll="{ x: x, y: y }"
      >

      </a-table>
    </div>
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

import {breadcrumb_mixins} from '@/mixins/index' ;
import mySearch from "@/views/weekly_monthly/components/search";
export default {
  mixins:[breadcrumb_mixins],
  components: {
    mySearch,
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

  },
};
</script>