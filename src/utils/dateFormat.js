// Converts DD/MM/YYYY to YYYY-MM-DD
export function formatToYMD(dateString) {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('/');
  if (!(day && month && year)) return dateString;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
