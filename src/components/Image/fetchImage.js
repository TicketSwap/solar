export function fetchImage(src) {
  const image = new Image()
  return new Promise((resolve, error) => {
    image.src = src
    image.onload = resolve
    image.onerror = error
  })
}
