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
      <el-button
        size="mini"
        class="table_btn"
        @click="addFile"
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
    <el-dialog
      title="安全服务上传"
      :visible.sync="addDialogVisible"
      width="40%"
    >
      <el-form
        ref="addFileForm"
        :model="addFileForm"
        label-width="100px"
        class="formItem"
      >
        <el-form-item label="标题:">
          <el-input v-model="addFileForm.title" />
        </el-form-item>
        <el-form-item label="类型:">
          <el-radio-group v-model="addFileForm.mold">
            <el-radio label="1">链接</el-radio>
            <el-radio label="2">文件</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="addFileForm.mold === '1'" label="链接:">
          <el-input v-model="addFileForm.link" />
        </el-form-item>
        <el-form-item v-if="addFileForm.mold === '2'" label="文件:">
          <el-upload
            ref="upload"
            multiple="true"
            :action="action"
            :file-list="addFileForm.fileList"
            :on-change="handleChange"
            :on-exceed="handleExceed"
          >
            <el-button size="small">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" type="primary" @click="addFileSubmit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/list.scss'
import '@/styles/table.scss'
import pagination from '@/components/Pagination'
import { addService } from '@/api/safeCenter'
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
      addDialogVisible: false,
      addFileForm: {
        title: '',
        mold: '',
        link: '',
        fileList: []
      },
      // 文件上传参数
      action: 'http://172.18.3.167:5000/cms/fileUpload',
      // fileList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      console.log('ohhhh')
    },
    // 上传文件Dialog
    addFile() {
      this.addDialogVisible = true
    },
    // 上传提交
    addFileSubmit() {
      console.log('上传提交')
      addService(this.addFileForm).then(res => {
        console.log('flie_res', res)
      })
    },
    // 上传钩子
    handleChange(file, fileList) {
      this.addFileForm.fileList = fileList
      console.log('file', file, 'fileList', fileList)
    },
    handleExceed(files) {
      this.$message.warning(
        `当前限制选择1个文件, 本次选择了${files.length}个文件`
      )
    }
  }
}
</script>

<style>
  .table_btn {
    margin-bottom: 6px;
  }
</style>
