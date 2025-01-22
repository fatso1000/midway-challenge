import { defineStore } from 'pinia'
import { markRaw, ref } from 'vue'
import ApiService from '../helpers/apiService'
import getRangeDate from '@/helpers/getRangeDate'
import convertDateRange from '@/helpers/convertDateRange'

import IncomeCard from '@/components/concrete/Cards/IncomeCard/IncomeCard.vue'
import SaleAmountAverageCard from '@/components/concrete/Cards/SaleAmountAverageCard/SaleAmountAverageCard.vue'
import TwoColsSmallCard from '@/components/concrete/Cards/TwoColsSmallCard/TwoColsSmallCard.vue'
import TransactionsCard from '@/components/concrete/Cards/TransactionsCard/TransactionsCard.vue'
import PurchaseFrequencyCard from '@/components/concrete/Cards/PurchaseFrequencyCard/PurchaseFrequencyCard.vue'
import TotalSalesCard from '@/components/concrete/Cards/TotalSalesCard/TotalSalesCard.vue'
import BestSalesCard from '@/components/concrete/Cards/BestSalesCard/BestSalesCard.vue'
import type { Card, OkResponse } from '@/types/store'

export const useDashboardStore = defineStore('dashboardStore', () => {
  const selectedDate = ref<string | null>(getRangeDate(7))
  const cards = ref<Card[]>(getInitialCards())
  const cardData = ref<Record<string, object>>({})
  const cardLoading = ref<Record<string, boolean>>({})
  const cardError = ref<Record<string, string | null>>({})

  const onDateChange = (date: string) => {
    selectedDate.value = date
    fetchAllCardsData()
  }

  async function fetchAllCardsData() {
    cards.value.forEach((card) => {
      cardLoading.value[card.id] = true
      cardError.value[card.id] = null
    })
    cards.value.forEach(async (e) => {
      await fetchCardData(e)
    })
  }

  async function fetchCardData(card: Card) {
    const dateRange = convertDateRange(selectedDate.value as string)
    card.props.endpoint['conditions[date][start_date]'] = dateRange[0]
    card.props.endpoint['conditions[date][end_date]'] = dateRange[1]

    try {
      const response = await ApiService<OkResponse>({
        queryParams: card.props.endpoint as unknown as Record<string, string | number>,
      })
      cardData.value[card.id] = Object.values(response.data)[0]
    } catch (error) {
      cardError.value[card.id] =
        error instanceof Error ? error.message : 'An unexpected error occurred'
    } finally {
      cardLoading.value[card.id] = false
    }
  }

  return {
    cards,
    cardData,
    cardLoading,
    cardError,
    selectedDate,
    onDateChange,
    fetchCardData,
    fetchAllCardsData,
  }
})

function getInitialCards(): Card[] {
  const defaultEndpoint = {
    'conditions[date][start_date]': '',
    'conditions[date][end_date]': '',
    previous_period: 1,
  }

  return [
    {
      isChart: true,
      id: 'income_daily',
      name: 'Income',
      component: markRaw(IncomeCard),
      props: {
        title: 'Ingresos',
        dataKey: 'income',
        endpoint: { ...defaultEndpoint, reports: 'income', granularity: 'daily' },
      },
    },
    {
      isChart: true,
      id: 'total_sales_quantity_daily',
      name: 'Transactions',
      component: markRaw(TransactionsCard),
      props: {
        title: 'Transacciones',
        dataKey: 'total_sales_quantity',
        endpoint: { ...defaultEndpoint, reports: 'totalSalesQuantity', granularity: 'daily' },
      },
    },
    {
      isChart: false,
      id: 'income',
      name: 'Income',
      component: markRaw(IncomeCard),
      props: {
        title: 'Ingresos',
        dataKey: 'income',
        endpoint: { ...defaultEndpoint, reports: 'income', granularity: 'totally' },
      },
    },
    {
      isChart: false,
      id: 'total_sales_quantity',
      name: 'Transactions',
      component: markRaw(TransactionsCard),
      props: {
        title: 'Transacciones',
        dataKey: 'total_sales_quantity',
        endpoint: {
          ...defaultEndpoint,
          reports: 'totalSalesQuantity',
          granularity: 'totally',
        },
      },
    },
    {
      isChart: false,
      id: 'purchase_frequency',
      name: 'Purchase Frequency',
      component: markRaw(PurchaseFrequencyCard),
      props: {
        title: 'Frecuencia de compra',
        dataKey: 'purchase_frequency',
        endpoint: { ...defaultEndpoint, reports: 'purchaseFrequency', granularity: 'totally' },
      },
    },
    {
      isChart: false,
      id: 'sale_amount_average',
      name: 'Sale Amount Average',
      component: markRaw(SaleAmountAverageCard),
      props: {
        title: 'Promedio de venta',
        dataKey: 'sale_amount_average',
        endpoint: { ...defaultEndpoint, reports: 'averageSales', granularity: 'totally' },
      },
    },
    {
      isChart: false,
      id: 'clients',
      name: 'Clients',
      component: markRaw(TwoColsSmallCard),
      props: {
        dataKey: 'clients',
        title: 'Clientes',
        endpoint: {
          ...defaultEndpoint,
          reports: 'clientsTotal',
          granularity: 'totally',
        },
      },
    },
    {
      isChart: false,
      id: 'sales_by_day',
      name: 'Sales By Day',
      component: markRaw(TotalSalesCard),
      props: {
        dataKey: 'sales_by_day',
        title: 'Ventas totales por días',
        endpoint: {
          ...defaultEndpoint,
          reports: 'salesQuantityAndAmount',
          granularity: 'daily',
        },
      },
    },
    {
      isChart: false,
      id: 'best_sales_day',
      name: 'Best Sales Day',
      component: markRaw(BestSalesCard),
      props: {
        title: 'Mejores días de venta',
        dataKey: 'best_sales_day',
        endpoint: { ...defaultEndpoint, reports: 'bestSalesDays', granularity: 'totally' },
      },
    },
  ]
}
