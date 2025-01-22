import { format, subDays } from 'date-fns'

export const formatDateValue = (start_date: Date, end_date: Date) => {
  const startDate = format(start_date, 'dd-MM-yyyy')
  const endDate = format(end_date, 'dd-MM-yyyy')
  return `${startDate} a ${endDate}`
}

export default function (range: number) {
  const now = new Date()
  return formatDateValue(subDays(now, range), now)
}
