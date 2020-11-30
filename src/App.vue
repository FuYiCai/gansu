<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>
<script>

import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
export default {
  data(){
    return {
      zh_CN
    }
  }
}
</script>
<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
}
.flex{
  display: flex;
}
.inline-flex{
  display: inline-flex;
}
.justify-between{
  justify-content: space-between;
}
.flex-column{
  flex-direction: column;
}
.align-center{
 align-items: center;
}
.main-color{
  color: #1890ff;
}
.main-bg{
  color: #f0f2f5;
}
</style>
