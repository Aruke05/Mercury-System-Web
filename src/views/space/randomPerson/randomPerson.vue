<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <el-row style="background:#fff;padding:16px 16px 0;margin-top: 10px;margin-bottom:20px;">
        <el-input-number
          v-model="queryParam.num"
          clearable
          size="small"
          placeholder="输入个数"
          style="width: 200px;margin-bottom: 10px"
          :controls="false"
          class="filter-item"
        />
        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="query()">获取</el-button>
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px; min-height: 100px;">
        <el-col v-for="item in this.dataList" :span="6" style="margin-bottom: 32px">
          <PersonCard :person="item" /></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { postAction } from '@/api/manage'
import PersonCard from '@/views/space/randomPerson/module/personCard'

export default {
  name: 'RandomPerson',
  components: { PersonCard },
  data() {
    return {
      queryParam: {},
      url: {
        randomPerson: '/space/randomPerson'
      },
      dataList: []
    }
  },
  methods: {
    query() {
      if (!this.queryParam.num) {
        this.$message.error('?')
        return
      }
      postAction(this.url.randomPerson + '?num=' + this.queryParam.num, {}).then(res => {
        if (res.code === 200) {
          this.dataList = res.result
        }
      })
    }
  }
}
</script>

<style scoped>
.dashboard-editor-container {
  padding: 18px 22px 22px 22px;
  background-color: rgb(240, 242, 245);
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
}
</style>
