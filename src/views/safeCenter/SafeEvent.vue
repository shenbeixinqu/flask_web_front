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
      <el-button
        size="mini"
        class="table_btn"
        @click="addEvent"
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
          label="排序"
          prop="reorder"
          width="100px"
        />
        <el-table-column
          v-if="ifShow"
          label="内容"
          prop="content"
        />
        <el-table-column
          label="添加时间"
          prop="addtime"
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
              @click="editEvent(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="previewEvent(scope.row)"
            >预览</el-button>
            <el-button
              size="mini"
              @click="delEvent(scope.row)"
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
        @pagination="getList"
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
        <el-form-item label="排序:" prop="reorder">
          <el-input v-model="addForm.reorder" />
        </el-form-item>
        <el-form-item label="内容:" prop="detail">
          <editor-bar v-model="addForm.detail" :is-clear="isClear" @change="change" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" type="primary" @click="addSubmit">提交</el-button>
      </span>
    </el-dialog>
    <!--预览-->
    <el-dialog
      title="预览"
      :visible.sync="previewDialogVisible"
      width="60%"
    >
      <span class="table-item" v-html="previewContent" />
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
import { getEventList, addEvent, deleteEvent } from '@/api/safeCenter'
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
        id: '',
        reorder: ''
      },
      addRules: {
        title: [{ required: true, message: '标题不能为空' }],
        detail: [{ required: true, message: '内容不能为空' }],
        reorder: [{ required: true, message: '排序不能为空' }]
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
        kword: this.kword
      }
      getEventList(searchData).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 添加
    addEvent() {
      this.dialogTitle = '安全事件添加'
      this.addDialogVisible = true
      this.addForm.title = ''
      this.addForm.detail = ''
      this.addForm.id = ''
    },
    editEvent(row) {
      this.dialogTitle = '安全事件修改'
      this.addDialogVisible = true
      this.addForm.id = row.id
      this.addForm.title = row.title
      this.addForm.detail = row.content
    },
    // 删除Dialog
    delEvent(row) {
      this.deleteDialogVisible = true
      this.deleteForm.deleteId = row.id
    },
    // 确认删除
    saveDeleteDialog() {
      deleteEvent(this.deleteForm).then(res => {
        if (res.data.status === 200) {
          this.$message.success(res.msg)
          this.deleteDialogVisible = false
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 预览Dialog
    previewEvent(row) {
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
    addSubmit() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addEvent(this.addForm).then(res => {
            if (res.data.status === 200) {
              this.addDialogVisible = false
              this.$message.success(res.msg)
              this.$refs['addForm'].resetFields()
              this.getList()
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

  ::v-deep .table-item table td {
    width: 60vw;
    border-collapse: collapse;
    font-size: 12px;
    border: 1px solid #e0e0e0;
    word-break: break-all;
  }
</style>
