<template>
  <div>
    <el-span v-for="(item, index) in attributes" :key="index">
      <el-button :style="'background-color: ' + property[item][1] + ';color: white;margin-left: 5px'" @click="click(item)" round>{{property[item][0]}}</el-button>
    </el-span>
  </div>
</template>

<script>
export default {
  name: "attribute",
  props:{
    attributes:{
      type: Array
    }
  },
  data(){
    return{
      property:{
        Normal:["一般","#9fa19f"],
        Bug:["虫","#91a119"],
        Dark:["恶","#50413f"],
        Fire:["火","#e62829"],
        Grass:["草","#3fa129"],
        Dragon:["龙","#5060e1"],
        Electric:["电","#fac000"],
        Fairy:["妖精","#ef70ef"],
        Fighting:["格斗","#ff8000"],
        Flying:["飞行","#81b9ef"],
        Ghost:["鬼","#704170"],
        Ground:["地面","#915121"],
        Ice:["冰","#3fd8ff"],
        Poison:["毒","#9141cb"],
        Psychic:["超能","#ef4179"],
        Rock:["岩石","#afa981"],
        Steel:["钢","#60a1b8"],
        Water:["水","#2980ef"]
      }
    }
  },
  methods:{
    click(item){
      this.$emit("click", item)
    }
  }
}
</script>

<style scoped>

</style>
