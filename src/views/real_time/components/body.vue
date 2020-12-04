<template>
    <div>
        <a-radio-group default-value="a" button-style="solid" style="margin-top:20px">
            <a-radio-button value="a">   今日实时    </a-radio-button>
            <a-radio-button value="b">  上周  </a-radio-button>
            <a-radio-button value="c">  上月  </a-radio-button>
        </a-radio-group>
        <h3 style="margin-top:20px">EPG热力图</h3>
        <div class="flex justify-between" style="width:100%;margin-bottom:20px">
          <!--    EPG热力图   -->
            <div class="frame-wrap">
                    
               <div id="container">
                <div 
                v-for="(item, index) in hotImg" :key="index"
                :class="['griditem', 'grid-' + (index + 1)]" > 
                    <div class="grid-img" style="width:100%;height:100%">
                        <img  :src="item" alt="" width="100%" height="100%">
                        <span  :class="['grid-img-span','blur'+index]"  >56465465646565</span>
                    </div>
                </div>   
               </div>
            </div>





            <!--  -->
            <div  class="content1">
                <span class="title-text">推荐位点击量排名</span>
                <div class="flex justify-between">
                    <p>排名</p>
                    <p>推荐位名称</p>
                    <p>上游页面名称</p>
                    <p>下游页面名称</p>
                    <p>点击量</p>
                </div>
                <vueSeamlessScroll :data="listData" :class-option="optionHover" class="seamless-warp" >
                    <ul class="item">
                        <li v-for="(item,index) in listData" :key="index" class="itemli">
                            <span  v-text="index"></span>
                            <span  v-text="item.title"></span>
                            <span  v-text="item.pfsbmc"></span>
                            <span  v-text="item.jcdmc"></span>
                        </li>
                    </ul>
                </vueSeamlessScroll>
            </div>
        </div>


        <!--  -->
        <h3 style="margin-top:20px">页面访问量</h3>
        <div class="flex justify-between" style="width:100%;margin-bottom:20px">
            <Myecharts width="60%" height="300px"  id="trend" ref="trend" />
            <div  class="content1">
                <span class="title-text">页面访问排名</span>
                <vueSeamlessScroll :data="listData" :class-option="optionHover" class="seamless-warp">
                    <ul class="item">
                        <li v-for="(item,index) in listData" :key="index" class="itemli">
                            <span  v-text="item.title"></span>
                            <span  v-text="item.pfsbmc"></span>
                            <span  v-text="item.jcdmc"></span>
                        </li>
                    </ul>
                </vueSeamlessScroll>
            </div>
        </div>
        <!--  -->
        <div class="flex">
            <div style="width:40%;padding-right:30px">
                <p class="title-text" style="padding-bottom:15px;border-bottom:1px solid #999;">收视占比（时长份额）</p>
                <Myecharts width="92%" height="400px"  id="tvGuide" ref="tvGuide" />
            </div>
            <div style="width:30%;padding-right:30px">
                <p class="title-text" style="padding-bottom:15px;border-bottom:1px solid #999;">收视排名</p>
                 <a-radio-group default-value="a" button-style="solid" style="margin-bottom:10px">
                    <a-radio-button value="a">   直播    </a-radio-button>
                    <a-radio-button value="b">  点播  </a-radio-button>
                </a-radio-group>
                <vueSeamlessScroll :data="listData" :class-option="optionHover" class="seamless-warp">
                    <ul class="item">
                        <li v-for="(item,index) in listData" :key="index" class="itemli">
                            <span  v-text="item.title"></span>
                            <span  v-text="item.pfsbmc"></span>
                            <span  v-text="item.jcdmc"></span>
                        </li>
                    </ul>
                </vueSeamlessScroll>
            </div>
            <div style="width:30%;">
                <p class="title-text" style="padding-bottom:15px;border-bottom:1px solid #999;">频道分组-收视排名</p>
                <a-dropdown style="margin-bottom:10px">
                    <a-menu slot="overlay" @click="handleMenuClick">
                        <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
                        <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
                        <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
                    </a-menu>
                    <a-button > 央视 <a-icon type="down" /> </a-button>
                </a-dropdown>
                <vueSeamlessScroll :data="listData" :class-option="optionHover" class="seamless-warp">
                    <ul class="item">
                        <li v-for="(item,index) in listData" :key="index" class="itemli">
                            <span  v-text="item.title"></span>
                            <span   v-text="item.pfsbmc"></span>
                            <span  v-text="item.jcdmc"></span>
                        </li>
                    </ul>
                </vueSeamlessScroll>
            </div>
        </div>
        <!--  -->


    </div>
</template>
<script>
import Myecharts  from '@/components/My_echarts' ;
import vueSeamlessScroll from "vue-seamless-scroll" ;

const option = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '访问率',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220,11,22,33,22,33],
            itemStyle: {
                normal:{
                    color:function(params) {
                        //自定义颜色
                        var colorList = [          
                                '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463',
                            ];
                        return colorList[params.dataIndex]
                    }
                }
            },
        }
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

const option1 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        right: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },

    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            itemStyle: {
                normal:{
                    color:function(params) {
                        //自定义颜色
                        var colorList = [          
                                '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000', '#FE8463',
                            ];
                        return colorList[params.dataIndex]
                    }
                }
            },
        }
    ]
};


import e0 from '@/assets/images/e0.jpg' 
import e1 from '@/assets/images/e1.jpg'
import e2 from '@/assets/images/e2.jpg'
import e3 from '@/assets/images/e3.jpg'
import e4 from '@/assets/images/e4.jpg' 
import e5 from '@/assets/images/e5.jpg'
import e6 from '@/assets/images/e6.jpg' 
import e7 from '@/assets/images/e7.jpg'
import e8 from '@/assets/images/e8.jpg'
import e9 from '@/assets/images/e9.jpg'
import e10 from '@/assets/images/e10.jpg'
import e11 from '@/assets/images/e11.jpg'
import e12 from '@/assets/images/e12.jpg'


export default {
    inject:['me'],
    components:{
        Myecharts,
        vueSeamlessScroll
    },
        data(){
        return {
            hotImg:[e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12],
            cachePadding:'24px',
            listData: [
                {
                   'title': '城东供热',
                   "pfsbmc":"燃料料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"贡化合物",
                    "scnd":"90",
                    "zsnd":"90",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 }, 
                 {
                    'title': '金鹏纸业',
                   "pfsbmc":"纸业料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"氮化合物",
                    "scnd":"80",
                    "zsnd":"60",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 }, 
                 {
                     'title': '槐东污水',
                   "pfsbmc":"污水料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"贡化合物",
                    "scnd":"50",
                    "zsnd":"120",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 }, 
                 {
                     'title': '九天医药',
                   "pfsbmc":"医药料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"贡化合物",
                    "scnd":"55",
                    "zsnd":"73",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 }, 
                 {
                    'title': '城西供热',
                   "pfsbmc":"燃料料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"贡化合物",
                    "scnd":"64",
                    "zsnd":"82",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 }, 
                 {
                     'title': '淮西供热',
                   "pfsbmc":"燃料料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"贡化合物",
                    "scnd":"81",
                    "zsnd":"35",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 }, 
                 {
                     'title': '城北供热',
                   "pfsbmc":"燃料料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"贡化合物",
                    "scnd":"52",
                    "zsnd":"38",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 }, 
                 {
                     'title': '城南供热',
                   "pfsbmc":"供热料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"贡化合物",
                    "scnd":"109",
                    "zsnd":"48",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 }, 
                 {
                     'title': '槐西污水',
                   "pfsbmc":"污水料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"贡化合物",
                    "scnd":"53",
                    "zsnd":"102",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 },
                 {
                     'title': '槐西污水',
                   "pfsbmc":"污水料仓",
                   "jcdmc":"废气监测点",
                    "xmmc":"贡化合物",
                    "scnd":"53",
                    "zsnd":"102",
                    "cysj":"2020.8.19",
                    "jcdw":"mg/m³",
                 }
            ]
        }
    },
    mounted(){
        this.$refs.tvGuide.init(option1) ;
        this.getPageviewdwmdata()
        // 自定 内容的 Padding 
        this.cachePadding = this.me._data.contentPadding ;
        this.me._data.contentPadding = 0 ;
    },
    destroyed() {
        this.me._data.contentPadding = this.cachePadding ;
    },
    computed:{
         optionHover () {
            return {
                    /*悬停*/
                    hoverStop: true,
                    /*速度*/
                    step:0.5
                    //step: 0.2, // 数值越大速度滚动越快
                    //limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                    //hoverStop: true, // 是否开启鼠标悬停stop
                    //direction: 1, // 0向下 1向上 2向左 3向右
                    //openWatch: true, // 开启数据实时监控刷新dom
                    //singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                    //singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                    //waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
            }
        }
    },

    methods: {
        handleMenuClick(e){
            console.log(e);
        },
        // 柱状图
        getPageviewdwmdata(){
            this.$http.get('pageviewdwmdata/list?type='+this.$store.getters.masterType).then(res =>{
                console.log('res',res);
                option.series[0].data = res.data.data.map(item => item.viewClickRate)
               this.$refs.trend.init(option) ;
                
           })
        }
    },
}
</script>
<style lang="scss" scoped>
$main-color:#1890ff;
$grey:#999;


#container{
    width:100%;  
    height:100%;
    display:inline-grid;
    grid-template-columns:repeat(4,25%) ;
    grid-template-rows: repeat(4, 25%);
    grid-template-areas: 'a b c d'
                        'e f g h'
                        'i j k l'
                        'm n o p';

}


.griditem {
width:100%;  
height:100%;
border: 5px solid #1890ff;
background-image: url("../../../assets/images/e1.jpg");
background-repeat: no-repeat;   
background-size: 100% 100%;  


}

.grid-2 {
  grid-area: a / b / f / g ;
}
.grid-img{
    position: relative;
    z-index: 1;
}
.grid-img-span{
    position: absolute;
    left: 10%;
    top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
    color: #fff;
    background: rgba(212, 17, 17,0.9);
    z-index: 2;
    border-radius: 50%;
    --count: infinite;
	animation: zwyHover1 1s var(--count) !important;
} 
.blur1{
    filter: blur(10px);
}
.blur2{
    filter: blur(2px);
}

.blur3{
    filter: blur(3px);
}

.blur4{
    filter: blur(4px);
}

.blur5{
    filter: blur(5px);
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


.frame-wrap{
    width: 65%;
    height: 400px;
    border: 1px solid #999;
    // background-image: url("../../../assets/images/hot.png");
    // background-repeat: no-repeat;   
    // background-size: 100% 100%;   
}
h3{
    color: $main-color ;
    padding-bottom: 10px;
    border-bottom: 1px solid $main-color;
}
.title-text{
    font-size:25px;color:#000
}
.content1 {
  width: 30%;
  height: 74%;
  overflow: hidden;
  display: inline-block;
  /* border: 1px solid #17678b; */
  font-size: 14px;
  text-align: center;
}

.seamless-warp {
    width: 100%;
    height: 229px;
    overflow: hidden;
    text-align: left;
}

.item{
    width: 100%;
    padding: 0;
}
.itemli{
    height: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
}
.itemli:nth-of-type(even){
    border-bottom:1px solid #b8d1e0;
}
.itemli:nth-of-type(odd){
    border-bottom:1px solid #90a2ad;
    color: $grey;
}
.itemli:first-of-type{
    background: rgba($color: #ccc, $alpha: 0.1);
    border-bottom:1px solid #999;
} 
// .itemli span{
//     flex: 1;
// }

</style>