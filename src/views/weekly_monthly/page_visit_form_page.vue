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
                <a-button @click="showModal">趋势</a-button>
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
   <!--  -->
    <a-modal :width="600" v-model="visible" 
    :footer="null"
    :closable="false">
        <MyEcharts ref="myEcharts" />
     </a-modal>
  </div>
</template>
<script>
import FileSaver from 'file-saver' ;
import XLSX from 'xlsx' ;
import {breadcrumb_mixins} from '@/mixins/index' ;
import mySearch from '@/views/page_analyse/components/search' ;
import moment from 'moment';
import DownloadXlsx from '@/components/Download_xlsx'  ;
import MyEcharts from '@/components/My_echarts' ;
import { broken_line } from '@/constant/const'

export default {
    mixins:[breadcrumb_mixins],
    components:{
        mySearch,
        DownloadXlsx,
        MyEcharts
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
            visible:false,
            columns:[
                {
                    title: '日期',
                    dataIndex: 'dateTime',
                    key: 'dateTime',
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
        // 趋势
        showModal() {
            this.$message.loading('加载中....', 0);
            broken_line.xAxis.data = this.tableData.map(item => item.dateTime) ;
            const nameArr = ['浏览量','浏览量人数','推荐位点击量总计'] ;
            const nameArrKey = ['pv','uv','recommendClickCount'] ;
            broken_line.series = nameArr.map((item,i) =>{
                return {
                    name: item,
                    type: 'line',
                    stack: '总量',
                    data: this.tableData.map(item => item[nameArrKey[i]])
                }
            })
            this.visible = true;
            setTimeout(()=>{
                this.$nextTick(()=>{
                this.$message.destroy()
                this.$refs.myEcharts.init(broken_line)
                })
            }, 1500);
        },
        lookDetail(scope){
            scope.selfFrom = this.radioGroupValue;
            this.$router.push({name:'Detail_supplier_trigger',params:{scope}})
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
            const tbName = inputValue ?   `&tbName=${inputValue}` : ' ';
            this.$http.get(`pageviewdwmdata/page?endTime=${endTime}&startTime=${startTime}&isDwm=${isDwm[radioGroupValue]}&size=${size}&sysId=${this.$store.getters.masterType}${tbName}`).then(res =>{

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