<template>
  <BaseCard
    :isLoading="!!dashboardStore.cardLoading[dataKey]"
    cardClasses="col-span-3 row-span-2 max-md:col-span-1 max-md:row-span-1 max-lg:col-span-4"
  >
    <div>
      <h2 className="card-title">{{ title }}</h2>
      <span class="text-xs text-base-content/50">Periodo de {{ dashboardStore.selectedDate }}</span>
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
import { useDashboardStore } from '@/stores/dashboard'
import type { SalesByDayDataData } from '@/types'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseCard from '../BaseCard/BaseCard.vue'
const { n, d } = useI18n()

const dashboardStore = useDashboardStore()

const props = defineProps<{
  title: string
  dataKey: string
}>()

const data = ref<SalesByDayDataData | null>(null)
const isChartReady = ref(false)
const isChartEmpty = ref(false)

const chart = ref({
  options: {
    chart: {
      type: 'line',
      width: '100%',
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: [0, 4],
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    labels: [] as string[],
    yaxis: [
      {
        title: {
          text: 'Ventas',
        },
        labels: {
          formatter: function (value: number) {
            return n(value, 'currency')
          },
        },
      },
      {
        opposite: true,
        title: {
          text: 'Transacciones',
        },
        labels: {
          formatter: function (value: number) {
            return n(value, 'decimal')
          },
        },
      },
    ],
  },
  series: [
    {
      name: 'Transacciones',
      type: 'bar',
      color: '#3B82F6',
      data: [] as number[],
    },
    {
      name: 'Generadas por Midway',
      type: 'bar',
      color: '#E9E3D7',
      data: [] as number[],
    },
    {
      name: 'Ingresos',
      type: 'line',
      color: '#06BD31',
      data: [] as number[],
    },
  ],
})

watch(dashboardStore, (store) => {
  if (store.cardError[props.dataKey]) {
    setChartEmpty(true)
  } else if (!store.cardLoading[props.dataKey]) {
    const dailyData = store.cardData[props.dataKey] as SalesByDayDataData

    if (dailyData?.current_period?.data_formatted) {
      updateChart(dailyData)
    } else {
      setChartEmpty(true)
    }

    data.value = store.cardData[props.dataKey] as SalesByDayDataData
  }
})

function setChartEmpty(value: boolean) {
  isChartEmpty.value = value
}

function updateChart(dailyData: SalesByDayDataData) {
  const ingresos = dailyData.current_period.data_formatted.total_amount
  const midway = dailyData.current_period.data_formatted.attributed_total
  const transacciones = dailyData.current_period.data_formatted.sales_quantity

  chart.value.options.labels = dailyData.current_period.data_formatted.date.map((e) =>
    d(e, 'compact'),
  )
  chart.value.series[0].data = transacciones
  chart.value.series[1].data = midway
  chart.value.series[2].data = ingresos
  setChartEmpty(false)
  isChartReady.value = true
}
</script>
