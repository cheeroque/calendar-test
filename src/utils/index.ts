export function getArrayByLength(length: number) {
  return new Array(length).fill(null)
}

export function padNumber(value?: number | string, length = 2) {
  return String(value ?? '').padStart(length, '0')
}
