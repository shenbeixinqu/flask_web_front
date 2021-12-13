<template>
  <basic-function :kind="2" :task-title="taskTitle" />
</template>

<script>
import BasicFunction from '@/views/other/components'
export default {
  components: {
    BasicFunction
  },
  data() {
    return {
      taskTitle: '法律法规'
    }
  }
}
</script>

<style>

</style>
