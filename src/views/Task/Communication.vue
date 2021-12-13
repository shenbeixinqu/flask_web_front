<template>
  <basic-function :kind="2" :task-title="taskTitle" />
</template>

<script>
import BasicFunction from '@/views/Task/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      taskTitle: '交流活动'
    }
  }
}
</script>

<style>

</style>
