<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">网络安全后台</h3>
      </div>
      <div class="title-tips">登录</div>
      <el-form-item prop="account">
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="手机号"
          name="account"
          type="text"
        >
          <template #prefix>
            <span><svg-icon icon-class="phone" /></span>
          </template>
        </el-input>
        <el-button
          type="primary"
          size="mini"
          style="text-align:right"
          @click="get_code"
        >获取验证码</el-button>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="短信验证码"
        >
          <template #prefix>
            <span><svg-icon icon-class="mobile-code" /></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          type="text"
          placeholder="验证码"
        >
          <template #prefix>
            <span><svg-icon icon-class="code" /></span>
          </template>
        </el-input>
        <div class="code" @click="refreshCode2(4)">
          <!-- <identify :identify-code="identifyCode" /> -->
          <div class="check_code">{{ identifyCode }}</div>
        </div>
      </el-form-item>
      <div style="float: right; margin-top:20px">
        <el-button
          :loading="loading"
          type="primary"
          size="small"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
import { getCode } from '@/api/login'
export default {
  name: 'Login',
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.identifyCode !== value) {
        // this.loginForm.code = ''
        this.refreshCode2(4)
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    const validateMobileCode = (rule, value, callback) => {
      if (this.mobile_code !== value) {
        callback(new Error('请输入正确的短信验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        account: '',
        password: '',
        token: ''
      },
      loginRules: {
        account: [{ required: true, message: '手机号不能为空' }],
        password: [
          { required: true, message: '短信验证码不能为空' },
          { validator: validateMobileCode, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      // 验证码相关
      identifyCode: '',
      identifyCodes: '1234567890',
      mobile_code: ''
    }
  },
  created() {
    this.refreshCode2(4)
    var token = this.$route.query.token
    if (token) {
      const _this = this
      this.loading = true
      this.loginForm.token = token
      this.$store.dispatch('user/login', _this.loginForm).then(() => {
        // this.$store.dispatch('user/getInfo')
        this.$router.push({ path: _this.redirect || '/index' })
        this.loading = false
      })
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
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const _this = this
          this.loading = true

          this.$store.dispatch('user/login', _this.loginForm).then(() => {
            // this.$store.dispatch('user/getInfo')
            this.$router.push({ path: _this.redirect || '/' })
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    handleRegister() {
      this.$router.push({ path: '/register' })
    },
    // 验证码相关
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    refreshCode2(length) {
      // 生成验证码的方法
      var code = ''
      var codeLength = parseInt(length) // 验证码的长度
      var codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      // 循环组成验证码的字符串
      for (var i = 0; i < codeLength; i++) {
        // 获取随机验证码下标
        var charNum = Math.floor(Math.random() * 36)
        // 组合成指定字符验证码
        code += codeChars[charNum]
      }
      this.identifyCode = code
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    },
    get_code() {
      const searchData = {
        account: this.loginForm.account
      }
      getCode(searchData).then(res => {
        console.log('res', res)
        this.mobile_code = res.data.code
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
    height: 480px;
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

  .code {
        position: absolute;
        top: 0px;
        right: 4px;
        cursor: pointer;
      }
  .check_code {
    color: blue;
    text-align: center;
    height: 40px;
    width: 60px;
    letter-spacing: 3px;
    background-color: #D8B7E3;
  }
}

</style>
