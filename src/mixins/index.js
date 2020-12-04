
import { rootSubmenuKeys } from '@/constant/const' ;

const breadcrumb_mixins = {
    inject:['me'],
    mounted() {
        //  想复杂了 所有面包屑都在这里 自己改改吧
        const breadcrumbData = JSON.parse(JSON.stringify(this.me.breadcrumbData)) || [] ;
        const breadcrumbDatalength = breadcrumbData.length ;
        const setBreadcrumbData = (data) => {
            window.sessionStorage.breadcrumbData = JSON.stringify(data) ;
            this.me.breadcrumbData = data ;
        };
        // console.log('breadcrumbData',breadcrumbData);   // 一级面包
        if(breadcrumbDatalength === 1 && rootSubmenuKeys.includes(breadcrumbData[0])) {
            breadcrumbData.push(this.$route.meta.title) ;
            return  setBreadcrumbData(breadcrumbData);
        }
        // 三级
        if(breadcrumbData.includes('周报月报')){
            if(breadcrumbDatalength === 2) {
                breadcrumbData.push(this.$route.meta.title) ;
                return  setBreadcrumbData(breadcrumbData);
            } 
            if(breadcrumbDatalength === 3){
            breadcrumbData[2] = this.$route.meta.title ;
            return  setBreadcrumbData(breadcrumbData);
            }
        }
         // 二级
        else{
            breadcrumbData[1] = this.$route.meta.title ;
            return  setBreadcrumbData(breadcrumbData);
        }
        
    },
}

const menuTabelMinxis = {
    mounted() {
        this.$nextTick(()=>{
            setTimeout(()=>{
                const {width,height} = window.getComputedStyle(this.$refs.table_wrap) ;
                this.x = parseInt(width) ;
                this.y = parseInt(height) - 90;
            })
        })
    }
}

const getTimesChangeMixins = {
    methods: {
        getTimesChange(e){
            console.log('?????????????');
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
            this.init()
        },
        query(){
            if(this.$refs.mySearch.pickerRange){
               [this.startTime,this.endTime] = this.$refs.mySearch.pickerRange ;
            }
            if(this.$refs.mySearch.inputValue || this.$refs.mySearch.pickerRange) {
                this.init()
            }
 
        },
    }
    
}
export {
    breadcrumb_mixins,menuTabelMinxis,getTimesChangeMixins
}