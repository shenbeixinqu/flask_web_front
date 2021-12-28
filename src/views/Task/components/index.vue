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
              @click="getBuildingList('search')"
            >查询</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="app-container">
      <el-button
        size="mini"
        class="table_btn"
        @click="addBuilding"
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
          v-if="ifShow"
          label="new"
          prop="if_new"
        />
        <el-table-column
          label="标题"
          prop="name"
          align="center"
        />
        <el-table-column
          label="排序"
          prop="reorder"
          align="center"
          width="60"
        />
        <template v-if="kind != 4">
          <el-table-column
            label="轮播图"
            prop="if_banner"
            align="center"
          >
            <template #default="{ row }">
              <span v-for="(item, index) in bannerOptions" :key="index">
                {{ row.if_banner == item.value ? item.lable : '' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="轮播图片"
            prop="banner_url"
            align="center"
          >
            <template #default="{ row }">
              <el-image
                v-if="row.banner_url"
                class="logoImage"
                :src="row.banner_url"
              />
            </template>
          </el-table-column>
        </template>

        <template v-if="kind == 4">
          <el-table-column
            label="类型"
            prop="mold"
            align="center"
            width="80px"
          />
          <el-table-column
            label="链接"
            prop="link"
          />
        </template>
        <el-table-column
          v-if="ifShow"
          label="文件地址"
          prop="file_dir"
        />
        <el-table-column
          v-if="ifShow"
          label="文件名称"
          prop="file_name"
        />
        <el-table-column
          v-if="ifShow"
          label="简介"
          prop="desc"
        />
        <el-table-column
          label="添加时间"
          prop="adddate"
          align="center"
          width="120px"
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editBuilding(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="previewBuilding(scope.row)"
            >预览</el-button>
            <el-button
              size="mini"
              @click="delBuilding(scope.row)"
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
        @pagination="getBuildingList"
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
          <el-form-item label="标题:" prop="name">
            <el-input v-model="addForm.name" />
          </el-form-item>
          <template v-if="kind == 4">
            <el-form-item label="类型:">
              <el-radio-group v-model="addForm.mold">
                <el-radio label="1">链接</el-radio>
                <el-radio label="2">文件</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="addForm.mold === '1'" label="链接:">
              <el-input v-model="addForm.link" />
            </el-form-item>
            <el-form-item v-if="addForm.mold === '2'" label="文件:">
              <el-upload
                ref="upload"
                :action="action"
                :file-list="addForm.fileList"
                :on-success="handleSuccess"
                :on-change="handleChange"
                :on-exceed="handleExceed"
              >
                <el-button size="small">上传</el-button>
              </el-upload>
            </el-form-item>
          </template>
          <el-form-item label="排序:" prop="reorder">
            <el-input v-model="addForm.reorder" />
          </el-form-item>
          <el-form-item label="使用new图标:">
            <el-switch
              v-model="addForm.if_new"
              active-color="#13ce66"
              inactive-color="#f0eaea"
            />
          </el-form-item>
          <template v-if="kind != 4">
            <el-form-item label="是否作为轮播图:" prop="if_banner">
              <el-radio v-model="addForm.if_banner" label="1">通栏</el-radio>
              <el-radio v-model="addForm.if_banner" label="2">半通栏</el-radio>
              <el-radio v-model="addForm.if_banner" label="3">否</el-radio>
            </el-form-item>
            <el-form-item v-if="addForm.if_banner != 3" label="轮播图片:" prop="banner_url">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/cms/fileUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="addForm.banner_url" :src="addForm.banner_url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="内容:" prop="content">
              <editor-bar v-model="addForm.content" :is-clear="isClear" @change="change" />
            </el-form-item>
          </template>
          <template v-if="kind == 4">
            <el-form-item label="公司简介" prop="desc">
              <el-input v-model="addForm.desc" type="textarea" />
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
        <div class="dialog_text">请确认是否删除所选{{ taskTitle }}</div>
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
import { buildingList, addBuilding, deleteBuilding } from '@/api/task'
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
    taskTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      bannerOptions: [
        { value: '1', lable: '通栏' },
        { value: '2', lable: '半通栏' },
        { value: '3', lable: '否' }
      ],
      isClear: false,
      tableData: [],

      ifShow: false,
      pn: 1,
      total: 0,
      limit: 10,
      kword: '',
      addForm: {
        id: '',
        name: '',
        reorder: '',
        if_new: false,
        if_banner: '',
        content: '',
        banner_url: '',
        mold: '',
        link: '',
        fileList: [],
        file_dir: '',
        file_name: '',
        desc: '',
        kind: this.kind
      },
      addRules: {
        name: [{ required: true, message: '公司名称不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        banner_url: [{ required: true, message: '轮播图片不能为空', trigger: 'change' }]
      },
      addDialogVisible: false,
      previewDialogVisible: false,
      deleteDialogVisible: false,
      previewContent: '',
      deleteForm: {
        deleteId: ''
      },
      dialogTitle: '',
      action: 'http://127.0.0.1:5000/cms/fileUpload'
    }
  },
  created() {
    this.getBuildingList()
  },
  methods: {
    getBuildingList(type) {
      if (type === 'search') {
        this.pn = 1
      }
      const searchData = {
        limit: this.limit,
        pn: this.pn,
        kword: this.kword,
        kind: this.kind
      }
      buildingList(searchData).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 添加
    addBuilding() {
      this.dialogTitle = this.taskTitle + '添加'
      this.addDialogVisible = true
      this.addForm.id = ''
      this.addForm.name = ''
      this.addForm.content = ''
      this.addForm.banner_url = ''
      this.addForm.if_banner = '3'
      this.addForm.mold = ''
      this.addForm.link = ''
      this.addForm.desc = ''
      this.addForm.file_dir = ''
      this.addForm.reorder = ''
      this.addForm.file_dir = ''
      this.addForm.fileList = []
    },
    // 编辑
    editBuilding(row) {
      this.dialogTitle = this.taskTitle + '编辑'
      this.addDialogVisible = true
      this.addForm.id = row.id
      this.addForm.name = row.name
      this.addForm.reorder = row.reorder
      this.addForm.if_new = row.if_new
      this.addForm.content = row.content
      this.addForm.if_banner = String(row.if_banner)
      this.addForm.banner_url = row.banner_url
      this.addForm.mold = row.mold
      this.addForm.link = row.link
      this.addForm.desc = row.desc
      this.addForm.file_dir = row.file_dir
      this.addForm.fileList = [{ name: `${row.file_name}` }]
    },
    // 提交
    addSubmit(formName) {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addBuilding(this.addForm).then(res => {
            if (res.data.status === 200) {
              this.addDialogVisible = false
              this.$message.success(res.msg)
              this.$refs['addForm'].resetFields()
              this.getBuildingList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 预览
    previewBuilding(row) {
      this.previewDialogVisible = true
      this.previewContent = row.content
    },
    // 删除
    delBuilding(row) {
      this.deleteDialogVisible = true
      this.deleteForm.deleteId = row.id
    },
    // 确认删除
    saveDeleteDialog() {
      deleteBuilding(this.deleteForm).then(res => {
        if (res.data.status === 200) {
          this.$message.success(res.msg)
          this.deleteDialogVisible = false
          this.getBuildingList()
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
      this.addForm.banner_url = res.file_dir
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 7
      const isImage = isJPG || isPNG
      if (!isImage) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 7MB!')
      }
      return isImage && isLt2M
    },
    // 文件上传
    handleChange(file, fileList) {
      this.addForm.file_name = fileList[0]['name']
      this.addForm.fileList = fileList
    },
    handleExceed(files) {
      this.$message.warning(
        `当前限制选择1个文件, 本次选择了${files.length}个文件`
      )
    },
    handleSuccess(response, file, fileList) {
      if (this.addForm.fileList.length > 1) {
        this.$message({
          message: '附件个数不超1个',
          type: 'warning'
        })
        return false
      } else {
        this.addForm.file_dir = response.file_dir
      }
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
