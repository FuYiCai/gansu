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
            <a-select default-value="lucy" style="width: 120px" @change="handleMenuClick">
                <template v-for="(item, index) in menuArr">
                    <a-select-option value="jack">
                    Jack
                     </a-select-option>
                 </template>
            </a-select>
            <a-menu slot="overlay" @click="handleMenuClick">
            <template v-for="(item, index) in menuArr">
                <a-menu-item :key="index">  {{item.title}} </a-menu-item>
            </template>
            </a-menu>
            <a-button style="margin-left: 8px"> 选择数据指标 <a-icon type="down" /> </a-button>
        </a-dropdown>
    </div>
      <slot/>
    </a-modal>
</template>
<script>
export default {

    data() {
        return {
          visible: false,
          menuArr:[]
        }
    },
    methods: {
        handleRadioChange(e){
            console.log(e);
        },
        handleMenuClick(e) {
        console.log('click', e);
        },
        showModal() {
            this.visible = true;
        },
        getMenuItem(arr) {
            this.menuArr = arr
        }
    },
}
</script>