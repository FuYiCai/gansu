<template>
    <div>
        <header class="flex justify-between">
            <div class="flex align-center">
                <div >
                    <div class="start-up "  >
                        <span    class="title ">今日开机数</span>
                        <span style="font-size:20px;">{{userbasedata.userOn}} <sub>台</sub></span>
                    </div>
                </div>
                <Myecharts width="200px" height="200px"  id="headRin" ref="headRin" />
            </div>
            <div style="align-self:flex-end " class="flex">
                <p class="flex flex-column">
                    <span class="title">日均开机数</span>
                    <span style="font-size:25px;color:#000">{{userbasedata.muserOnAvg}} <sub>台</sub></span>
                </p>
                <p class="flex flex-column" style="margin:0  50px">
                    <span class="title">户日均观看时长</span>
                    <span style="font-size:25px;color:#000">{{userbasedata.muserTimeAvg}}<sub>分钟</sub></span>
                </p>
                <p class="flex flex-column " >
                    <span class="title">月度总观看时长</span>
                    <span  style="font-size:25px;color:#000;"> {{userbasedata.mtimeLength}} <sub>小时</sub></span>
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
import moment from 'moment';

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
const realOnline = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },

    // legend: {
    //     x: 'left',
    //     y: 'top',
    //     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    // },
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
    data() {
        return {
            userbasedata:{
                dateTime: "2020-12-03",
                mtimeLength: "12323",
                muserOnAvg: "23423",
                muserTimeAvg: "123134",
                onlineUserCount: "343413",
                sysId: "a",
                userOn: "134455",
            },
            
        }
    }, 

    mounted(){
        this.userbasedataFn();
        this.userbasedataPage()
    },
    methods:{
        userbasedataFn(){
            this.$http.get(`userbasedata?type=${this.$store.getters.masterType}`).then(res =>{
                const data = res.data.data ;
                this.userbasedata = data ;
                option.series[0].data[0].value = data.onlineUserCount;
                this.$refs.headRin.init(option) ;
            })
        },
        // 
        userbasedataPage(){
            const me = this;
            const promise = (starttime,endtime) =>  this.$http.get(`userbasedata/page?dateTime=${starttime}&endTime=${endtime}&sysId=${this.$store.getters.masterType}&size=31`) ;
           
            // 实时在线
                // 今天 moment()
                // 昨天  moment().subtract(1, 'days')
            //  promise(+moment()._d,+moment().subtract(1, 'days')._d).then(res =>{
            //      console.log('shishi',res);
            //  })

            //  户均观看时长
                // 本月 [moment(moment().format('YYYY-MM-01')), moment(moment().add(1, 'months').format('YYYY-MM-01')).subtract(1, 'days')]
            const [start1,end1] = [moment(moment().format('YYYY-MM-01')), moment(moment().add(1, 'months').format('YYYY-MM-01')).subtract(1, 'days')]
                // 上月 [moment(moment().subtract(1, 'months').format('YYYY-MM-01')), moment(moment().format('YYYY-MM-01')).subtract(1, 'days')]
            const [start2,end2] = [moment(moment().subtract(1, 'months').format('YYYY-MM-01')), moment(moment().format('YYYY-MM-01')).subtract(1, 'days')]  ;

            Promise.all([promise(start1._i,end1._i),promise(start2._i,end2._i)]).then(res =>{
                console.log('yue',res);
            })



            // .then(res =>{
            //     console.log('userbasedataPage',res);
            //     const data = res.data.data ;
            //     const userTimeAvg = JSON.parse(JSON.stringify(realOnline)) ;
            //     realOnline.xAxis.data = data.records.map(item => item.dateTime) ;
            //     realOnline.series = data.records.map(item => {
            //         return {
            //             type: 'line',
            //             name:'实时在线',
            //             data:[item.onlineUserCount]
            //         }
            //     }) ;
            //     userTimeAvg.xAxis.data = data.records.map(item => item.dateTime) ;
            //     userTimeAvg.series = data.records.map(item => {
            //         return {
            //             type: 'line',
            //             name:'户均观看时长',
            //             data:[item.muserTimeAvg]
            //         }
            //     }) ;
            //     this.$refs.realTime.init(realOnline) ;
            //     this.$refs.per.init(userTimeAvg)
            // })
        }
    }
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