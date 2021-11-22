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
        stripe
        fit
        highlight-current-row
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        />
        <el-table-column
          label="姓名"
          prop="name"
          align="center"
        />
        <el-table-column
          label="公司"
          prop="company"
          align="center"
        />
        <el-table-column
          label="职位"
          prop="position"
          align="center"
        />
        <el-table-column
          label="电话"
          prop="phone"
          align="center"
        />
      </el-table>
      <pagination
        v-show="total > 0"
        class="list-page"
        :total="total"
        :page.sync="pn"
        :limit.sync="limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import '@/styles/list.scss'
import '@/styles/table.scss'
import pagination from '@/components/Pagination'
import { getMemberList } from '@/api/member'
export default {
  components: {
    pagination
  },
  data() {
    return {
      tableData: [],
      pn: 1,
      total: 0,
      limit: 10,
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const searchData = {
        limit: this.limit,
        pn: this.pn
      }
      getMemberList(searchData).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    }
  }

}
</script>

<style>

</style>