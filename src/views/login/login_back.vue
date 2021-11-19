<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">xx后台</h3>
      </div>
      <el-form-item prop="account">
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="用户名"
          name="account"
          type="text"
        >
          <template #prefix>
            <span><svg-icon icon-class="user" /></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
        >
          <template #prefix>
            <span><svg-icon icon-class="password" /></span>
          </template>
        </el-input></el-form-item>
      <div style="float: right; margin-top:20px">
        <el-button
          type="primary"
          size="small"
        >
          登录
        </el-button>
        <el-button
          size="small"
        >
          注册
        </el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: '',
        token: ''
      },
      passwordType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background: #fff;
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background: url('~@/assets/background.jpg') center center fixed
      no-repeat;
  background-size: cover;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 460px;
    max-width: 100%;
    padding: 80px 35px 0;
    margin: 0 auto;
    margin-top: 80px;
    overflow: hidden;
    border-width: 0px;
    left: 430px;
    top: 100px;
    height: 400px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border: none;
    border-radius: 5px;
    -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.149019607843137);
    -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.149019607843137);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.149019607843137);
    font-family: "微软雅黑", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    line-height: 24px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: 700;
      font-style: normal;
      font-size: 32px;
      color: #1891ff;
      line-height: 36px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;

    cursor: pointer;
    user-select: none;
  }
}

</style>
