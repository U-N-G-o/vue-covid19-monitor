<script setup>
import TrendChart from '../components/TrendChart.vue';
  const props = defineProps({
    chinaDayList: Object,
  })
</script>

<template>
  <div class="h-full flex flex-col">
    <TrendChart :china-day-list="props.chinaDayList" />
  </div>
</template>