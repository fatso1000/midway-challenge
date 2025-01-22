<template>
  <BaseCard
    :isLoading="!!dashboardStore.cardLoading[dataKey]"
    cardClasses="col-span-1 row-span-1 relative overflow-hidden"
  >
    <div class="flex flex-col gap-2 justify-between">
      <h2 className="card-title">{{ title }}</h2>
      <strong class="text-xl">{{
        $n(data?.current_period.data[0].average || 0, 'currency')
      }}</strong>
      <PercentageDisplay
        :diferencia-porcentaje="diferenciaPorcentaje"
        :percentage-variation="percentageVariation"
        :show-label="false"
      />
    </div>
    <Icon
      v-if="!dashboardStore.cardLoading[dataKey]"
      class="absolute text-primary -right-6 -bottom-4 text-4xl"
      icon="majesticons:money-hand-line"
      width="2.5em"
      height="2.5em"
    />
  </BaseCard>
</template>

<script setup lang="ts">
import PercentageDisplay from '@/components/generics/PercentageDisplay/PercentageDisplay.vue'
import getPercentageDifference from '@/helpers/getPercentageDifference'
import { useDashboardStore } from '@/stores/dashboard'
import type { SaleAmountAverageCardData } from '@/types'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed, ref, watch } from 'vue'
import BaseCard from '../BaseCard/BaseCard.vue'

const dashboardStore = useDashboardStore()

const props = defineProps<{
  title: string
  dataKey: string
}>()
const data = ref<SaleAmountAverageCardData | null>(null)

const diferenciaPorcentaje = computed(() =>
  getPercentageDifference(
    data.value?.current_period.data[0].average,
    data.value?.previous_period.data[0].average,
  ),
)
const percentageVariation = ref('increase')
watch(diferenciaPorcentaje, () => {})

watch(dashboardStore, () => {
  if (!dashboardStore.cardLoading[props.dataKey]) {
    data.value = dashboardStore.cardData[props.dataKey] as SaleAmountAverageCardData
  }
  if (data.value) {
    percentageVariation.value = diferenciaPorcentaje.value.tipo
  }
})
</script>
