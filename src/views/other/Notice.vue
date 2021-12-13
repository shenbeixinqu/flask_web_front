<template>
  <basic-function :kind="1" :task-title="taskTitle" />
</template>

<script>
import BasicFunction from '@/views/other/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      taskTitle: '通知公告'
    }
  }
}
</script>

<style>

</style>
