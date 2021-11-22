<template>
  <div class="dashboard-container">
    <page-header />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '@/views/dashboard/component/PageHeader'

export default {
  name: 'Dashboard',
  components: {
    PageHeader
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
