<template>
    <div>
        <header class="flex justify-between">
            <div class="flex align-center">
                <div class="zwyHot" style="--color:rgba(255, 25, 25, 0.6);">
                    <div class="start-up zwyHover1" style="--count:infinite;" >
                        <span  style="--count:infinite;"  class="title zwyHover1">今日开机数</span>
                        <span class="zwyHover1" style="font-size:20px;--count:infinite;">665432 <sub>台</sub></span>
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
                <p class="flex flex-column zwyHover2" style="--color:#ff0081;--count:infinite;">
                    <span class="title">月度总观看时长</span>
                    <span class="zwyHover1"  style="font-size:25px;color:#000;--count:infinite;"> 3.1 <sub>万小时</sub></span>
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

.zwyHot {
	position: relative;
	--color: rgba(0, 0, 0, 0.15);
}

.zwyHot::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	border-radius: 50%;
	animation: shockwave 3s 0.5s ease-out infinite;
}

.zwyHot::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	border-radius: 50%;
	animation: shockwave 3s 0.65s ease-out infinite;
}
@keyframes shockwave {
	0% {
		-webkit-transform: scale(1);
		transform: scale(1);
		box-shadow: 0 0 2px var(--color), inset 0 0 1px var(--color);
		opacity: 1;
	}

	95% {
		box-shadow: 0 0 50px var(--color), inset 0 0 30px var(--color);
		opacity: 0;
	}

	100% {
		-webkit-transform: scale(2.25);
		transform: scale(2.25);
		opacity: 0;
	}
}


@keyframes zwyHover1 {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(0.9);
	}

	100% {
		transform: scale(1);
	}
}

.zwyHover1 {
	--count: infinite;
	animation: zwyHover1 1.5s var(--count) !important;
}

.zwyHover2 {
	z-index: 999;
	position: relative;
	--color: #ff0081;
	--count: infinite;
}
.zwyHover2::before,
.zwyHover2::after {
	position: absolute;
	content: '';
	display: block;
	width: 140%;
	height: 100%;
	left: -20%;
	z-index: -1000;
	transition: all ease-in-out 0.5s;
	background-repeat: no-repeat;
}

.zwyHover2::before {
	top: -55%;
	background-image: radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, transparent 20%, var(--color) 20%, transparent 30%), radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, transparent 10%, var(--color) 15%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%);
	background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
	animation: topBubbles ease-in-out 0.75s var(--count);
	display: block;
}

.zwyHover2::after {
	bottom: -55%;
	background-image: radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, transparent 10%, var(--color) 15%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%), radial-gradient(circle, var(--color) 20%, transparent 20%);
	background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
	display: block;
	animation: bottomBubbles ease-in-out 0.75s var(--count);
}

@keyframes topBubbles {
	0% {
		background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
		background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
	}

	50% {
		background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
		background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
	}

	100% {
		background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
		background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
	}
}

@keyframes bottomBubbles {
	0% {
		background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
		background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
	}

	50% {
		background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
		background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
	}

	100% {
		background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
		background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
	}
}

</style>