<template>
  <div class="dashboard-container">
    <div class="index_header">
      <div class="index_header_input">
        <el-row :gutter="20" style="width:100%">
          <el-col :span="3">
            <el-input
              v-model="kword"
              size="mini"
              clearable
              placeholder="请输入标题"
            />
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              @click="getList('search')"
            >查询</el-button>
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
        <el-table-column
          label="当前状态"
          prop="status"
          align="center"
        >
          <template #default="{row}">
            <el-tag v-if="row.status_val == 1" type="success">{{ row.status }}</el-tag>
            <el-tag v-else type="danger">{{ row.status }}</el-tag>

          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status_val == 1"
              size="mini"
              @click="changeStatus(scope.row, 0)"
            >移除</el-button>
            <el-button
              v-else
              size="mini"
              @click="changeStatus(scope.row, 1)"
            >移入</el-button>
          </template>
        </el-table-column>
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
import { getMemberList, memberStatus } from '@/api/member'
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
      loading: false,
      kword: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(type) {
      if (type === 'search') {
        this.pn = 1
      }
      const searchData = {
        limit: this.limit,
        pn: this.pn,
        title: this.kword
      }
      getMemberList(searchData).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    changeStatus(row, params) {
      console.log('row', row, 'params', params)
      const memberData = {
        id: row.id,
        kind: params
      }
      memberStatus(memberData).then(res => {
        if (res.data.status === 200) {
          this.getList()
        }
      })
    }
  }

}
</script>

<style>

</style>
