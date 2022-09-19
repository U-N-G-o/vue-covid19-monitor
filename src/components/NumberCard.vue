<script setup>
import { formatNumber } from '../utils/formatter';

  const props = defineProps({
    label: String,
    value: Number
  })
</script>

<template>
  <el-card class="rounded-md" shadow="always">
    <div class="mb-[6px]">{{props.label}}</div>
    <span class="text-3xl font-bold">{{formatNumber(props.value)}}</span>
  </el-card>
</template>