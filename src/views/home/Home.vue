<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      
      <Menu />

    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
            <div class="flex-end">
             <a-icon  class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"  @click="() => (collapsed = !collapsed)"  />
              <a-popover v-model="visible" title="提示" trigger="click">
                <a slot="content" @click="hide">退出登录</a>
                <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </a-popover>
            </div>
        </a-row>
       

      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px 10px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Menu from './menu'
export default {
  components:{
    Menu
  },
  data() {
    return {
      collapsed: false,
      visible: false,
    };
  },
  methods: {
    hide() {
      this.visible = false;
      localStorage.clear() ;
      window.location.reload()
    },
  },
};
</script>
<style scoped>
#components-layout-demo-custom-trigger {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.flex-end{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
