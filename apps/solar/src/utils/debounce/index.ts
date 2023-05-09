let timeoutId: number

export const debounce = (callback: Function, delay: number) => {
  const trigger = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(callback, delay)
  }

  trigger.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
  }

  return trigger
}
