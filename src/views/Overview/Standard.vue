<template>
  <basic-function :kind="3" :overview-title="overviewTitle" />
</template>

<script>
import BasicFunction from '@/views/Overview/components/association'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      overviewTitle: '会费标准'
    }
  }
}
</script>

<style>

</style>
