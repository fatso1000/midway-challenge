<template>
  <div className="badge badge-neutral gap-1 py-3 rounded-lg">
    <img :src="Midway" class="w-5 h-5" /> {{ amount }} ({{ percentage }}%)
  </div>
</template>

<script setup lang="ts">
import Midway from '../../../assets/midway-logo.png'

defineProps<{
  percentage: number | string
  amount: number | string
}>()
</script>
