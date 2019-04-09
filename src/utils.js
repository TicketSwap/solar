export const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))

export const stopPropagation = e => e.stopPropagation()

export function isServer() {
  return !(typeof window !== 'undefined' && window.document)
}

export const debounce = (fn, time) => {
  let timeout

  return function() {
    const functionCall = () => fn.apply(this, arguments)
    clearTimeout(timeout)
    timeout = setTimeout(functionCall, time)
  }
}

export const clamp = (value, min, max) =>
  min < max
    ? value < min
      ? min
      : value > max
      ? max
      : value
    : value < max
    ? max
    : value > min
    ? min
    : value
