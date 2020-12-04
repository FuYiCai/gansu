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
                <DownloadXlsx :dataSource="dataSource" style="margin-left:30px" text="导出"/>
            </div>
        </template>
        </mySearch>
        <!-- table -->
        <div class="flex" >
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
import {breadcrumb_mixins} from '@/mixins/index' ;
import mySearch from '@/views/page_analyse/components/search' ;
import moment from 'moment';
import DownloadXlsx from '@/components/Download_xlsx'

export default {
    mixins:[breadcrumb_mixins],
    components:{
        mySearch,
        DownloadXlsx
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
                    title: '曝光量',
                    dataIndex: 'exposureCount',
                    key: 'exposureCount',
                },
                {
                    title: '点击量',
                    dataIndex: 'clickCount',
                    key: 'clickCount',
                },
                {
                    title: '转化率',
                    dataIndex: 'inversionRate',
                    key: 'inversionRate',
                },
                {
                    title: '曝光人数',
                    dataIndex: 'exposureViewersCount',
                    key: 'exposureViewersCount',
                },
                {
                    title: '点击人数',
                    dataIndex: 'clickViewersCount',
                    key: 'clickViewersCount',
                },
                 {
                    title: '人均转化率',
                    dataIndex: 'inversionRateAvg',
                    key: 'inversionRateAvg',
                },
                 {
                    title: '人均曝光量',
                    dataIndex: 'exposureAvg',
                    key: 'exposureAvg',
                },
                 {
                    title: '人均点击量',
                    dataIndex: 'clickAvg',
                    key: 'clickAvg',
                },
                { title: 'Action', dataIndex: '', key: 'x',align:'center', scopedSlots: { customRender: 'action' } },
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
                    // 重置tab
                    this.$refs.mySearch.inputValue = '' ;
                    this.startTime = this.endTime = "" ;
                    this.$refs.mySearch.pickerRange = " " ;
                }
                this.pageviewdwmdataFn()
            }
        }
    },
    computed:{
        // 导出报表数据
        dataSource(){
            const len = this.tableData.length ;
            if(len){
                const tabel = [] ;
                const title = this.columns.map(item => item.title !== 'Action'? item.title : '');
                for(let i=0;i<len;i++){}
                this.tableData.forEach((item,i) =>{
                    const params = {
                        [title[0]]: item.uv,
                        [title[1]]: item.pv,
                        [title[2]]: item.recommendClickCount,
                        [title[3]]: item.viewClickRate,
                    } ;
                tabel[i] = params ;
                })
                const inputmap = {
                    ri:'日报名称',
                    zhou:'周报名称',
                    yue:'月报名称'
                }
                return {tabelName:inputmap[this.radioGroupValue],arr:tabel};
            }
                return {arr:[]}
        }
    },
    mounted(){
        
    },
    methods: {
        getTimesChange(e){
            console.log('eeeee',e);
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
            this.pageviewdwmdataFn()
        },
        lookDetail(){
            const obj = this.router.name ? this.router : {name:'Detail_supplier_trigger'} ;
            this.$router.push(obj)
        },
        // 切换tab
        radioGroupChange({target}) {
            const {value} = target ;
            this.radioGroupValue = value ;
        },
        // 查询
        query(){
            if(this.$refs.mySearch.pickerRange){
               [this.startTime,this.endTime] = this.$refs.mySearch.pickerRange ;
            }
            if(this.$refs.mySearch.inputValue || this.$refs.mySearch.pickerRange) {
                this.pageviewdwmdataFn()
            }
 
        },
        // 请求数据
        pageviewdwmdataFn() {
          //  日周月报（d:日报,w:周报,m:月报）
            const {radioGroupValue,size,startTime,endTime } = this; 
            const inputValue = this.$refs.mySearch && this.$refs.mySearch.inputValue || "" ;

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

            //  传空后台会报错
            const tbName = inputValue ? '&tbName=${inputValue}' : ' ';
            this.$http.get(`recommendlocationdwmdata/page?endTime=${endTime}&startTime=${startTime}&isDwm=${isDwm[radioGroupValue]}&size=${size}&sysId=${this.$store.getters.masterType}${tbName}`).then(res =>{

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