export function parseDate(value: string | null) {
  if (value == null) return null;

  return `'${value}'`;
}
