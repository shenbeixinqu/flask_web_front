<template>
  <div class="dashboard-container">
    <div class="index_header">
      <div class="index_header_input">
        <el-row :gutter="20" style="width:100%">
          <el-col :span="3">
            <el-input size="mini" />
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="app-container">
      <el-table
        :data="tableData"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="title">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import '@/styles/list.scss'
import '@/styles/table.scss'
import { getActivityList } from '@/api/consultCenter'
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.ActivityList()
  },
  methods: {
    ActivityList() {
      getActivityList().then(response => {
        console.log('res', response)
      })
    }
  }
}
</script>

<style>

</style>
