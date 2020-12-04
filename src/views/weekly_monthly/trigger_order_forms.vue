<template>
  <div>
    <a-radio-group default-value="a" button-style="solid">
      <a-radio-button value="a">
        周报
      </a-radio-button>
      <a-radio-button value="b">
        月报
      </a-radio-button>
    </a-radio-group>
    <div style="margin-top:20px">
       周报名称： <a-input placeholder="请输入关键字"  allow-clear v-model="inputValue" style="width:15%" /> <a-button>查询</a-button>
        <!-- table -->
        <div class="flex" style="margin-top:20px">
            <a-table :columns="columns" :data-source="tableData" :scroll="{ y: 440 }"
            :loading="loading"
            >
                <div slot="action" slot-scope="scope">
                    <a-button style="margin:20px" @click="lookDetail(scope)">查看详情</a-button>
                    <DownloadXlsx :dataSource="dataSource" style="margin:20px 0" text="下载报表"/>

                </div>
            </a-table>
        </div>
   </div>

  </div>
</template>
<script>
import FileSaver from 'file-saver' ;
import XLSX from 'xlsx' ;
import moment from 'moment';
import DownloadXlsx from '@/components/Download_xlsx'  ;
import { broken_line } from '@/constant/const'

export default{
  data() {
    return {
      inputValue:'',
      tableData:[],
      loading:false,
      columns : [
      {
        title: '周报名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Action',
        align:'center',
        key: 'action',
        scopedSlots: { customRender: 'action' },
      },
    ]
    }
  },
  mounted() {
    this.getOrderdwmdata()
  },
  methods:{
    getOrderdwmdata(){
      this.$http.get(`orderdwmdata/page?sysId=${this.$store.getters.masterType}&size=1000`).then(res =>{
        console.log('getOrderdwmdata',res);
      })
    }
  }
}

</script>