<template>
  <basic-function :kind="4" :industry-title="industryTitle" />
</template>

<script>
import BasicFunction from '@/views/Industry/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      industryTitle: '安全事件'
    }
  }
}
</script>

<style>

</style>
