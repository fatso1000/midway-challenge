export default function (initialValue: number | undefined, compareValue: number | undefined) {
  if (!initialValue || !compareValue) {
    return {
      porcentaje: 0,
      tipo: 'decrease',
    }
  }

  const diferencia = compareValue - initialValue
  const porcentaje = (diferencia / initialValue) * 100
  const tipo = porcentaje > 0 ? 'increase' : 'decrease'

  return {
    porcentaje: Math.abs(Number(porcentaje.toFixed(2)) / 100),
    tipo,
  }
}
