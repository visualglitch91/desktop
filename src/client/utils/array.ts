export function take<T>(arr: T[], length: number) {
  return arr.slice(0, Math.min(length, arr.length - 1));
}

export function takeRight<T>(arr: T[], length: number) {
  return arr.slice(Math.max(arr.length - length, 0));
}
