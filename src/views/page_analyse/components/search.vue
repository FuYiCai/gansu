<template>
    <a-row type="flex" justify="space-between" style="margin-bottom:10px">
      <a-col  :span="16">
          <template v-if="inputVisibel">
            {{inputText}} <a-input placeholder="请输入关键字"  allow-clear v-model="inputValue" style="width:15%" /> 
          </template>
         <slot />
        <template v-if="timesArrVisibel">
          <a-button type="link" size="small" @click="getTimes('day')"> 今日 </a-button>
          <a-button type="link" size="small" @click="getTimes('zhou')"> 本周 </a-button>
          <a-button type="link" size="small" @click="getTimes('benYue')"> 本月 </a-button>
          <a-button type="link" size="small" @click="getTimes('shangYue')"> 上月 </a-button>
        </template>
        <a-range-picker v-if="rangePickerVisibel" @change="onChangePickerRange" style="width:25%" />
        <a-button @click="query" style="margin-left:10px" type="primary"> 查询 </a-button>
      </a-col>
      <a-col :span="3"> 
         <slot name="right" > <DownloadXlsx  :dataSource="dataSource" /> </slot>
      </a-col>
    </a-row>
</template>
<script>
import moment from 'moment';
import DownloadXlsx from '@/components/Download_xlsx'
export default {
    components:{
        DownloadXlsx
    },
    props:{
        dataSource:{
            type:Object,
            default:function(){
              return {tabelName:'test',arr:[]}
            }
        },
        inputText:{
            type:String,
            default:'页面标题：'
        },
        timesArrVisibel:{
            type:Boolean,
            default:true
        },
        rangePickerVisibel:{
            type:Boolean,
            default:true
        },
        inputVisibel:{
            type:Boolean,
            default:true
        },
    },
    inject:['me'],
    data() {
        return {
           inputValue:"",
           pickerRange:''
        }
    },
    methods: {
      onChangePickerRange(date,dateString) {
        // console.log(date, dateString);
        this.pickerRange = dateString
      },
      query(){ 
        this.$emit('search',this.inputValue)
      },
      getTimes(date){
          const map = {
            day:  moment().format(),
            zhou : [moment().day(7).subtract(6, 'days').format('YYYY-MM-DD'), moment().day(7).format('YYYY-MM-DD')] ,
            benYue : [moment(moment().format('YYYY-MM-01')), moment(moment().add(1, 'months').format('YYYY-MM-01')).subtract(1, 'days')],
            shangYue :  [moment(moment().subtract(1, 'months').format('YYYY-MM-01')), moment(moment().format('YYYY-MM-01')).subtract(1, 'days')]
          }
          this.$emit('getTimesChange', map[date])
      },

    }
}
</script>