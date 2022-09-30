<template>
  <div class="app-container">
    <!--表格渲染-->
    <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
      <el-table-column type="selection" width="55" />
      <el-table-column :show-overflow-tooltip="true" width="100" prop="userName" label="用户名" />
      <el-table-column :show-overflow-tooltip="true" width="100" prop="nickName" label="昵称" />
      <el-table-column prop="roleName" width="100" label="角色" />
      <el-table-column prop="deptName" width="100" label="部门" />
      <el-table-column :show-overflow-tooltip="true" width="300" prop="spaceName" label="加密昵称" />
      <el-table-column prop="gender" width="50" label="性别" />
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期" />
      <el-table-column
        label="操作"
        width="115"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="handleOpen(scope.row)">加密昵称</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页   -->
    <el-pagination
      :current-page="page.page"
      :page-size="page.size"
      layout="total, prev, pager, next, jumper"
      :total="page.total"
      background
      style="float:right;margin:10px 20px 0 0;"
      @current-change="handleCurrentChange"
    />

    <!--Space-->
    <el-drawer
      v-if="drawer"
      title="加密昵称"
      :visible.sync="drawer"
      direction="rtl"
      custom-class="drawer"
      show-close="true"
      :before-close="handleClose"
    >
      <div class="el-drawer__body" style="height: 120px; width: 100%;margin-top: 50px; margin-left: 10px">
        <el-form>
          <el-form-item label="用户名" label-width="80px">
            <el-input v-model="drawerUserName" disabled="true" style="width: 80%" />
          </el-form-item>
          <el-form-item label="space昵称" label-width="80px">
            <el-input :value.sync="drawerSpaceName" disabled="true" style="width: 80%">
              <el-button slot="suffix" type="text" style="width: 100%" :disabled="false" @click="handleSpaceName">
                加密
              </el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="demo-drawer__footer" style="text-align: center">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :disabled="drawerSpaceName == null || drawerSpaceName == ''" :loading="spaceLoading" @click="handbleSubmit">{{ spaceLoading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </el-drawer>

  </div>
</template>
<script>
import { postAction } from '@/api/manage'

export default {
  name: 'SpaceNameList',
  data() {
    return {
      loading: false,
      spaceLoading: false,
      selectList: [],
      tableData: [],
      drawer: false,
      page: {
        current: 1, // 当前页
        size: 10, // 每页显示条目个数
        total: 0 // 总条目数
      },
      url: {
        queryUser: '/base/users/queryUserPage',
        getSpaceName: '/space/encrypt',
        saveSpaceName: '/space/saveSpaceName'
      },
      drawerUserName: '',
      drawerSpaceName: ''
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    selectionChangeHandler(val) {
      this.selectList = val
    },
    handleCurrentChange(val) {
      this.getTableData(val)
    },
    getTableData(page) {
      this.loading = true
      this.page.page = page || this.page.page
      postAction(this.url.queryUser, { page: this.page }).then(res => {
        this.page.page = res.result.page
        this.page.total = res.result.total
        this.tableData = res.result.records
        this.loading = false
      })
    },
    handleClose() {
      /* this.$confirm('确认关闭？')
        .then(_ => {

        })
        .catch(_ => {})*/
      this.drawerSpaceName = ''
      this.drawerUserName = ''
      this.drawer = false
    },
    handleOpen(item) {
      this.drawer = true
      this.drawerSpaceName = item.spaceName
      this.drawerUserName = item.userName
    },
    handbleSubmit() {
      this.spaceLoading = true
      const parameter = { userName: this.drawerUserName, spaceName: this.drawerSpaceName }
      console.log(parameter)
      postAction(this.url.saveSpaceName, parameter).then(res => {
        this.spaceLoading = false
        this.drawer = false
        this.getTableData(this.page.current)
        this.$message.success('修改成功')
      })
    },
    handleSpaceName() {
      postAction(this.url.getSpaceName + '/' + this.drawerUserName + '/' + 'Enu', {}).then(res => {
        this.drawerSpaceName = res.message
      })
    }
  }
}
</script>
<style>
</style>
