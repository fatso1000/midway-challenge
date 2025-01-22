<template>
  <BaseCard
    :isLoading="!!dashboardStore.cardLoading[dataKey]"
    cardClasses="col-span-2 row-span-2 max-md:col-span-1 max-md:row-span-1"
  >
    <div>
      <h2 className="card-title">{{ title }}</h2>
      <span class="text-xs text-base-content/50">Periodo de {{ dashboardStore.selectedDate }}</span>
    </div>
    <div class="flex flex-col">
      <div class="inline-flex items-center gap-1">
        <span class="text-2xl">{{
          n(data?.current_period.data[0].total_amount || 0.0, 'currency')
        }}</span>
        <MidwayBadge
          :amount="$n(data?.current_period.data[0].total_amount || 0.0, 'decimal')"
          :percentage="$n(data?.current_period.data[0].attributed_total || 0.0, 'decimal')"
        />
      </div>
      <PercentageDisplay
        :diferencia-porcentaje="diferenciaPorcentaje"
        :percentage-variation="percentageVariation"
        :show-label="true"
      />
    </div>
    <div v-if="isChartReady">
      <apexchart :options="chart.options" :series="chart.series"></apexchart>
    </div>
    <h2
      v-if="isChartEmpty"
      class="text-lg font-semibold text-center px-2 w-full h-full justify-center flex items-center"
    >
      No data available. Try refreshing the page or modifying your filters.
    </h2>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDashboardStore } from '@/stores/dashboard'
import getPercentageDifference from '@/helpers/getPercentageDifference'
import PercentageDisplay from '@/components/generics/PercentageDisplay/PercentageDisplay.vue'
import MidwayBadge from '@/components/generics/MidwayBadge/MidwayBadge.vue'
import BaseCard from '../BaseCard/BaseCard.vue'

import type { IncomeCardData } from '@/types'

const { n } = useI18n()
const dashboardStore = useDashboardStore()

const props = defineProps<{
  title: string
  dataKey: string
}>()

const data = ref<IncomeCardData | null>(null)
const percentageVariation = ref<string>('increase')
const isChartReady = ref(false)
const isChartEmpty = ref(false)

const chart = ref({
  series: [
    { name: 'Ingresos', color: '#3B82F6', data: [] as number[] },
    { name: 'Generados por Midway', color: '#E9E3D7', data: [] as number[] },
  ],
  options: {
    chart: {
      type: 'bar',
      width: '100%',
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
        dataLabels: { hideOverflowingLabels: true },
      },
    },
    xaxis: { type: 'datetime', categories: [] as string[] },
    yaxis: [
      {
        labels: {
          formatter: (value: number) => n(value, 'decimal'),
        },
      },
    ],
    legend: {
      position: 'bottom',
      offsetY: 10,
      markers: { shape: 'circle' },
    },
    fill: { opacity: 1 },
  },
})

const diferenciaPorcentaje = computed(() => {
  const currentAmount = data.value?.current_period.data[0].total_amount || 0
  const previousAmount = data.value?.previous_period.data[0].total_amount || 0
  return getPercentageDifference(currentAmount, previousAmount)
})

watch(diferenciaPorcentaje, (newValue) => {
  percentageVariation.value = newValue.tipo
})

watch(dashboardStore, (store) => {
  if (!store.cardLoading[props.dataKey] && !store.cardLoading[`${props.dataKey}_daily`]) {
    data.value = store.cardData[props.dataKey] as IncomeCardData
  }
  if (store.cardError[props.dataKey + '_daily']) {
    setChartEmpty(true)
  } else if (!store.cardLoading[props.dataKey + '_daily']) {
    const dailyData = store.cardData[`${props.dataKey}_daily`] as IncomeCardData | undefined

    if (dailyData?.current_period?.data_formatted) {
      updateChart(dailyData)
    } else {
      setChartEmpty(true)
    }
  }
})

function setChartEmpty(value: boolean) {
  isChartEmpty.value = value
}

function updateChart(dailyData: IncomeCardData) {
  chart.value.series[0].data = dailyData.current_period.data_formatted.total_amount || []
  chart.value.series[1].data = dailyData.current_period.data_formatted.attributed_total || []
  chart.value.options.xaxis.categories = dailyData.current_period.data_formatted.date || []
  setChartEmpty(false)
  isChartReady.value = true
}
</script>
