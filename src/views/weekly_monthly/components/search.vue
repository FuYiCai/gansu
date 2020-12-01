<template>
    <a-row type="flex" justify="space-between" style="margin-bottom:10px">
      <a-col  :span="16">
        <template v-if="inputVisibel">
        {{inputText}} <a-input placeholder="请输入关键字" v-model="inputValue" style="width:15%" /> 

        <a-button @click="query" style="margin-left:10px" type="primary"> 查询 </a-button>
        </template>

      </a-col>
      <a-col :span="3"> 
         <slot name="right" > <DownloadXlsx /> </slot>
      </a-col>
    </a-row>
</template>
<script>
import DownloadXlsx from '@/components/Download_xlsx'
export default {
    components:{
        DownloadXlsx
    },
    props:{
        inputText:{
            type:String,
            default:'页面标题：'
        },
        inputVisibel:{
            type:Boolean,
            default:true
        },
    },
    data() {
        return {
           inputValue:""
        }
    },
    methods: {
      query(){
          this.$emit('search')
      },
    }
}
</script>