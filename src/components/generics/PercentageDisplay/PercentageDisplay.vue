<template>
  <div class="inline-flex gap-1 items-center text-xs">
    <Icon
      v-if="percentageVariation === 'increase'"
      icon="tabler:arrow-down"
      class="text-accent"
      width="20"
      height="20"
    />
    <Icon v-else class="text-error" icon="tabler:arrow-down" width="20" height="20" />
    <span :class="color">{{ $n(diferenciaPorcentaje.porcentaje, 'percent') }}</span>
    <span v-if="showLabel" class="text-[0.65rem]">vs periodo anterior</span>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed } from 'vue'

const props = defineProps<{
  showLabel: boolean
  percentageVariation: string
  diferenciaPorcentaje: {
    porcentaje: number
    tipo: string
  }
}>()

const color = computed(() =>
  props.percentageVariation === 'increase' ? 'text-accent' : 'text-error',
)
</script>
