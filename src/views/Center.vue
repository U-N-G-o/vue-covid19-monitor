<script setup>
import NumberCard from '../components/NumberCard.vue';
import ChinaMap from '../components/ChinaMap.vue';

const props = defineProps({
  chinaMapData: Array,
  chinaTotal: Object,
})

console.log('props', props)

const { today, total } = props.chinaTotal

const data = [
  {
    label: '现有确诊',
    value: today.confirm
  },
  {
    label: '境外输入',
    value: today.input
  },
  {
    label: '无症状感染者',
    value: today.storeConfirm
  },
  {
    label: '累计确诊',
    value: total.confirm
  },
  {
    label: '累计治愈',
    value: total.heal
  },
  {
    label: '累计死亡',
    value: total.dead
  },
]
</script>

<template>
  <div class="h-full relative">
    <div class="absolute w-full flex justify-around">
      <NumberCard v-for="item in data" :label="item.label" :value="item.value" />
    </div>
    <ChinaMap :chinaMapData="props.chinaMapData" />
  </div>
</template>