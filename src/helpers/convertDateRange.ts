import { isValid, parse } from 'date-fns'

export default function (input: string): string[] {
  const [start, end] = input.split(' a ')

  const parseDate = (dateStr: string) => parse(dateStr, 'dd-MM-yyyy', new Date())

  const isValidDate = (date: Date) => isValid(date)

  const startDate = parseDate(start.trim())
  const endDate = parseDate(end.trim())

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return ['', '']
  }

  return [start, end]
}
