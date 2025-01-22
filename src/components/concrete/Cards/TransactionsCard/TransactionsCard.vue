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
          $n(data?.current_period.data[0].sales_quantity || 0.0, 'decimal')
        }}</span>
        <MidwayBadge
          :amount="$n(data?.current_period.data[0].sales_quantity || 0.0, 'decimal')"
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
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import MidwayBadge from '@/components/generics/MidwayBadge/MidwayBadge.vue'
import PercentageDisplay from '@/components/generics/PercentageDisplay/PercentageDisplay.vue'
import getPercentageDifference from '@/helpers/getPercentageDifference'
import BaseCard from '../BaseCard/BaseCard.vue'

import type { TotalSalesQuantity, TransactionCardData } from '@/types'

const dashboardStore = useDashboardStore()

const props = defineProps<{
  title: string
  dataKey: string
}>()

const data = ref<TransactionCardData | null>(null)
const isChartReady = ref(false)

const chart = ref({
  series: [
    {
      name: 'Transacciones',
      color: '#3B82F6',
      data: [] as number[],
    },
    {
      name: 'Generados por Midway',
      color: '#E9E3D7',
      data: [] as number[],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      width: '100%',
      stacked: true,
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
        },
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [] as string[],
    },
    legend: {
      position: 'bottom',
      offsetY: 10,
      markers: {
        shape: 'circle',
      },
    },
    fill: {
      opacity: 1,
    },
  },
})

const diferenciaPorcentaje = computed(() =>
  getPercentageDifference(
    data.value?.current_period.data[0].sales_quantity,
    data.value?.previous_period.data[0].sales_quantity,
  ),
)

const percentageVariation = ref('increase')
watch(diferenciaPorcentaje, () => {
  percentageVariation.value = diferenciaPorcentaje.value.tipo
})

watch(dashboardStore, (store) => {
  if (!store.cardLoading[props.dataKey]) {
    data.value = store.cardData[props.dataKey] as TransactionCardData
  }
  if (!store.cardLoading[props.dataKey + '_daily']) {
    const dailyData = store.cardData[props.dataKey + '_daily'] as TotalSalesQuantity

    if (dailyData?.current_period?.data_formatted) {
      updateChart(dailyData)
    }
  }
})

function updateChart(dailyData: TotalSalesQuantity) {
  chart.value.series[0].data = dailyData.current_period.data_formatted.sales_quantity
  chart.value.series[1].data = dailyData.current_period.data_formatted.attributed_total
  chart.value.options.xaxis.categories = dailyData.current_period.data_formatted.date
  isChartReady.value = true
}
</script>
