<template>
    <a-modal :width="600" v-model="visible" 
    :footer="null"
    :closable="false">
    <div class="flex" style="margin-bottom:20px">
        <a-radio-group value="ri" @change="handleRadioChange">
        <a-radio-button value="ri">
            日报
        </a-radio-button>
        <a-radio-button value="zhou">
            周报
        </a-radio-button>
        <a-radio-button value="yue">
            月报
        </a-radio-button>
        </a-radio-group>
        <a-dropdown style="margin-bottom:20px;margin-left:auto">
            <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
            <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
            <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> 选择数据指标 <a-icon type="down" /> </a-button>
        </a-dropdown>
    </div>
      <slot/>
    </a-modal>
</template>
<script>
export default {
    props:{
        visible:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        handleRadioChange(e){
            console.log(e);
        },
        handleMenuClick(e) {
        console.log('click', e);
        },
    },
}
</script>