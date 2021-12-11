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
          <el-form-item label="logo:" prop="logo">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/cms/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <el-input v-if="inputShow" v-model="addForm.logoUrl" />
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
        title="协会简介删除"
        :visible.sync="deleteDialogVisible"
        width="30%"
        center
      >
        <div class="dialog_text">请确认是否删除所选会员单位</div>
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
  data() {
    return {
      inputShow: false,
      isClear: false,
      tableData: [],

      ifShow: false,
      pn: 1,
      total: 0,
      limit: 10,
      // 上传图片url
      imageUrl: '',
      addForm: {
        id: '',
        name: '',
        content: '',
        logoUrl: ''
      },
      addRules: {
        name: [{ required: true, message: '公司名称不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        logo: [{ required: true, message: 'logo不能为空' }]
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
        pn: this.pn
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
      this.dialogTitle = '会员单位添加'
      this.addDialogVisible = true
      this.addForm.id = ''
      this.addForm.name = ''
      this.addForm.content = ''
      this.addForm.logoUrl = ''
    },
    // 编辑
    editMember(row) {
      this.dialogTitle = '会员单位编辑'
      this.addDialogVisible = true
      this.addForm.id = row.id
      this.addForm.name = row.name
      this.addForm.content = row.content
      // this.addForm.logoUrl = row.logoUrl
    },
    // 提交
    addSubmit(formName) {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addMember(this.addForm).then(res => {
            if (res.data.status === 200) {
              this.addDialogVisible = false
              this.$message.success(res.msg)
              this.$refs[formName].resetFields()
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
      console.log('res', res)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.addForm.logoUrl = res.file_dir
      console.log('imgUrl', this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      const isImage = isJPG || isPNG
      console.log('ispng', isImage)
      if (!isImage) {
        this.$message.error('上传LOGO只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传LOGO大小不能超过 2MB!')
      }
      return isImage && isLt2M
      // console.log('ispng', isJPG)
      // if (!isJPG) {
      //   this.$message.error('上传LOGO只能是 JPG/PNG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传LOGO大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
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
