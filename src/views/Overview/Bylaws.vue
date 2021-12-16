<template>
  <basic-function :kind="2" :overview-title="overviewTitle" />
</template>

<script>
import BasicFunction from '@/views/Overview/components/association'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      overviewTitle: '协会章程'
    }
  }
}
</script>

<style>

</style>
