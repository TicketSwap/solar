export function fetchImage(src) {
  const image = new Image()
  return new Promise((resolve, reject) => {
    image.src = src
    image.onload = resolve
    image.onerror = reject
  })
}
