
<template>
  <div>
    <div>
         <mySearch ref="mySearch" @search="query"  :dataSource="dataSource"
          inputText="页面名称"
          @getTimesChange="getTimesChange" />
        <!-- table -->
        <div class="flex" >
            <a-table :columns="columns" :data-source="data" :scroll="{ y: 440 }"
            :loading="loading"
            >
                <div slot="action" slot-scope="scope">
                    <a-button style="margin:10px" @click="open(scope)">趋势分析</a-button>
                    <a-button style="margin:10px" @click="lookDetail(scope)">详细数据</a-button>
                </div>
            </a-table>
        </div>
   </div>
   <!--  -->
    <myModal ref="myModal">
      <MyEcharts/>
    </myModal>
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
import myModal from '@/views/page_analyse/components/modal'
import {removeItem} from '@/assets/lib/index'

export default {
    mixins:[breadcrumb_mixins],
    components:{
        mySearch,
        DownloadXlsx,
        MyEcharts,
        myModal
    },
    data() {
        return {
 
            inputVisibel : false,
            rangePickerVisibel : true ,
            timesArrVisibel : true ,
            size:1000,
            loading:false,
            startTime:'',
            endTime:'',
            data:[],
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

    computed:{
        // 导出报表数据
        dataSource(){
            const len = this.data.length ;
            if(len){
                const tabel = [] ;
                const title = this.columns.map(item => item.title !== 'Action'? item.title : '');
                for(let i=0;i<len;i++){}
                this.data.forEach((item,i) =>{
                    const params = {
                        [title[0]]: item.uv,
                        [title[1]]: item.pv,
                        [title[2]]: item.recommendClickCount,
                        [title[3]]: item.viewClickRate,
                    } ;
                tabel[i] = params ;
                })

                return {tabelName:'页面分析',arr:tabel};
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
        open(){
          this.visible = true ;
          
          this.$refs.myModal.getMenuItem(removeItem(this.columns,['页面名称','Action','日期'],'title'))
          this.$refs.myModal.showModal()

        },
        // 趋势
        showModal() {
            this.$message.loading('加载中....', 0);
            broken_line.xAxis.data = this.data.map(item => item.dateTime) ;
            const nameArr = ['浏览量','浏览量人数','推荐位点击量总计'] ;
            const nameArrKey = ['pv','uv','recommendClickCount'] ;
            broken_line.series = nameArr.map((item,i) =>{
                return {
                    name: item,
                    type: 'line',
                    stack: '总量',
                    data: this.data.map(item => item[nameArrKey[i]])
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
            this.$router.push({name:'Detail_supplier_trigger',params:{scope}})
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
            const {size,startTime,endTime } = this; 
            const inputValue = this.$refs.mySearch && this.$refs.mySearch.inputValue || "" ;

            this.loading = true ;

            //  传空后台会报错
            const tbName = inputValue ?   `&tbName=${inputValue}` : ' ';
            this.$http.get(`pageviewdwmdata/page?endTime=${endTime}&startTime=${startTime}&size=${size}&sysId=${this.$store.getters.masterType}${tbName}`).then(res =>{

                console.log('dowm,',res);
                res.data.data.records.forEach(item => item.viewClickRate = item.viewClickRate + '%') ;
                this.data =res.data.data.records;
                this.loading = false ;
            }).catch(err =>{
                this.loading = false ;
            })
        }
    },
}
</script>