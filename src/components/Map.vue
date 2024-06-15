<script setup>
import { getLine, getMarkers } from '@/hooks/decorateMap.js'
import { onMounted, watch } from 'vue'
import { usePointStore } from '@/stores/points'
import { ref } from 'vue'
import {finalRoute} from '@/stores/city.js';

const Amap = ref(null)
const map = ref(null)

const pointStore = usePointStore()

let props = defineProps({
  isTransported: Boolean,
  startPoint: String,
  endPoint: String,
  resource: String,
  amount: Number,
})

// 监听 isTransported 的变化，当 isTransported 变为 true 时（按钮被点击时），开始绘制线路
watch(() => props.isTransported,() => {
  // 因为是异步操作，先保证 Amap 和 map 已经加载
  if (Amap.value && map.value && props.isTransported) {
    // 清空图中原先绘制的线路，并重新获取点
    map.value.clearMap()
    getMarkers(AMap, map.value, pointStore.allPointPosition)

    // ---------------------调用算法获取运输路线-----------------------------
    const allRoutes = finalRoute.value;
    // 路线会有多条，每条路线都是一个数组，数组中的每个元素是一个点位
    // 遍历数组绘制路线
    allRoutes.forEach((oneRoute) => {
      for (let i = 0; i < oneRoute.length - 1; i++) {
        getLine(Amap.value, map.value, [oneRoute[i], oneRoute[i + 1]])
      }
    })
  }
})

onMounted(() => {
  AMapLoader.load({
    key: "558c6b597d3ca113e53bbb5aa78f5d76",  // 申请好的Web端开发者Key，首次调用 load 时必填     
    version: "2.0",                 // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  }).then((AMap) => {
    Amap.value = AMap
    map.value = new AMap.Map('mapArea', {
      viewMode: '2D',  // 默认使用 2D 模式
      zoom: 5,  //初始化地图层级
      mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
      center: [112.5507, 37.8706]  //初始化地图中心点
    })

    // 获取初始物资点点位
    getMarkers(AMap, map.value, pointStore.allPointPosition)
  })
})

</script>
<template>
  <div id="mapArea">
  </div>
</template>

<style>
#mapArea {
  width: 100%;
  height: 100vh;
}
</style>
