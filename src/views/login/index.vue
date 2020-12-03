<template>
  <div class="bg">
    <div style="height: 35vh"></div>
    <a-card
      hoverable
      style="
        width: 400px;
        height: 280px;
        margin-left: auto;
        padding-top:20px;
        border-radius:20px;
        color: #fff;
        margin-right: 100px;
      "
    >
      <a-row type="flex" justify="center" align="middle" >
        <a-col :span="24">
          <a-form
            :form="form"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            @submit="handleSubmit"
          >
            <a-form-item label="账号">
              <a-input
                v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '请输入账号!' }] },
                ]"
              />
            </a-form-item>
            <a-form-item label="密码">
              <a-input-password
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码!' }] },
                ]"
              />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit"> 登录 </a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          const  { password,username } = values ;
          this.$http.get(`signin?password=${password}&username=${username}`).then(res =>{
             window.localStorage.logInfo = JSON.stringify(res.data.data) ;
             this.$router.replace({
              name:'Home'
             })
          })
        }
      });
    },
  },
};
</script>
<style scoped>
.bg {
  width: 100%;
  height: 100vh;
  background: url(../../assets/images/login.jpg);
  background-size: cover;
}
</style>