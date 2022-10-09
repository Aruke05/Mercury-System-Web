<template>
  <el-card class="box-card" style="min-height: 340px">
    <div slot="header" class="clearfix">
      <span>{{ person.chineseName }}</span>
      <el-button class="copy" style="float: right; padding: 3px 0" type="text" :data-clipboard-text="JSON.stringify(this.person)" @click="handleClipboard()">复制json</el-button>
    </div>
    <div class="text item">
      中文名: {{ person.chineseName }}
    </div>
    <div class="text item">
      年龄: {{ person.age }}
    </div>
    <div class="text item">
      性别: {{ person.sex }}
    </div>
    <div class="text item">
      生日: {{ person.birth }}
    </div>
    <div class="text item">
      地址: {{ person.address }}
    </div>
    <div class="text item">
      邮箱: {{ person.email }}
    </div>
    <div class="text item">
      身份证号码: {{ person.idCardNo }}
    </div>
    <div class="text item">
      昵称: {{ person.nickName }}
    </div>
    <div class="text item">
      QQ号码: {{ person.qQNumber }}
    </div>
    <div class="text item">
      英文名: {{ person.englishName }}
    </div>
    <div class="text item">
      公网IP: {{ person.publicIpv4 }}
    </div>
    <div class="text item">
      私网IP: {{ person.privateIpv4 }}
    </div>
  </el-card>
</template>

<script >
import Clipboard from 'clipboard'

export default {
  name: 'PersonCard',
  props: {
    person: {
      type: Object
    }
  },
  methods: {
    handleClipboard() {
      var clipboard = new Clipboard('.copy')
      clipboard.on('success', e => {
        this.$message.success('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message.error('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    }
  }
}
</script>

<style scoped>

</style>
