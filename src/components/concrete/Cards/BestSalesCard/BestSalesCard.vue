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
  </BaseCard>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import type { BestSalesDaysData } from '@/types'
import { ref, watch } from 'vue'
import BaseCard from '../BaseCard/BaseCard.vue'

const dashboardStore = useDashboardStore()
const isChartReady = ref(false)

const props = defineProps<{
  title: string
  dataKey: string
}>()

const chart = ref({
  series: [
    {
      name: 'Ingresos',
      color: '#3B82F6',
      data: [] as number[],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      width: '100%',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
        dataLabels: {
          hideOverflowingLabels: true,
          total: {
            enabled: false,
          },
        },
      },
    },
    xaxis: {
      type: 'category',
      categories: [] as string[],
    },
    fill: {
      opacity: 1,
    },
  },
})

watch(dashboardStore, (store) => {
  if (!store.cardLoading[props.dataKey]) {
    const dailyData = store.cardData[props.dataKey] as BestSalesDaysData

    if (dailyData?.current_period?.data_formatted) {
      updateChart(dailyData)
    }
  }
})

function updateChart(dailyData: BestSalesDaysData) {
  chart.value.options.xaxis.categories = dailyData.current_period.data_formatted.date
  chart.value.series[0].data = dailyData.current_period.data_formatted.total
  isChartReady.value = true
}
</script>
