import { color } from '../../theme'

const getVariantsFromColorName = (name: string) => {
  return Object.keys(color).filter(colorName => {
    return colorName.startsWith(name)
  })
}

export const getColorsArray = (name: string) => {
  const variants = getVariantsFromColorName(name)

  return variants.map(variant => ({ name: variant, color: color[variant] }))
}
