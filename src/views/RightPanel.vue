<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';

const props = defineProps({
  chinaMapData: Object,
})

const {proxy: { $echarts }} = getCurrentInstance()

console.log('props.chinaMapData', props.chinaMapData)

const rankChart = ref()

const { children } = props.chinaMapData

const tableData =  children.map(item => {
  const { total: { confirm, heal, dead }, today: { confirm: newConfirm } } = item
  return {
    name: item.name,
    curConfirm: confirm - heal - dead,
    tatalConfirm: confirm,
    newConfirm,
    heal,
    dead
  }
})
</script>

<template>
  <el-table :data="tableData" class="border-2 shadow rounded-md w-full h-3/5 mr-[5px]">
    <el-table-column fixed prop="name" label="地区" width="80" />
    <el-table-column prop="curConfirm" label="现有确诊" width="100" />
    <el-table-column prop="tatalConfirm" label="确诊" width="100" />
    <el-table-column prop="newConfirm" label="新增确诊" width="80" />
    <el-table-column prop="heal" label="治愈" width="80" />
    <el-table-column prop="dead" label="死亡" width="80" />
  </el-table>
</template>