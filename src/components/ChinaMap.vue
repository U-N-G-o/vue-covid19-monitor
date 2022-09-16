<script setup>
import chinaMapJson from '../assets/json/china.json'
import { ref, getCurrentInstance, onMounted } from 'vue'
import fetch from '../utils/fetch';

/** 通过网易提供接口：https://c.m.163.com/ug/api/wuhan/app/data/list-total 获取疫情数据 */
const list = await fetch('GET', '/ug/api/wuhan/app/data/list-total').then(res => res.data.data)

const chinaMap = ref()
const {proxy: { $echarts }} = getCurrentInstance()

/** 格式化接口中的 name 数据 */
const formatName = (name) => {
  switch(name) {
    case '上海':
    case '北京':
    case '天津':
    case '重庆':
      return name + '市';
    case '西藏':
    case '内蒙古':
      return name + '自治区';
    case '新疆':
      return name + '维吾尔自治区';
    case '广西':
      return name + '壮族自治区';
    case '宁夏':
      return name + '回族自治区';
    case '香港':
    case '澳门':
      return name + '特别行政区'
    default:
      return name + '省'
  }
}

onMounted(async() => {
  drawMap()
});

/** 筛选出中国的数据 */
const chinaData = list.areaTree.find(item => item.name === '中国')

/** 各地区的确诊人数 */
const confirmData = chinaData?.children.map(item => {
  const { total: { confirm, heal, dead } } = item
  return {
    name: formatName(item.name),
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
      zoom: 1.5, //初始化大小
      //缩放大小限制
      scaleLimit: {
        min: 1, //最小
        max: 2, //最大
      },
      //设置中心点
      center: [108, 35],
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
      left: 'right',
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
