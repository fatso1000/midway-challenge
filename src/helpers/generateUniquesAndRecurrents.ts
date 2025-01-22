type ValuePair = {
  nominal: number
  percentage: number
}

export default function (): { uniques: ValuePair; recurrents: ValuePair } {
  const uniqueNominal = Math.floor(Math.random() * 901) + 100 // Random between 100 and 1000
  const recurrentNominal = Math.floor(Math.random() * 901) + 100

  const totalNominal = uniqueNominal + recurrentNominal

  const uniquePercentage = ((uniqueNominal / totalNominal) * 100).toFixed(2)
  const recurrentPercentage = ((recurrentNominal / totalNominal) * 100).toFixed(2)

  return {
    uniques: { nominal: uniqueNominal, percentage: Number(uniquePercentage) / 100 },
    recurrents: { nominal: recurrentNominal, percentage: Number(recurrentPercentage) / 100 },
  }
}
