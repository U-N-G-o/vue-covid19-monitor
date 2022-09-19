<script setup>
import LeftPanel from './views/LeftPanel.vue';
import Center from './views/Center.vue';
import { useData } from './hooks/useData';
import Loading from './views/Loading.vue';

const { chinaMapData, chinaTotal, chinaDayList, isLoading } = useData()

</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="h-[80px] flex justify-center items-center">
      <span class="text-4xl font-bold">全国新冠肺炎疫情数据地图</span>
    </div>
    <div class="flex-1">
      <Loading v-if="isLoading" />
      <el-row class="h-full" v-else>
        <el-col :span="6" >
          <LeftPanel :china-day-list="chinaDayList" />
        </el-col>
        <el-col :span="12">
          <Center :china-map-data="chinaMapData" :china-total="chinaTotal" />
        </el-col>
        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row>
    </div>
  </div>
</template>
