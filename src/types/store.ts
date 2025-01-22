import type { Component } from 'vue'

export interface OkResponse {
  data: Record<string, object>
}

export interface Endpoint {
  reports: string
  'conditions[date][start_date]': string
  'conditions[date][end_date]': string
  previous_period: number
  granularity: string
}

export interface Card {
  isChart: boolean
  id: string
  name: string
  component: Component
  props: {
    title: string
    dataKey: string
    endpoint: Endpoint
  }
}
