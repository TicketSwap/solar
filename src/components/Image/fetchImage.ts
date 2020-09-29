export function fetchImage(src: string, width?: number, height?: number) {
  const image = new Image(width, height)
  return new Promise((resolve, reject) => {
    image.src = src
    image.onload = resolve
    image.onerror = reject
  })
}
