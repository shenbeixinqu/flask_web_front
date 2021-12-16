<template>
  <basic-function :kind="3" :company-title="companyTitle" />
</template>

<script>
import BasicFunction from '@/views/Overview/components/company'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      companyTitle: '会员单位'
    }
  }
}
</script>

<style>

</style>
