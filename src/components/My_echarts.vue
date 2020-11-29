<template>
    <div :ref="id" :style="{width:width , height: height}"></div>
</template>
<script>
export default {
    props:{
        id:{
            type:String,
            default:'myChart'
        },
        width:{
            type:String,
            default:'300px'
        },
        height:{
            type:String,
            default:'300px'
        },
    },
    methods:{
        init(option){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(this.$refs[this.id])
            // 绘制图表
            myChart.setOption(option);
        }
    }
}
</script>