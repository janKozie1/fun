interface ParsingFunction<T> {
  (element?: T, index?: number, array?: Array<T>, stop?: () => void): void
}

export default async <T extends any>(
  array: Array<T>,
  func: ParsingFunction<T>
) => {
  let stop = false
  for await (const [i, el] of array.entries()) {
    await func(el, i, array, () => {
      stop = true
    })
    if (stop) return
  }
  return
}
