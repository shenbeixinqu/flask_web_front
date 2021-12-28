<template>
  <div class="login-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">网络安全后台</h3>
      </div>
      <div class="title-tips">注册</div>
      <el-form-item prop="account">
        <el-input
          ref="account"
          v-model="registerForm.account"
          placeholder="请输入用户名"
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
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="请输入密码"
        >
          <template #prefix>
            <span><svg-icon icon-class="password" /></span>
          </template>
        </el-input></el-form-item>
      <div style="float: right; margin-top:20px">
        <el-button
          :loading="loading"
          type="primary"
          size="small"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
        <el-button
          size="small"
          @click.native.prevent="handleRegister"
        >
          注册
        </el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      registerForm: {
        account: '',
        password: '',
        token: ''
      },
      registerRules: {
        account: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }]
      },
      loading: false,
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
    },
    handleLogin() {
      this.$router.push({ path: '/login' })
    },
    handleRegister() {
      this.$refs.registerForm.validate(async(valid) => {
        if (valid) {
          const { msg } = await register(this.registerForm)
          this.$message.success(msg)
        }
      })
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

  .title-tips {
    margin-top: 29px;
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 400;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
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
