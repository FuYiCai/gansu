<template>
    <div>
        <header class="flex justify-between">
            <div class="flex align-center">
                <div >
                    <div class="start-up "  >
                        <span    class="title ">今日开机数</span>
                        <span style="font-size:20px;">665432 <sub>台</sub></span>
                    </div>
                </div>
                <Myecharts width="200px" height="200px"  id="headRin" ref="headRin" />
            </div>
            <div style="align-self:flex-end " class="flex">
                <p class="flex flex-column">
                    <span class="title">今日开机数</span>
                    <span style="font-size:25px;color:#000">665432 <sub>台</sub></span>
                </p>
                <p class="flex flex-column" style="margin:0  50px">
                    <span class="title">户日均观看时长</span>
                    <span style="font-size:25px;color:#000">230  <sub>分钟</sub></span>
                </p>
                <p class="flex flex-column " >
                    <span class="title">月度总观看时长</span>
                    <span  style="font-size:25px;color:#000;"> 3.1 <sub>万小时</sub></span>
                </p>
            </div>
        </header>
        <div class="flex justify-between" style="width:95%">
            <Myecharts width="45%" height="300px"  id="realTime" ref="realTime" />
            <Myecharts width="50%" height="300px"  id="per" ref="per" />
        </div>
    </div>
</template>
<script>
import Myecharts  from '@/components/My_echarts' ;

// 饼图
const option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    // legend: {
    //     orient: 'vertical',
    //     left: 10,
    //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    // },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            itemStyle: {
                normal:{
                    color:function(params) {
                    //自定义颜色
                    const colorList = [  '#1890ff', '#d9d9d9',  ];
                        return colorList[params.dataIndex]
                    }
                }
            },
            data: [
                {value: 335, name: '实时活跃人数'},
                {value: 310, name: ' '},

            ]
        }
    ]
};
// 折线图
const option1 = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },

    legend: {
        x: 'left',
        y: 'top',
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    color: ['#1890ff', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463'],
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
      
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        
    ],
    dataZoom: {
        show: true,
        realtime: true,
        y: 36,
        height: 20,
        start: 20,
        end: 80
  }
};
export default {
    name:"HomeHeader",
    components:{
        Myecharts
    },
 
    mounted(){
        this.$refs.headRin.init(option) ;
        this.$refs.realTime.init(option1) ;
        this.$refs.per.init(option1) ;
    },
}
</script>
<style lang="scss" scope>
$main-color:#1890ff;
$grey:#999;
.start-up{
    display: inline-flex;
    flex-direction: column;
    height: 150px;
    width: 150px;
    justify-content: center;
    align-items: center;
    border: 1px solid $main-color;
    border-radius: 50%;
    color: #000;
}
.title{
    color: $grey;
}



</style>