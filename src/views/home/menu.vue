<template>
  <div>
    <div class="logo">{{openKeys[0]}}</div>
    <a-menu mode="inline" :open-keys="openKeys" style="width: 100%" theme="dark" 
    @select="selectMenu"
    @openChange="onOpenChange">
      <template v-for="item in menuData">
         <a-sub-menu :key="item.key">
          <span slot="title"><a-icon :type="item.icon" /><span>{{item.title}}</span></span>
          <template v-for="v in item.arr">
            <a-menu-item :key="v.key">
            {{v.value}}
          </a-menu-item>
            <template v-if="v.arr">
              <template  v-for="vitem in v.arr" >
                <a-sub-menu :key="vitem.key" :title="vitem.title">
                  <template  v-for="vv in vitem.arr">
                    <a-menu-item :key="vv.key">
                        {{vv.value}}
                    </a-menu-item>
                  </template>
                </a-sub-menu>
              </template>
            </template>
          </template>
      </a-sub-menu>
      </template>
      <!-- 得重构成递归组件 -->
    </a-menu>
  </div>
</template>
<script>
import { menuData ,rootSubmenuKeys,openKeys} from '@/constant/const.js' ;
export default {
  inject:['watchBreadcrumb'],
  data() {
    return {
      rootSubmenuKeys:rootSubmenuKeys,
      openKeys:openKeys,
      menuData:menuData,
      breadcrumb:{
        openKeys:'',
        key:''
      }
    };
  },
  // watch:{
  //   openKeys:{
  //     immediate:true,
  //     handler:function(v){
  //       this.breadcrumb.openKeys = v[0] ;
  //       this.watchBreadcrumb(this.breadcrumb)
  //     }
  //   },
  //   'breadcrumb.key':{
  //     immediate:true,
  //     handler:function(v){
  //       this.watchBreadcrumb(this.breadcrumb)
  //     }
  //   },
  // },
  methods: {
    onOpenChange(openKeys) {
      console.log('openKeys',openKeys);
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      
    },
    selectMenu({ item, key, selectedKeys }){
      console.log( key, selectedKeys);
      this.breadcrumb.key = key ;
      this.$router.replace({ name: key })
    }
  },
};
</script>
<style scoped>
.logo{
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: #fff;
  line-height: 32px;
  text-align: center;
}
</style>
