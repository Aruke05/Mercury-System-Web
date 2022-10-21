<template>
  <div class="tab">
    <!-- 留言列表 -->
   <div
     style="height: 500px; background-color: #2C3333;overflow-y: auto;overflow-x: hidden;word-break: break-all;word-wrap: break-word;"
     v-loading="messageBoardLodding"
   >
     <div class="liuyan" v-for="(item,index) in list " :key='index'>
       <!-- 第二个留言内容 -->
       <div class="content">
         <el-row>
           <el-col :span="1">
             <el-row style="text-align: center">
               <el-avatar shape="square" size="small" :src="item.avatarName ? baseApi + '/avatar/' + item.avatarName : Avatar"></el-avatar>
              </el-row>
              <el-row style="text-align: center; top: 8px">
                {{item.nickName}}
              </el-row>
           </el-col>
           <el-col :span="23" style="color: #D6D5A8; margin-top: 15px; max-width: 100%">
             {{item.desc}}
           </el-col>
         </el-row>
       </div>
       <div class="list-bottom">
         <div style="color: #816797;margin-left: 10px">
           时间:{{item.insertTime}}
         </div>
         <!-- :underline='false' 去除下划线 -->
         <el-link type="danger" style="margin-right: 20px" :underline='false' @click="del(index,item)">删除</el-link>
       </div>
     </div>
   </div>
    <el-divider/>
    <el-row style="bottom: 10px">
      <el-col :span="21">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-col>
      <el-col :span="2" style="text-align: center; margin-left: 15px">
        <el-button type="primary" @click="onSubmit" :loading="submitLoadding" style="width: 100%;height: 30px;margin-top: 15px;margin-left: 10px">留言</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/assets/images/avatar.png'
import {postAction} from "@/api/manage";

export default {
  data() {
    return {
      Avatar: Avatar,
      form: {
        desc : '',
      },
      //list 留言数据
      list : [],
      //默认没有点赞的颜色
      starColor : '#999',
      submitLoadding: false,
      messageBoardLodding: false,
      url: {
        submitUrl: '/mercury/messageBoard/submit',
        selectUrl: '/mercury/messageBoard/selectMessageBoardList',
        deleteUrl: '/mercury/messageBoard/delete'
      }
    };
  },
  computed: {
    ...mapGetters([
      'user',
      'baseApi'
    ]),
  },
  mounted() {
    this.loadData();
    this.timer = setInterval(() => {
      setTimeout(function(){
        postAction(this.url.selectUrl,{}).then(res => {
          if(res.code == 200){
            this.list = res.result
          }
        })
      }, 0)
    }, 1000*10)
  },
  beforeDestroy(){
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    loadData(){
      this.messageBoardLodding = true
      postAction(this.url.selectUrl,{}).then(res => {
        if(res.code == 200){
          this.list = res.result
          this.messageBoardLodding = false
        }
      })
    },
    //onSubmit提交事件
    onSubmit() {
      if(this.form.desc == undefined || this.form.desc == ''){
        this.$message.error("留言不能为空")
        return
      }
      this.submitLoadding = true
      postAction(this.url.submitUrl, {desc: this.form.desc}).then(res => {
        if(res.code == 200){
          this.$message.success("留言成功")
          this.form.desc = ''
          this.submitLoadding = false
          this.loadData()
        }
      })
    },
    del(index,item){ //删除事件
      this.$confirm(`确定要删除${item.nikeName}的留言吗?`, '删除提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index,1)
        postAction(this.url.deleteUrl, {id: item.id}).then(res => {
          if(res.code == 200){
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
            });
          }
        })
      }).catch(() => {
      });
    },
  },
};
</script>

<style>
.tab {
  margin-top: 20px;
}
  .el-form{
    margin: 50px 0px;
  }
  .content{
    margin: 20px 10px;
    color: orange;
  }
  .list-bottom{
    display: flex;
    justify-content: space-between;

  }
  .liuyan{
    border-bottom: 1px solid #999;
    border-color: #5a5e66;
  }
  .left{
    cursor: pointer;
  }

</style>
