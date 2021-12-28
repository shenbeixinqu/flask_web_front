<template>
  <div class="dashboard-container">
    <div class="index_header">
      <div class="index_header_input" style="position:relative" />
    </div>
    <div class="app-container">
      <el-button
        size="mini"
        class="table_btn"
        @click="addLeader"
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
          label="姓名"
          prop="name"
          width="100px"
          align="center"
        />
        <el-table-column
          label="职务"
          prop="duty"
          align="center"
        />
        <el-table-column
          label="照片"
          prop="photo"
          align="center"
        >
          <template #default="{ row }">
            <el-image
              v-if="row.photo"
              class="logoImage"
              :src="row.photo"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="工作单位"
          prop="company"
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
              @click="editLeader(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="previewLeader(scope.row)"
            >预览</el-button>
            <el-button
              size="mini"
              @click="delLeader(scope.row)"
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
        @pagination="getLeaderList"
      />
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
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <el-form-item label="职务:" prop="duty">
            <el-input v-model="addForm.duty" />
          </el-form-item>
          <el-form-item label="照片:" prop="photo" required>
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/cms/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="addForm.photo" :src="addForm.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="工作单位" prop="company">
            <el-input v-model="addForm.company" />
          </el-form-item>
          <el-form-item label="内容:" prop="content">
            <editor-bar v-model="addForm.content" :is-clear="isClear" @change="change" />
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
        title="删除"
        :visible.sync="deleteDialogVisible"
        width="30%"
        center
      >
        <div class="dialog_text">请确认是否删除所选协会负责人</div>
        <span slot="footer">
          <el-button size="small" @click="closeDialogVisible('deleteDialogVisible')">取消</el-button>
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
import { leaderList, addLeader, deleteLeader } from '@/api/overview'
import EditorBar from '@/components/WEditor'
export default {
  components: {
    pagination,
    EditorBar
  },
  data() {
    return {
      isClear: false,
      tableData: [],

      ifShow: false,
      pn: 1,
      total: 0,
      limit: 10,
      addForm: {
        id: '',
        name: '',
        duty: '',
        content: '',
        photo: '',
        company: ''
      },
      addRules: {
        name: [{ required: true, message: '姓名不能为空' }],
        duty: [{ required: true, message: '职位不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        company: [{ required: true, message: '工作单位不能为空' }],
        photo: [{ required: true, message: 'photo不能为空', trigger: 'change' }]
      },
      addDialogVisible: false,
      previewDialogVisible: false,
      deleteDialogVisible: false,
      previewContent: '',
      deleteForm: {
        deleteId: ''
      },
      dialogTitle: ''
    }
  },
  created() {
    this.getLeaderList()
  },
  methods: {
    getLeaderList() {
      const searchData = {
        limit: this.limit,
        pn: this.pn
      }
      leaderList(searchData).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 添加
    addLeader() {
      this.dialogTitle = '协会负责人添加'
      this.addDialogVisible = true
      this.addForm.id = ''
      this.addForm.name = ''
      this.addForm.duty = ''
      this.addForm.content = ''
      this.addForm.photo = ''
      this.addForm.company = ''
    },
    // 编辑
    editLeader(row) {
      this.dialogTitle = '协会负责人编辑'
      this.addDialogVisible = true
      this.addForm.id = row.id
      this.addForm.name = row.name
      this.addForm.duty = row.duty
      this.addForm.content = row.content
      this.addForm.company = row.company
      this.addForm.photo = row.photo
    },
    // 提交
    addSubmit(formName) {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addLeader(this.addForm).then(res => {
            if (res.data.status === 200) {
              this.addDialogVisible = false
              this.$message.success(res.msg)
              this.$refs['addForm'].resetFields()
              this.getLeaderList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 预览
    previewLeader(row) {
      this.previewDialogVisible = true
      this.previewContent = row.content
    },
    // 删除
    delLeader(row) {
      this.deleteDialogVisible = true
      this.deleteForm.deleteId = row.id
    },
    // 确认删除
    saveDeleteDialog() {
      deleteLeader(this.deleteForm).then(res => {
        if (res.data.status === 200) {
          this.$message.success(res.msg)
          this.deleteDialogVisible = false
          this.getLeaderList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 关闭dialog
    closeDialogVisible(dialogName) {
      this[dialogName] = false
    },
    change(val) {
      this.addForm.content = val
    },
    // 上传图片方法
    handleAvatarSuccess(res, file) {
      this.addForm.photo = res.file_dir
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      const isImage = isJPG || isPNG
      if (!isImage) {
        this.$message.error('上传照片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传照片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    }
  }
}
</script>

<style scoped>
    /**上传图片样式**/
   .avatar-uploader{
    border: 1px dashed #d9d9d9;
    width: 100px;
    height: 100px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .logoImage {
    width: 50px;
    height: 50px;
    margin-top: 5px;
  }
  .dialog_text {
        color: red;
        font-size: 18px;
        text-align: center;
  }
  .table_btn {
    margin-bottom: 6px;
  }

</style>
