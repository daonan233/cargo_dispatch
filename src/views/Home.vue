<script setup>
import Map from '@/components/Map.vue'
import { nextTick, ref } from 'vue'
import { toRaw } from '@vue/reactivity'
import { usePointStore } from '@/stores/points.js'
import SideBar from '@/components/sideBar.vue';
import  {getDistanceObjects,citiesCap, cityIndex ,cityDistance,getPathPositions,finalRoute,useCapacityStore} from '@/stores/city.js';
import {BuildGraph,NewContract} from '@/stores/cal.js';


const pointStore = usePointStore()
const capacityStore = useCapacityStore();

// 各个选择框所对应的值
const startPoint = ref('')
const endPoint = ref('')
const resource = ref('')
const amount = ref(0)

let existGraph = ref();

const isTransported = ref(false)

const getCitys =() =>{
  console.log("开始计算！")
  const Map = getDistanceObjects(cityIndex ,cityDistance)
  //console.log(JSON.parse(JSON.stringify(capacityStore.citiesCap)))
  let caps = JSON.parse(JSON.stringify(capacityStore.citiesCap))
  const Graph = BuildGraph(caps,Map)
  existGraph = Graph
  let path = NewContract(Graph,{source: startPoint.value, destination: endPoint.value, amount: amount.value})
  console.log(Graph)
  console.log("打印路径：",path)
  finalRoute.value = getPathPositions(path)
  return path
}

const startTransport = () => {
  // 先判断是否选择了开始地点、结束地点和物资
  if (!startPoint.value || !endPoint.value || !resource.value) {
    alert('请先选择开始地点、结束地点和物资')
    return
  }

  // 判断开始地点和结束地点是否相同
  if (startPoint.value === endPoint.value) {
    alert('开始地点和结束地点不能相同！')
    return
  }
  getCitys();
  // 变换 isTransported 的值，触发 Map 组件的 watch 函数
  if (isTransported.value) {
    isTransported.value = false
    // 使用 nextTick 保证 isTransported 的值变化可以被监听到
    nextTick(() => {
      isTransported.value = true
    })
  }
  else isTransported.value = true
  pointStore.transferResources(startPoint.value,endPoint.value,resource.value,amount.value);

}




</script>

<template>
  <div>
    <side-bar />
  <div class="select-area">
    <!-- 选择框A -->
    <el-select v-model="startPoint" placeholder="请选择运输开始地点" size="large" style="width: 240px"><el-option
        v-for="(point, index) in pointStore.availablePoint" :key="index" :label="point" :value="point" />
    </el-select>
    <!-- 选择框B -->
    <el-select v-model="endPoint" placeholder="请选择运输结束地点" size="large" style="width: 240px"><el-option
        v-for="(point, index) in pointStore.availablePoint" :key="index" :label="point" :value="point" />
    </el-select>
    <!-- 运输物资选择框 -->
    <el-select v-model="resource" placeholder="请选择运输物资" size="large" style="width: 240px">
      <el-option label="物资A" value="resourceA"></el-option>
      <el-option label="物资B" value="resourceB"></el-option>
      <el-option label="物资C" value="resourceC"></el-option>
    </el-select>
    <!-- 物资数量选择框 -->
    <el-input-number v-model="amount" :min="1" :max="5000" />
    <el-button type="primary" size="large" @click="startTransport">开始运输</el-button>
  </div>
  <div class="mapArea">
    <Map :isTransported="isTransported" :startPoint="startPoint" :endPoint="endPoint" :resource="resource" :amount="amount"/>
  </div>
</div>
</template>

<style scoped>
.select-area {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
