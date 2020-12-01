<template>
  <div>
    <div class="logo">
        <a-dropdown >
          <p class="ant-dropdown-link" >
            {{master}} <a-icon type="down" />
          </p>
          <a-menu slot="overlay" @click="dropdown">
          <a-menu-item key="yidong">
            <span>移 动</span>  
          </a-menu-item>
          <a-menu-item key="liantong">
            <span>联 通</span>  
          </a-menu-item>
          <a-menu-item key="dianxing">
            <span>电 信</span>  
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

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
  inject:['me'],
  data() {
    return {
      rootSubmenuKeys:rootSubmenuKeys,
      openKeys:openKeys,
      menuData:menuData,
      master:'移 动'
    };
  },
  watch:{
    openKeys:{
      immediate:true,
      handler:function(v){
        this.me.breadcrumbData = v
      }
    },
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      
    },
    selectMenu({ item, key, selectedKeys }){
      this.$router.replace({ name: key })
    },
    dropdown({key}){
      const map = {
        yidong:'移 动',
        liantong:'联 通' ,
        dianxing:'电 信'
      };
      this.master = map[key] ;
    },
  },
};
</script>
<style scoped>
.logo{
  height: 32px;
  line-height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: #fff;
  text-align: center;
}
</style>
