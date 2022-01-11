<template>
  <div class="dashboard-container">
    <div class="index_header">
      <div class="index_header_input" style="position:relative" />
    </div>
    <div class="app-container">
      <el-button
        size="mini"
        class="table_btn"
        @click="addMember"
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
          label="公司名称"
          prop="name"
          align="center"
        />
        <template v-if="kind != 2">
          <el-table-column
            label="地址"
            prop="address"
            align="center"
          />
        </template>
        <template v-if=" kind == 1">
          <el-table-column
            label="跳转地址"
            prop="href"
            align="center"
          />
        </template>
        <el-table-column
          label="logo"
          prop="logoUrl"
          align="center"
        >
          <template #default="{ row }">
            <el-image
              v-if="row.logoUrl"
              class="logoImage"
              :src="row.logoUrl"
            />
          </template>
        </el-table-column>
        <!-- <template v-if="kind == 2">
          <el-table-column
            label="公司简介"
            prop="desc"
          />
        </template> -->
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
              @click="editMember(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="previewMember(scope.row)"
            >预览</el-button>
            <el-button
              size="mini"
              @click="delMember(scope.row)"
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
        @pagination="getMemberList"
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
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <template v-if="kind != 2">
            <el-form-item label="地址" prop="address">
              <el-input v-model="addForm.address" />
            </el-form-item>
          </template>
          <template v-if="kind == 1">
            <el-form-item label="跳转地址" prop="href">
              <el-input v-model="addForm.href" />
            </el-form-item>
          </template>
          <el-form-item label="logo:" prop="logoUrl" required>
            <el-upload
              class="avatar-uploader"
              action="http://120.48.13.185/cms/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="addForm.logoUrl" :src="addForm.logoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <template v-if="kind == 2">
            <el-form-item label="公司简介" prop="desc">
              <el-input v-model="addForm.desc" type="textarea" />
            </el-form-item>
          </template>
          <template v-if="kind != 2">
            <el-form-item label="内容:" prop="content">
              <editor-bar v-model="addForm.content" :is-clear="isClear" @change="change" />
            </el-form-item>
          </template>
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
        <div class="dialog_text">请确认是否删除所选{{ companyTitle }}</div>
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
import { memberList, addMember, deleteMember } from '@/api/overview'
import EditorBar from '@/components/WEditor'
export default {
  components: {
    pagination,
    EditorBar
  },
  props: {
    kind: {
      type: Number,
      default: 0
    },
    companyTitle: {
      type: String,
      default: ''
    }
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
        address: '',
        href: '',
        content: '',
        logoUrl: '',
        desc: '',
        kind: this.kind
      },
      addRules: {
        name: [{ required: true, message: '公司名称不能为空' }],
        address: [{ required: true, message: '地址不能为空' }],
        href: [{ required: true, message: '跳转地址不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        desc: [{ required: true, message: '公司简介不能为空' }],
        logoUrl: [{ required: true, message: 'logo不能为空', trigger: 'change' }]
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
    this.getMemberList()
  },
  methods: {
    getMemberList() {
      const searchData = {
        limit: this.limit,
        pn: this.pn,
        kind: this.kind
      }
      memberList(searchData).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 添加
    addMember() {
      this.dialogTitle = this.companyTitle + '添加'
      this.addDialogVisible = true
      this.addForm.id = ''
      this.addForm.name = ''
      this.addForm.address = ''
      this.addForm.href = ''
      this.addForm.content = ''
      this.addForm.desc = ''
      this.addForm.logoUrl = ''
    },
    // 编辑
    editMember(row) {
      this.dialogTitle = this.companyTitle + '编辑'
      this.addDialogVisible = true
      this.addForm.id = row.id
      this.addForm.name = row.name
      this.addForm.address = row.address
      this.addForm.href = row.href
      this.addForm.content = row.content
      this.addForm.desc = row.desc
      this.addForm.logoUrl = row.logoUrl
    },
    // 提交
    addSubmit(formName) {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addMember(this.addForm).then(res => {
            if (res.data.status === 200) {
              this.addDialogVisible = false
              this.$message.success(res.msg)
              this.$refs['addForm'].resetFields()
              this.getMemberList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 预览
    previewMember(row) {
      this.previewDialogVisible = true
      this.previewContent = row.content
    },
    // 删除
    delMember(row) {
      this.deleteDialogVisible = true
      this.deleteForm.deleteId = row.id
    },
    // 确认删除
    saveDeleteDialog() {
      deleteMember(this.deleteForm).then(res => {
        if (res.data.status === 200) {
          this.$message.success(res.msg)
          this.deleteDialogVisible = false
          this.getMemberList()
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
      this.addForm.logoUrl = res.file_dir
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 20
      const isImage = isJPG || isPNG
      if (!isImage) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
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
