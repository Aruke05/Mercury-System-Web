<template>
  <div>
    <el-col :span="17">
      <el-card class="box-card">
        <template slot="header">
          <div class="card-header">
            <span>选择属性:<attribute @click="deleteAttribute" style="min-height:35px;margin-top: 10px" :attributes="selectAttributes"/></span>
            <el-button @click="emptySelectAttribute" style="margin-top: 10px" type="primary">清空</el-button>
          </div>
        </template>
        <attribute @click="changeAttribute" :attributes="attributes"/>
      </el-card>
      <el-card class="box-card">
        <template slot="header">
          <div class="card-header">
            <span>选择钛晶属性:<attribute style="min-height:35px;margin-top: 10px" :attributes="selectCrystal"/></span>
            <el-button @click="emptySelectCrystal" style="margin-top: 10px" type="primary">清空</el-button>
          </div>
        </template>
        <attribute @click="changeCrystal" :attributes="attributes"/>
      </el-card>
      <el-card class="box-card" style="min-height: 340px;margin-top: 20px">
        <template slot="header">
          <div class="card-header">
            <span>结果</span>
          </div>
        </template>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="作为攻击方" name="1">
            <attribute :attributes="hitRange"/>
          </el-collapse-item>

          <el-collapse-item title="作为被攻击方" name="2" >
            <el-descriptions direction="horizontal" :column="1" border :label-style="LS">
              <el-descriptions-item span="2">
                <template slot="label" style="text-align: center">
                  <el-tag color="green">4X</el-tag>
                </template>
                <attribute :attributes="weakPointRange.x4"/>
              </el-descriptions-item>
              <el-descriptions-item span="2">
                <template slot="label" style="text-align: center">
                  <el-tag type="success">2X</el-tag>
                </template>
                <attribute :attributes="weakPointRange.x2"/>
              </el-descriptions-item>
              <el-descriptions-item >
                <template slot="label" style="text-align: center">
                  <el-tag type="danger">1/2X</el-tag>
                </template>
                <attribute :attributes="weakPointRange.x05"/>
              </el-descriptions-item>
              <el-descriptions-item >
                <template slot="label" style="text-align: center">
                  <el-tag color="red">1/4X</el-tag>
                </template>
                <attribute :attributes="weakPointRange.x025"/>
              </el-descriptions-item>
              <el-descriptions-item >
                <template slot="label" style="text-align: center">
                  <el-tag color="black">0X</el-tag>
                </template>
                <attribute :attributes="weakPointRange.x0"/>
              </el-descriptions-item>
            </el-descriptions>
          </el-collapse-item>

          <el-collapse-item title="推荐" name="3">
            <attribute :attributes="recommend"/>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-col>
    <el-col :span="7">
      <el-card>
        <template slot="header">
          <div class="card-header">
            <span>推荐</span>
          </div>
        </template>
      </el-card>
    </el-col>
  </div>
</template>

<script>

import Attribute from "@/views/mongozo/pokemon/raidBattles/module/attribute/attribute";
export default {
  name: "raidBattles",
  components: {
    Attribute,
  },
  data(){
    return{
      activeNames: ['1','2','3'],
      crystalAttribute: '',
      attributes: ["Normal","Dark","Bug", "Fire","Water", "Grass", "Dragon", "Electric", "Fairy","Fighting","Flying","Ghost","Ground","Ice","Poison","Psychic","Rock","Steel"],
      selectAttributes: [],
      selectCrystal: [],
      //打击表 0 x2 1 x0.5 2无伤
      hitTable:{
        Normal:[[],["Rock","Steel"],["Ghost"]],
        Bug:[["Grass","Psychic","Dark"],["Fighting","Flying","Poison","Ghost","Steel","Fire","Fairy"],[]],
        Dark:[["Ghost","Psychic"],["Fighting","Fairy","Dark"],[]],
        Fire:[["Steel","Grass","Ice"],["Rock","Fire","Water","Dragon"],[]],
        Grass:[["Ground","Rock","Water"],["Flying","Poison","Bug","Steel","Fire","Grass","Dragon"],[]],
        Dragon:[["Dragon"],["Steel"],["Fairy"]],
        Electric:[["Flying","Water"],["Electric","Grass","Dragon"],["Ground"]],
        Fairy:[["Fighting","Dragon","Dark"],["Poison","Steel","Fire"],[]],
        Fighting:[["Normal","Rock","Steel","Ice","Dark"],["Flying","Poison","Bug","Fairy","Psychic"],["Ghost"]],
        Flying:[["Fighting","Bug","Grass"],["Rock","Steel","Electric"],[]],
        Ghost:[["Ghost","Psychic"],["Dark"],["Normal"]],
        Ground:[["Poison","Rock","Steel","Fire","Electric"],["Bug","Grass"],["Flying"]],
        Ice:[["Flying","Ground","Grass","Dragon"],["Steel","Fire","Water","Ice"],[]],
        Poison:[["Grass","Fairy"],["Poison","Ground","Rock","Ghost"],["Steel"]],
        Psychic:[["Fighting","Poison"],["Steel","Psychic"],["Dark"]],
        Rock:[["Flying","Bug","Fire","Ice"],["Fighting","Ground","Steel"],[]],
        Steel:[["Rock","Ice","Fairy"],["Steel","Fire","Water","Electric"],[]],
        Water:[["Ground","Rock","Fire"],["Water","Grass","Dragon"],[]],
      },
      //抗性表 0绝佳 1不行 2无伤
      beHitTable:{
        Normal:[["Fighting"],[],["Ghost"]],
        Bug:[["Flying","Rock","Fire"],["Fighting","Ground","Grass"],[]],
        Dark:[["Fighting","Bug","Fairy"],["Ghost","Dark"],["Psychic"]],
        Fire:[["Ground","Rock","Water"],["Bug","Steel","Fire","Grass","Ice","Fairy"],[]],
        Grass:[["Flying","Poison","Bug","Fire","Ice"],["Ground","Water","Grass","Electric"],[]],
        Dragon:[["Ice","Dragon","Fairy"],["Fire","Water","Grass","Electric"],[]],
        Electric:[["Ground"],["Flying","Steel","Electric"],[]],
        Fairy:[["Poison","Steel"],["Fighting","Bug","Dark"],["Dragon"]],
        Fighting:[["Flying","Fairy","Psychic"],["Rock","Bug","Dark"],[]],
        Flying:[["Rock","Electric","Ice"],["Fighting","Bug","Grass"],["Ground"]],
        Ghost:[["Ghost","Dark"],["Bug","Poison"],["Normal","Fighting"]],
        Ground:[["Water","Grass","Ice"],["Poison","Rock"],["Electric"]],
        Ice:[["Fighting","Rock","Steel","Fire"],["Ice"],[]],
        Poison:[["Ground","Psychic"],["Fighting","Poison","Bug","Grass","Fairy"],[]],
        Psychic:[["Bug","Ghost","Dark"],["Fighting","Psychic"],[]],
        Rock:[["Fighting","Ground","Steel","Fire","Grass"],["Normal","Flying","Poison","Fire"],[]],
        Steel:[["Fighting","Ground","Fire"],["Normal","Flying","Rock","Bug","Steel","Grass","Psychic","Ice","Dragon","Fairy"],["Poison"]],
        Water:[["Grass","Electric"],["Steel","Fire","Water","Ice"],[]],
      },
      //计算抗性
      hitRange:[],//打击范围
      weakPointRange:{
        x4: [],
        x2: [],
        x0: [],
        x05: [],
        x025: [],
      },//弱点范围
      recommend:[],//推荐属性
      LS: {
        'text-align': 'center',
        'font-weight': '600',
        'width': '50px',
        'word-break': 'keep-all'
      }
    }
  },
  computed:{

  },
  mounted() {
  },
  methods:{
    changeAttribute(item){
      if(this.selectAttributes.length < 2 && this.selectAttributes[0] != item){
        this.selectAttributes.push(item)
        this.compute()
      }
    },
    deleteAttribute(item){
      this.selectAttributes = this.selectAttributes.filter(t => t != item)
      this.compute()
    },
    emptySelectAttribute(){
      this.selectAttributes = []
      this.compute()
    },
    changeCrystal(item){
      if(this.selectCrystal.length < 1) {
        this.selectCrystal.push(item)
        this.compute()
      }else if(item != this.selectCrystal[0]){
        this.selectCrystal = [item]
        this.compute()
      }
    },
    emptySelectCrystal(){
      this.selectCrystal = []
      this.compute()
    },
    compute(){
      this.hitRange = []
      this.weakPointRange.x0 = []
      this.weakPointRange.x05 = []
      this.weakPointRange.x2 = []
      this.weakPointRange.x4 = []
      this.recommend = []
      //弱点计算
      if(this.selectCrystal.length == 1){
        let tempX2 = this.beHitTable[this.selectCrystal[0]][0]
        let tempX05 = this.beHitTable[this.selectCrystal[0]][1]
        let tempX0 = this.beHitTable[this.selectCrystal[0]][2]
        this.weakPointRange.x2 = tempX2
        this.weakPointRange.x05 = tempX05
        this.weakPointRange.x0 = tempX0
        this.weakPointRange.x4 = []
        this.weakPointRange.x025 = []
      }else{
        let temp = {}
        this.selectAttributes.forEach(a => {
          this.beHitTable[a][0].forEach(b => {
            if(temp[b] == undefined)
              temp[b] = 2
            else
              temp[b] = temp[b] * 2
          })
          this.beHitTable[a][1].forEach(b => {
            if(temp[b] == undefined)
              temp[b] = 0.5
            else
              temp[b] = temp[b] * 0.5
          })
          this.beHitTable[a][2].forEach(b => {
            if(temp[b] == undefined)
              temp[b] = 0
            else
              temp[b] = temp[b] * 0
          })
        })
        let tempX2 = []
        let tempX05 = []
        let tempX0 = []
        let tempX4 = []
        let tempX025 = []
        Object.keys(temp).forEach(function(key){
          if(temp[key] == 4)
            tempX4.push(key)
          if(temp[key] == 2)
            tempX2.push(key)
          if(temp[key] == 0)
            tempX0.push(key)
          if(temp[key] == 0.5)
            tempX05.push(key)
          if(temp[key] == 0.25)
            tempX025.push(key)
        });
        this.weakPointRange.x0 = tempX0
        this.weakPointRange.x2 = tempX2
        this.weakPointRange.x4 = tempX4
        this.weakPointRange.x05 = tempX05
        this.weakPointRange.x025 = tempX025
      }
      //整理属性
      //打击面计算
      let tempHitRange = []
      this.selectAttributes.forEach(a => {
        tempHitRange = [...tempHitRange, ...this.hitTable[a][0]]
      })
      if(this.selectCrystal.length == 1){
        tempHitRange = [...tempHitRange, ...this.hitTable[this.selectCrystal[0]][0]]
      }
      this.hitRange = tempHitRange.filter(function(item, index, arr) {
        //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        return arr.indexOf(item, 0) === index;
      });
      //推荐计算
      let tempRecommend = [...this.weakPointRange.x4, ...this.weakPointRange.x2]
      tempRecommend.filter(item => !this.hitRange.includes(item))
      this.recommend = tempRecommend.filter(item => !this.hitRange.includes(item))
    }
  }
}
</script>

<style scoped>
</style>
