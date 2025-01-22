<template>
  <BaseCard
    :isLoading="!!dashboardStore.cardLoading[dataKey]"
    cardClasses="col-span-2 row-span-1 max-md:col-span-1 max-md:row-span-1"
  >
    <div>
      <h2 className="card-title">{{ title }}</h2>
      <span class="text-xs text-base-content/50">Periodo de {{ dashboardStore.selectedDate }}</span>
    </div>
    <div class="inline-flex gap-1 justify-between">
      <div class="flex flex-col">
        <div>
          <strong class="text-2xl">{{
            $n(data?.current_period.data[0].customers_quantity || 0, 'decimal')
          }}</strong>
        </div>
        <PercentageDisplay
          :diferencia-porcentaje="diferenciaPorcentaje"
          :percentage-variation="percentageVariation"
          :show-label="true"
        />
      </div>
      <div class="flex flex-col gap-0">
        <div class="inline-flex justify-between">
          <div class="flex flex-col">
            <span class="text-xs">Unicos</span>
            <strong class="text-sm">{{
              $n(+uniqueAndRecurrents.uniques.percentage, 'percent')
            }}</strong>
            <span class="text-xs text-base-content/50">{{
              uniqueAndRecurrents.uniques.nominal
            }}</span>
          </div>
          <div class="divider !gap-0 divider-horizontal">
            <span class="border-2 bg-base-100 rounded-full h-auto w-auto text-xs p-1"> vs </span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs">Recurrents</span>
            <strong class="text-sm">{{
              $n(+uniqueAndRecurrents.recurrents.percentage, 'percent')
            }}</strong>
            <span class="text-xs text-base-content/50">{{
              uniqueAndRecurrents.recurrents.nominal
            }}</span>
          </div>
        </div>
        <div>
          <progress
            class="progress progress-primary w-full"
            :value="
              Math.max(
                uniqueAndRecurrents.recurrents.percentage,
                uniqueAndRecurrents.uniques.percentage,
              ) * 100
            "
            max="100"
          ></progress>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '../BaseCard/BaseCard.vue'
import PercentageDisplay from '@/components/generics/PercentageDisplay/PercentageDisplay.vue'
import generateUniquesAndRecurrents from '@/helpers/generateUniquesAndRecurrents'
import getPercentageDifference from '@/helpers/getPercentageDifference'
import { useDashboardStore } from '@/stores/dashboard'
import type { ClientsCardData } from '@/types'
import { computed, ref, watch } from 'vue'

const dashboardStore = useDashboardStore()

const props = defineProps<{
  title: string
  dataKey: string
}>()

const data = ref<ClientsCardData | null>(null)

const diferenciaPorcentaje = computed(() =>
  getPercentageDifference(
    data.value?.current_period.data[0].customers_quantity,
    data.value?.previous_period.data[0].customers_quantity,
  ),
)
const percentageVariation = ref('increase')
watch(diferenciaPorcentaje, () => {
  percentageVariation.value = diferenciaPorcentaje.value.tipo
})

const uniqueAndRecurrents = computed(() => generateUniquesAndRecurrents())

watch(dashboardStore, () => {
  if (!dashboardStore.cardLoading[props.dataKey]) {
    data.value = dashboardStore.cardData[props.dataKey] as ClientsCardData
  }
})
</script>
