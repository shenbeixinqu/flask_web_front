<template>
  <basic-function :kind="4" :company-title="companyTitle" />
</template>

<script>
import BasicFunction from '@/views/Overview/components/company'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      companyTitle: '支持单位'
    }
  }
}
</script>

<style>

</style>
