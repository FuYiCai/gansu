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
     />
  </div>
</template>
<script>
import queryReport from '@/views/weekly_monthly/components/query_report'
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
            }
        }
    },
    methods: {
        radioGroupChange({target}) {
            const {value} = target
            console.log(value);
            this.radioGroupValue = value ;
        },
        
    },
}
</script>