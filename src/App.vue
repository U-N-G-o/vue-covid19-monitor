<script setup>
import LeftPanel from './views/LeftPanel.vue';
import Center from './views/Center.vue';
import { useData } from './hooks/useData';
import Loading from './views/Loading.vue';
import RightPanel from './views/RightPanel.vue';

const { chinaMapData, chinaTotal, chinaDayList, isLoading } = useData()

</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="h-[80px] flex justify-center items-center border-b-2 shadow">
      <span class="text-4xl font-bold">全国新冠肺炎疫情数据地图</span>
    </div>
    <div class="flex-1 mt-[8px] p-[5px] overflow-hidden">
      <Loading v-if="isLoading" />
      <el-row class="h-full" v-else>
        <el-col :span="6" >
          <LeftPanel :china-day-list="chinaDayList" />
        </el-col>
        <el-col :span="12">
          <Center :china-map-data="chinaMapData" :china-total="chinaTotal" />
        </el-col>
        <el-col :span="6">
          <RightPanel :china-map-data="chinaMapData" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
