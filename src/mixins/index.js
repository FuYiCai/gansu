
import { rootSubmenuKeys } from '@/constant/const' ;
import { mapState } from 'vuex'
const breadcrumb_mixins = {
    inject:['me'],
    mounted() {
        //  想复杂了 所有面包屑都在这里 自己改改吧
        const breadcrumbData = JSON.parse(JSON.stringify(this.me.breadcrumbData)) || [] ;
        const breadcrumbDatalength = breadcrumbData.length ;
        // console.log('breadcrumbData',breadcrumbData);   // 一级面包
        if(breadcrumbDatalength === 1 && rootSubmenuKeys.includes(breadcrumbData[0])) {
            breadcrumbData.push(this.$route.meta.title) ;
            return  this.me.breadcrumbData = breadcrumbData;
        }
        // 三级
        if(breadcrumbData.includes('周报月报')){
            if(breadcrumbDatalength === 2) {
                breadcrumbData.push(this.$route.meta.title) ;
                return  this.me.breadcrumbData = breadcrumbData;
            } 
            if(breadcrumbDatalength === 3){
            breadcrumbData[2] = this.$route.meta.title ;
            return  this.me.breadcrumbData = breadcrumbData;
            }
        }
         // 二级
        else{
            breadcrumbData[1] = this.$route.meta.title ;
            return  this.me.breadcrumbData = breadcrumbData;
        }
        

    },
}



export {
    breadcrumb_mixins
}