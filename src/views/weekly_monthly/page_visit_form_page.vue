<template>
  <div>
    <a-radio-group default-value="ri" button-style="solid" 
    @change="radioGroupChange"
     style="margin-bottom:20px">
      <a-radio-button value="ri"> 日报 </a-radio-button>
      <a-radio-button value="zhou"> 周报 </a-radio-button>
      <a-radio-button value="yue"> 月报 </a-radio-button>
    </a-radio-group>
    
    <div>
        <mySearch
        ref="mySearch"
        :inputVisibel="inputVisibel" 
        :rangePickerVisibel="rangePickerVisibel"
        :inputText="inputText"
        @search="query"
        @getTimesChange="getTimesChange"
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
  </div>
</template>
<script>
import FileSaver from 'file-saver' ;
import XLSX from 'xlsx' ;
import {breadcrumb_mixins} from '@/mixins/index' ;
import mySearch from '@/views/page_analyse/components/search' ;
import moment from 'moment';

export default {
    mixins:[breadcrumb_mixins],
    components:{
        mySearch
    },
    data() {
        return {
            radioGroupValue:'ri',
            inputVisibel : false,
            rangePickerVisibel : true ,
            timesArrVisibel : true ,
            size:1000,
            loading:false,
            startTime:'',
            endTime:'',
            tableData:[],
            inputText:'',
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
                if(this.$refs.mySearch) {
                    this.$refs.mySearch.inputValue = '' ;
                    this.startTime = this.endTime = ""
                }
                this.pageviewdwmdataFn()
            }
        }
    },
    mounted(){
        
    },
    methods: {
        getTimesChange(e){
            console.log('eeeee',e);
            if( typeof e === "string"){
                this.startTime = this.endTime =  e.split('T')[0];
            }else{
                const [start,end] = e ;
                this.startTime = start._i ;
                this.endTime = end._i;
            }
            this.pageviewdwmdataFn()
        },
        lookDetail(){
            const obj = this.router.name ? this.router : {name:'Detail_supplier_trigger'} ;
            this.$router.push(obj)
        },
        radioGroupChange({target}) {
            const {value} = target ;
            this.radioGroupValue = value ;
        },
        query(){
            if(this.$refs.mySearch.inputValue) {
                this.pageviewdwmdataFn()
            }
        },
        pageviewdwmdataFn() {
          //  日周月报（d:日报,w:周报,m:月报）
            const {radioGroupValue,size,startTime,endTime } = this; 
            const inputValue = this.$refs.mySearch.inputValue || "" ;
            console.log('inputValue',inputValue);
            this.loading = true ;
            const  isDwm = {
                ri:'d',
                zhou:'w',
                yue:'m'
            }
            const inputmap = {
                ri:'日报名称',
                zhou:'周报名称',
                yue:'月报名称'
            }
            this.inputText = inputmap[radioGroupValue];
            const url = inputValue ? `pageviewdwmdata/page?endTime=${endTime}&startTime=${startTime}&tbName=${inputValue}&isDwm=${isDwm[radioGroupValue]}&size=${size}&sysId=${this.$store.getters.masterType}` :  `pageviewdwmdata/page?endTime=${endTime}&startTime=${startTime}&isDwm=${isDwm[radioGroupValue]}&size=${size}&sysId=${this.$store.getters.masterType}` ;
            this.$http.get(url).then(res =>{

                console.log('dowm,',res);
                res.data.data.records.forEach(item => item.viewClickRate = item.viewClickRate + '%') ;
                this.tableData =res.data.data.records;
                this.loading = false ;
            }).catch(err =>{
                this.loading = false ;
            })
        }
    },
}
</script>