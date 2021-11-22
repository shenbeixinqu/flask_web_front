<template>
  <el-col :span="24">
    <el-card class="page-header" shadow="never">
      <el-image class="page-header-avatar" src="http://10.1.1.6/s/u/52/photo.jpg" />
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ handleTips() }}
        </p>
        <p>{{ token }}</p>
        <p class="page-header-tip-description" v-html="description" />
      </div>
    </el-card>

  </el-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      description: '最近更新:1.添加首页'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'token'
    ])
  },
  methods: {
    handleTips() {
      const hour = new Date().getHours()
      return hour < 8
        ? `早上好 ${this.name}，又是元气满满的一天。`
        : hour <= 11
          ? `上午好 ${this.name}，看到你我好开心。`
          : hour <= 13
            ? `中午好 ${this.name}，忙碌了一上午，记得吃午饭哦。`
            : hour < 18
              ? `下午好 ${this.name}，你一定有些累了，喝杯咖啡提提神。`
              : `晚上好 ${this.name}，愿你天黑有灯，下雨有伞。`
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-header {
    min-height: 105px;

    ::v-deep {
      .el-card__body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    &-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 20px;
    }

    &-tip {
      flex: auto;
      min-width: 200px;

      &-title {
      margin-bottom: 12px;
      font-size: 20px;
      font-weight: bold;
      color: #3c4a54;
      }
      &-description {
        font-size: 14px;
        color: #808695;
      }
    }
  }
</style>
