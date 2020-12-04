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
                {value: 0, name: ' '},
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
        this.getViewtimeavgdata()
        this.getOnlinetimesharingdata()
    },
    methods:{
        userbasedataFn(){
            this.$http.get(`userbasedata?type=${this.$store.getters.masterType}`).then(res =>{
                if(res.data.data) {
                    const data = res.data.data ;
                    this.userbasedata = data ;
                    option.series[0].data[0].value = data.onlineUserCount;
                }else{
                    option.series[0].data[0].value =0
                }
                this.$refs.headRin.init(option) ;

            }).catch(err =>{
                console.log(err);
            })
        },
        
        getOnlinetimesharingdata(){
            const yesterday = moment().subtract(1, 'days').format().split('T')[0] ;
            const day = moment().format().split('T')[0] ;
            const promise = (date) =>  this.$http(`onlinetimesharingdata/list?type=${this.$store.getters.masterType}&date=${date}`) ;
            promise(day).then(res =>{
                const data = res.data.data ;
                realOnline.xAxis.data = data.map((item,i) => i) ;

                const one = {
                        name: '今日实时人数',
                        type: 'line',
                        stack: '总量',
                        data: data.map(item => item.todayOnlineCount)
                    }
                const two = {
                        name: '昨日实时人数',
                        type: 'line',
                        stack: '总量',
                        data: data.map(item => item.yesterdayOnlineCount)
                    }
                realOnline.series = [one,two] ;
                this.$refs.realTime.init(realOnline) ;
            }) 
            // Promise.all([promise(yesterday),promise(day)]).then(res =>{
            //     console.log(res);
            //     const [yesterday,day] = res.data.data ;
            //     realOnline.xAxis.data = yesterday.map((item,i) => i) ;
            //     const datamap =  ['今年','昨天'] ;
            //     realOnline.xAxis.series = yesterday
            // })
           
        },
        // 
        getViewtimeavgdata(){
            const [month1,month2] = [moment(moment().format('YYYY-MM-01')), moment(moment().add(1, 'months').format('YYYY-MM-01')).subtract(1, 'days')] ;

            const [monthstart,monthend] = [month1._i,month2._i] ;
     
            const promise = (start,end) => this.$http.get(`viewtimeavgdata/list?start=${start}&end=${end}&type=${this.$store.getters.masterType}`) ;
            const realOnline2 = JSON.parse(JSON.stringify(realOnline)) ;

            promise(monthstart,monthend).then(res =>{
                const data = res.data.data;
                realOnline2.xAxis.data = data.map((item,i) => i+1) ;
                realOnline2.series[0] = {
                        name: '昨日人均时长',
                        type: 'line',
                        stack: '总量',
                        data: data.map(item => item.lastMonthTimeAvg)
                    }
                realOnline2.series[1] = {
                        name: '今日人均时长',
                        type: 'line',
                        stack: '总量',
                        data: data.map(item => item.viewTimeAvg)
                    }
                this.$refs.per.init(realOnline2) ;
            })
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