<template>
  <basic-function :kind="3" :industry-title="industryTitle" />
</template>

<script>
import BasicFunction from '@/views/Industry/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      industryTitle: '漏洞发布'
    }
  }
}
</script>

<style>

</style>
