<template>
  <div class="app-container">
    <!--表格渲染-->
    <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;">
      <el-table-column type="selection" width="55" />
      <el-table-column :show-overflow-tooltip="true" width="200" prop="userName" label="用户名" />
      <el-table-column :show-overflow-tooltip="true" width="200" prop="nickName" label="昵称" />
      <el-table-column prop="gender" width="50" label="性别" />
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期" />
      <el-table-column
        label="操作"
        width="115"
        align="center"
        fixed="right"
      >
        <template>
          button
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
  </div>
</template>
<script>
import { postAction } from '@/api/manage'

export default {
  name: 'SpaceNameList',
  data() {
    return {
      loading: false,
      selectList: [],
      tableData: [],
      page: {
        page: 1, // 当前页
        size: 10, // 每页显示条目个数
        total: 0 // 总条目数
      },
      url: {
        queryUser: '/base/users/queryUserPage'
      }
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
    getTableData(val) {
      postAction(this.url.queryUser, { page: this.page }).then(res => {
        this.page.page = res.page
        this.page.total = res.total
        this.tableData = res.list
      })
    }
  }
}
</script>
<style>
</style>
