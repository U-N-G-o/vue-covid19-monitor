<script setup>
import TrendChart from '../components/TrendChart.vue';
  const props = defineProps({
    chinaDayList: Object,
  })
</script>

<template>
  <div class="h-full flex flex-col px-[10px]">
    <suspense>
      <TrendChart :china-day-list="props.chinaDayList" />
    </suspense>
  </div>
</template>