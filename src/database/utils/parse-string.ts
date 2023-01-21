export function parseString(value: string | null) {
  if (value == null) return null;

  return `'${value}'`;
}
