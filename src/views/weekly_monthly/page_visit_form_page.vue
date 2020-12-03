<template>
  <div>
    <a-radio-group default-value="ri" button-style="solid" 
    @change="radioGroupChange"
     style="margin-bottom:20px">
      <a-radio-button value="ri"> 日报 </a-radio-button>
      <a-radio-button value="zhou"> 周报 </a-radio-button>
      <a-radio-button value="yue"> 月报 </a-radio-button>
    </a-radio-group>
    
    <queryReport :inputVisibel="inputVisibel"  :rangePickerVisibel="rangePickerVisibel"
    :timesArrVisibel="timesArrVisibel"
    :columns="columns"
    :tableData="tableData"
    :loading="loading"
     />
  </div>
</template>
<script>
import queryReport from '@/views/weekly_monthly/components/query_report' ;
export default {
    components:{
        queryReport
    },
    data() {
        return {
            radioGroupValue:'ri',
            inputVisibel : false,
            rangePickerVisibel : true ,
            timesArrVisibel : true ,
            size:10,
            loading:false,
            tableData:[],
            columns:[
                {
                    title: '日期',
                    dataIndex: 'dt',
                    key: 'dt',
                },
                {
                    title: '浏览量',
                    dataIndex: 'pv',
                    key: 'pv',
                },
                {
                    title: '浏览量人数',
                    dataIndex: 'uv',
                    key: 'uv',
                },
                {
                    title: '推荐位点击量总计',
                    dataIndex: 'recommendClickCount',
                    key: 'recommendClickCount',
                },
                {
                    title: '浏览-点击转化率',
                    dataIndex: 'viewClickRate',
                    key: 'viewClickRate',
                },
            ]
        }
    },
    watch:{
        radioGroupValue:{
            immediate:true,
            handler:function(v){
                if(v === 'ri'){
                    this.inputVisibel = false;
                    this.rangePickerVisibel = true ;
                    this.timesArrVisibel = true ;
                }else{
                    this.rangePickerVisibel = false ;
                    this.timesArrVisibel = false ;
                    this.inputVisibel = true;
                }
                this.pageviewdwmdataFn(v)
            }
        }
    },
    mounted(){
        
    },
    methods: {
        radioGroupChange({target}) {
            const {value} = target ;
            this.radioGroupValue = value ;
        },
        pageviewdwmdataFn(v) {
          //  日周月报（d:日报,w:周报,m:月报）
            this.loading = true ;
            const  isDwm = {
                ri:'d',
                zhou:'w',
                yue:'m'
            }
            this.$http.get(`pageviewdwmdata/page?isDwm=${isDwm[v]}&size=${10}&sysId=${this.$store.getters.masterType}`).then(res =>{

                console.log('dowm,',res);
                 res.data.data.records.forEach(item => item.viewClickRate = item.viewClickRate + '%') ;
                this.tableData =res.data.data.records;
                this.loading = false ;

            })
        }
    },
}
</script>