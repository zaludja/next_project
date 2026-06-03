export function formatDate(dateStr) {
  if (!dateStr) return null
  const [year, month, day] = dateStr.split('-')
  return `${day}.${month}.${year}`
}
