<template>
  <div class="dashboard-container">
    <div class="index_header">
      <div class="index_header_input" style="position:relative">
        <el-row :gutter="20" style="width:100%">
          <el-col :span="3">
            <el-input
              v-model="kword"
              size="mini"
              clearable
              placeholder="请输入手机号"
            />
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              @click="getUserList('search')"
            >查询</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="app-container">
      <el-button
        size="mini"
        class="table_btn"
        @click="addUser"
      >添加</el-button>
      <el-table
        :data="tableData"
        border
        stripe
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        />
        <el-table-column
          label="手机号"
          prop="phone"
          align="center"
        />
        <el-table-column
          label="备注"
          prop="desc"
          align="center"
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editUser(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="delUser(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        class="list-page"
        :total="total"
        :page.sync="pn"
        :limit.sync="limit"
        @pagination="getUserList"
      />
      <!--添加编辑-->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="addDialogVisible"
        width="40%"
      >
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="addRules"
          label-width="100px"
          class="formItem"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addForm.phone" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addForm.desc" />
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button
            size="small"
            @click="addDialogVisible = false"
          >取消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="addSubmit('addForm')"
          >提交</el-button>
        </span>
      </el-dialog>
      <!--删除-->
      <el-dialog
        title="删除"
        :visible.sync="deleteDialogVisible"
        width="40%"
      >
        <div class="dialog_text">请确认是否删除所选管理员</div>
        <span slot="footer">
          <el-button size="small" @click="closeDialogVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click="saveDeleteDialog">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import '@/styles/list.scss'
import '@/styles/table.scss'
import pagination from '@/components/Pagination'
import { userList, addUser, deleteUser } from '@/api/user'

export default {
  components: {
    pagination
  },
  data() {
    return {
      pn: 1,
      total: 0,
      limit: 10,
      kword: '',
      tableData: [],
      addForm: {
        id: '',
        phone: '',
        desc: ''
      },
      addRules: {
        phone: [{ required: true, message: '手机号不能为空' }]
      },
      deleteForm: {
        deleteId: ''
      },
      dialogTitle: '',
      addDialogVisible: false,
      deleteDialogVisible: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList(type) {
      if (type === 'search') {
        this.pn = 1
      }
      const searchData = {
        limit: this.limit,
        pn: this.pn,
        kword: this.kword
      }
      userList(searchData).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 添加
    addUser() {
      this.dialogTitle = '管理员添加'
      this.addDialogVisible = true
      this.addForm.id = ''
      this.addForm.phone = ''
      this.addForm.desc = ''
    },
    // 编辑
    editUser(row) {
      this.dialogTitle = '管理员编辑'
      this.addDialogVisible = true
      this.addForm.phone = row.phone
      this.addForm.id = row.id
      this.addForm.desc = row.desc
    },
    // 提交
    addSubmit(formName) {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addUser(this.addForm).then(res => {
            if (res.data.status === 200) {
              this.addDialogVisible = false
              this.$message.success(res.msg)
              this.getUserList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 删除
    delUser(row) {
      this.deleteDialogVisible = true
      this.deleteForm.deleteId = row.id
    },
    // 确认删除
    saveDeleteDialog() {
      deleteUser(this.deleteForm).then(res => {
        if (res.data.status === 200) {
          this.$message.success(res.msg)
          this.deleteDialogVisible = false
          this.getUserList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style>
  .dialog_text {
        color: red;
        font-size: 18px;
        text-align: center;
  }
  .table_btn {
    margin-bottom: 6px;
  }
</style>
