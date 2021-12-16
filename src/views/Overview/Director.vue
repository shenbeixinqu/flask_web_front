<template>
  <basic-function :kind="2" :company-title="companyTitle" />
</template>

<script>
import BasicFunction from '@/views/Overview/components/company'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      companyTitle: '理事单位'
    }
  }
}
</script>

<style>

</style>
