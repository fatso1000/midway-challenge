// Generic Base Interfaces
export interface ResponseBase<TCurrent, TPrevious> {
  current_period: TCurrent
  previous_period: TPrevious
}

export interface PeriodBase<TData, TFormatted = undefined> {
  data: TData[]
  data_formatted: TFormatted
}

// Common Data Structures
export interface IncomeData {
  total_amount: number
  attributed_total: number
}

export interface TransactionData {
  sales_quantity: number
  attributed_total: number
}

export interface SalesByDayData {
  date: Date
  sales_quantity: number
  total_amount: number
  attributed_total: number
}

export interface PeriodDatum {
  date: string
  sales_quantity: number
  attributed_total: number
}

export interface Datum {
  date: string
  total: number
}

// Formatted Data Structures
export interface TotalSalesDataFormatted {
  date: string[]
  sales_quantity: number[]
  attributed_total: number[]
}

export interface IncomeDataFormatted {
  date: string[]
  total_amount: number[]
  attributed_total: number[]
}

export interface SalesByDayDataFormatted {
  total_amount: number[]
  date: string[]
  sales_quantity: number[]
  attributed_total: number[]
}

export interface DataFormatted {
  date: string[]
  total: number[]
}

// Specific Interfaces Using Generics
export type IncomeCardData = ResponseBase<
  PeriodBase<IncomeData, IncomeDataFormatted>,
  PeriodBase<IncomeData, IncomeDataFormatted>
>

export type TransactionCardData = ResponseBase<
  PeriodBase<TransactionData>,
  PeriodBase<TransactionData>
>

export type PurchaseFrequencyCardData = ResponseBase<
  PeriodBase<{ frequency: number }>,
  PeriodBase<{ frequency: number }>
>

export type SaleAmountAverageCardData = ResponseBase<
  PeriodBase<{ average: number }>,
  PeriodBase<{ average: number }>
>

export type ClientsCardData = ResponseBase<
  PeriodBase<{ customers_quantity: number }>,
  PeriodBase<{ customers_quantity: number }>
>

export type SalesByDayDataData = ResponseBase<
  PeriodBase<SalesByDayData, SalesByDayDataFormatted>,
  PeriodBase<SalesByDayData, SalesByDayDataFormatted>
>

export type TotalSalesQuantity = ResponseBase<
  PeriodBase<PeriodDatum, TotalSalesDataFormatted>,
  PeriodBase<PeriodDatum, TotalSalesDataFormatted>
>

export type BestSalesDaysData = ResponseBase<
  PeriodBase<Datum, DataFormatted>,
  PeriodBase<Datum, DataFormatted>
>
