<template>
  <basic-function :kind="1" :task-title="taskTitle" />
</template>

<script>
import BasicFunction from '@/views/Task/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      taskTitle: '党建活动'
    }
  }
}
</script>

<style>

</style>
