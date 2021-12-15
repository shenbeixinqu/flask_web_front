<template>
  <basic-function :kind="4" :task-title="taskTitle" />
</template>

<script>
import BasicFunction from '@/views/Task/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      taskTitle: '安全服务'
    }
  }
}
</script>

<style>

</style>
