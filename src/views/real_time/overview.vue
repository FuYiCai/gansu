<template>
    <div class="body">
        <Header/>
        <Mybody />
    </div>
</template>
<script>
import Header from './components/Header' ;
import Mybody from './components/body' ;
export default {
    components:{
        Header,
        Mybody
    },

    
}
</script>
<style scoped>
.body{
    background: #fff;
    padding: 24px;
    border-bottom: 20px solid #f0f2f5;
}
</style>