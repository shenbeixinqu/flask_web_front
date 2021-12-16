<template>
  <basic-function :kind="1" :company-title="companyTitle" />
</template>

<script>
import BasicFunction from '@/views/Overview/components/company'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      companyTitle: '分支机构'
    }
  }
}
</script>

<style>

</style>
