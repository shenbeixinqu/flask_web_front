<template>
  <basic-function :kind="2" :industry-title="industryTitle" />
</template>

<script>
import BasicFunction from '@/views/Industry/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      industryTitle: '网安动态'
    }
  }
}
</script>

<style>

</style>
