
const breadcrumb_mixins = {
    inject:['me'],
    mounted() {
        const breadcrumbData = this.me.breadcrumbData ;
        const breadcrumbDatalength = breadcrumbData.length ;
        if(breadcrumbDatalength === 1 || breadcrumbDatalength === 2 ){
            this.me.breadcrumbData = [...new Set([...breadcrumbData,this.$route.meta.title])]
        }
    },
}


export {
    breadcrumb_mixins
}