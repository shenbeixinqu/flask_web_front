<template>
  <div id="app" @mousemove="moveEvent" @click="moveEvent">
    <router-view />
    123
  </div>
</template>

<script>
import { removeToken } from '@/utils/auth'

export default {
  name: 'App',
  data() {
    return {
      timer: null
    }
  },
  mounted: function() {
    // 此方法刷新页面时也会执行
    window.addEventListener('beforeunload', () => {
      removeToken()
    })
  },
  methods: {
    moveEvent() {
      const path = ['/login']
      if (!path.includes(this.$route.path)) { // 如果不是登录页面的话页面停止进行30分钟后清空session
        clearTimeout(this.timmer)
        this.init()
      }
    },
    init() {
      this.timmer = setTimeout(() => {
        // // 清除session
        // sessionStorage.removeItem('sessionData')
        // sessionStorage.clear()
        // // 清除缓存
        // this.$cache.reset()
        // // 跳往登录页面
        // this.$router.push({
        //   path: '/login'

        // })
        this.$store.dispatch('user/logout')
        this.$router.replace('/login')
      }, 30 * 60 * 1000)// 设置半小时清空session进入屏保
    }
  }
}
</script>
