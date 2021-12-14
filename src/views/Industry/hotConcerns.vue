<template>
  <basic-function :kind="1" :industry-title="industryTitle" />
</template>

<script>
import BasicFunction from '@/views/Industry/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      industryTitle: '热点关注'
    }
  }
}
</script>

<style>

</style>
