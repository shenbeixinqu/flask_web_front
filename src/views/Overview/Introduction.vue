<template>
  <basic-function :kind="1" :overview-title="overviewTitle" />
</template>

<script>
import BasicFunction from '@/views/Overview/components/association'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      overviewTitle: '协会简介'
    }
  }
}
</script>

<style>

</style>
