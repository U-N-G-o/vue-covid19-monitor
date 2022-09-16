<script setup>
import ChinaMap from './components/ChinaMap.vue'

</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="h-[80px] flex justify-center items-center">
      <span class="text-4xl font-bold">全国新冠肺炎疫情数据地图</span>
    </div>
    <div class="flex-1">
      <Suspense>
        <ChinaMap />
      </Suspense>
    </div>
  </div>
</template>
