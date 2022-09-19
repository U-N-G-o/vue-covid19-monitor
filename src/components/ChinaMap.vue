<script setup>
import chinaMapJson from '../assets/json/china.json'
import { ref, getCurrentInstance, onMounted } from 'vue'
import { formatProvinceName } from '../utils/formatter'

const props = defineProps({
  chinaMapData: Array,
})

const chinaMap = ref()
const {proxy: { $echarts }} = getCurrentInstance()

onMounted(() => {
  drawMap()
});

/** 各地区的确诊人数 */
const confirmData = props.chinaMapData?.children.map(item => {
  const { total: { confirm, heal, dead } } = item
  return {
    name: formatProvinceName(item.name),
    /** 现有确诊 = 确诊人数 - 治愈人数 - 死亡人数 */
    value: confirm - heal - dead
  }
})

function drawMap() {
  const myChart = $echarts.init(chinaMap.value)
  $echarts.registerMap('china', chinaMapJson) //注册可用的地图
  const option = {
    geo: {
      map: 'china',
      roam: true, //是否允许缩放，拖拽
      zoom: 1.4, //初始化大小
      //缩放大小限制
      scaleLimit: {
        min: 1, //最小
        max: 2, //最大
      },
      //设置中心点
      center: [104, 35],
      itemStyle: {
        areaColor: '#1af9e5',
        color: 'red',
        borderColor: '#232652',
        borderWidth: 1,
      },
      //高亮状态
      emphasis: {
        itemStyle: {
          areaColor: '#374ba4',
          color: '#fff',
        },
      },
    },
    tooltip: {
      trigger: 'item',
    },
    visualMap: {
      left: 'left',
      type: 'piecewise',
      pieces: [
        {min: 10000, color: '#a50026' },
        {min: 1000, max: 9999, color: '#d73027'},
        {min: 500, max: 999, color: '#f46d43'},
        {min: 100, max: 499, color: '#fee090'},
        {min: 10, max: 99, color: '#ffffbf'},
        {min: 0, max: 9, color: '#abd9e9'}
      ],
    },
    //配置属性
    series: [
      {
        name: '确诊病例',
        type: 'map',
        map: 'china',
        geoIndex: 0,
        data: confirmData,
      }
    ],
  }
  myChart.setOption(option)
}
</script>

<template>
  <div ref="chinaMap" class="h-full"></div>
</template>
