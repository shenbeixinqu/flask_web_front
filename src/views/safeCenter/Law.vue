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
              placeholder="请输入标题"
            />
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              @click="ActivityList('search')"
            >查询</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="app-container">
      <el-button
        size="mini"
        class="table_btn"
        @click="addLaw"
      >添加</el-button>

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
          v-if="ifShow"
          label="序号"
          prop="id"
        />
        <el-table-column
          label="标题"
          prop="title"
        />
        <el-table-column
          v-if="ifShow"
          label="内容"
          prop="content"
        />
        <el-table-column
          label="添加时间"
          prop="addtime"
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editLaw(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="previewLaw(scope.row)"
            >预览</el-button>
            <el-button
              size="mini"
              @click="delLaw(scope.row)"
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
        @pagination="ActivityList"
      />
    </div>
    <!--添加编辑-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addDialogVisible"
      width="60%"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addRules"
        label-width="120px"
        class="formItem"
      >
        <el-form-item label="标题:" prop="title">
          <el-input v-model="addForm.title" />
        </el-form-item>
        <el-form-item label="内容:" prop="detail">
          <editor-bar v-model="addForm.detail" :is-clear="isClear" @change="change" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" type="primary" @click="addSubmit('addForm')">提交</el-button>
      </span>
    </el-dialog>
    <!--预览-->
    <el-dialog
      title="预览"
      :visible.sync="previewDialogVisible"
      width="60%"
    >
      <span v-html="previewContent" />
      <span slot="footer">
        <el-button size="small" @click="closeDialogVisible('previewDialogVisible')">关闭</el-button>
      </span>
    </el-dialog>
    <!--删除-->
    <el-dialog
      title="法律法规删除"
      :visible.sync="deleteDialogVisible"
      width="30%"
      center
    >
      <div class="dialog_text">请确认是否删除所选法律法规</div>
      <span slot="footer">
        <el-button size="small" @click="closeDialogVisible('deleteDialogVisible')">取消</el-button>
        <el-button size="small" type="primary" @click="saveDeleteDialog">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/list.scss'
import '@/styles/table.scss'
import pagination from '@/components/Pagination'
import { getActivityList, addLaw, deleteLaw } from '@/api/safeCenter'
import EditorBar from '@/components/WEditor'
export default {
  components: {
    EditorBar,
    pagination
  },
  data() {
    return {
      // 富文本
      isClear: false,
      tableData: [],

      ifShow: false,
      pn: 1,
      total: 0,
      limit: 10,
      // 添加表单
      addForm: {
        title: '',
        detail: '',
        id: ''
      },
      addRules: {
        title: [{ required: true, message: '标题不能为空' }],
        detail: [{ required: true, message: '内容不能为空' }]
      },
      kword: '',
      addDialogVisible: false,
      previewDialogVisible: false,
      deleteDialogVisible: false,
      deleteForm: {
        deleteId: ''
      },
      previewContent: '',
      dialogTitle: ''
    }
  },
  created() {
    this.ActivityList()
  },
  methods: {
    ActivityList(type) {
      if (type === 'search') {
        this.pn = 1
      }
      const searchData = {
        limit: this.limit,
        pn: this.pn,
        kword: this.kword
      }
      getActivityList(searchData).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 添加
    addLaw() {
      this.dialogTitle = '法律法规添加'
      this.addDialogVisible = true
      this.addForm.title = ''
      this.addForm.detail = ''
      this.addForm.id = ''
    },
    editLaw(row) {
      this.dialogTitle = '法律法规修改'
      this.addDialogVisible = true
      this.addForm.id = row.id
      this.addForm.title = row.title
      this.addForm.detail = row.content
    },
    // 删除Dialog
    delLaw(row) {
      this.deleteDialogVisible = true
      this.deleteForm.deleteId = row.id
    },
    // 确认删除
    saveDeleteDialog() {
      deleteLaw(this.deleteForm).then(res => {
        if (res.data.status === 200) {
          this.$message.success(res.msg)
          this.deleteDialogVisible = false
          this.ActivityList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 预览Dialog
    previewLaw(row) {
      this.previewDialogVisible = true
      this.previewContent = row.content
    },
    // 关闭dialog
    closeDialogVisible(dialogName) {
      this[dialogName] = false
    },
    change(val) {
      this.addForm.detail = val
    },
    addSubmit(formName) {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addLaw(this.addForm).then(res => {
            if (res.data.status === 200) {
              this.addDialogVisible = false
              this.$message.success(res.msg)
              this.$refs[formName].resetFields()
              this.ActivityList()
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .dialog_text {
        color: red;
        font-size: 18px;
        text-align: center;
  }

  .table_btn {
    margin-bottom: 6px;
  }
</style>
