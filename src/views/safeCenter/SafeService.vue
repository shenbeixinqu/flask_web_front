<template>
  <div class="dashboard-container">
    <div class="index_header">
      <div class="index_header_input">
        <el-row :gutter="20" style="width:100%">
          <el-col :span="3">
            <el-input
              v-model="addFileForm.title"
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
          label="类型"
          prop="mold"
        />
        <el-table-column
          label="添加时间"
          prop="addtime"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="delService(scope.row)"
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
            :action="action"
            :file-list="addFileForm.fileList"
            :on-success="handleSuccess"
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
    <!--删除-->
    <el-dialog
      title="安全服务删除"
      :visible.sync="deleteDialogVisible"
      width="30%"
      center
    >
      <div class="dialog_text">请确认是否删除所选安全服务</div>
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
import { addService, getServiceList, deleteService } from '@/api/safeCenter'
export default {
  components: {
    pagination
  },
  data() {
    return {
      tableData: [],
      ifShow: false,
      pn: 1,
      total: 0,
      limit: 10,
      addDialogVisible: false,
      deleteDialogVisible: false,
      addFileForm: {
        title: '',
        mold: '',
        link: '',
        fileList: [],
        file_dir: ''
      },
      deleteForm: {
        deleteId: ''
      },
      // 文件上传参数
      action: 'http://172.18.3.167:5000/cms/fileUpload'
      // fileList: []
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
        title: this.addFileForm.title
      }
      getServiceList(searchData).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 上传文件Dialog
    addFile() {
      this.addDialogVisible = true
    },
    // 上传提交
    addFileSubmit() {
      addService(this.addFileForm).then(res => {
        if (res.data.status === 200) {
          this.$message.success(res.msg)
          this.addDialogVisible = false
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 上传钩子
    handleChange(file, fileList) {
      this.addFileForm.fileList = fileList
    },
    handleExceed(files) {
      this.$message.warning(
        `当前限制选择1个文件, 本次选择了${files.length}个文件`
      )
    },
    handleSuccess(response, file, fileList) {
      if (this.addFileForm.fileList.length > 1) {
        this.$message({
          message: '附件个数不超1个',
          type: 'warning'
        })
        return false
      } else {
        this.addFileForm.file_dir = response.file_dir
      }
    },
    // 关闭dialog
    closeDialogVisible(dialogName) {
      this[dialogName] = false
    },
    // 删除安全服务
    delService(row) {
      this.deleteDialogVisible = true
      this.deleteForm.deleteId = row.id
    },
    // 确认删除
    saveDeleteDialog() {
      deleteService(this.deleteForm).then(res => {
        if (res.data.status === 200) {
          this.$message.success(res.msg)
          this.deleteDialogVisible = false
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style>
  .table_btn {
    margin-bottom: 6px;
  }
</style>
