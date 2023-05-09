/*
  Removes accentuated characters from a string
  Credits: Lewis Diamond https://stackoverflow.com/a/37511463/5503094
*/
export function normalizeChars(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
