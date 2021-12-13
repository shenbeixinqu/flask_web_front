<template>
  <basic-function :kind="3" :task-title="taskTitle" />
</template>

<script>
import BasicFunction from '@/views/Task/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      taskTitle: '教育培训'
    }
  }
}
</script>

<style>

</style>
