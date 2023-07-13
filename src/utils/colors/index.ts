/**
 * Utility function to apply transparency to a color (variable) using `color-mix`
 * @param {string} color - The color to make transparent. Can be a theme variabale, a hex code or "currentColor"
 * @param {number} opacity - The desired opacity, a number between 0 and 1
 */
export const transparentize = (color: string, opacity: number) => {
  const parsedColor = color === 'currentColor' ? 'currentColor' :
                      color.charAt(0) === '#' ? color : 
                      color.indexOf('var(--') !== -1 ? color : `var(--${color})`
  
  const parsedOpacity = 100 - (opacity * 100)

  return `color-mix(in srgb, ${parsedColor}, transparent ${parsedOpacity}%)`
}

export const transparentGradient = (color: string, direction: string, fromOpacity: number, toOpacity: number) => {
  const parsedColor = color === 'currentColor' ? 'currentColor' :
                      color.charAt(0) === '#' ? color : 
                      color.indexOf('var(--') !== -1 ? color : `var(--${color})`
  
  const parsedFromOpacity = 100 - (fromOpacity * 100)
  const parsedToOpacity = 100 - (toOpacity * 100)

  return `linear-gradient(
            ${direction},
            color-mix(in srgb, ${parsedColor}, transparent ${parsedFromOpacity}%),
            color-mix(in srgb, ${parsedColor}, transparent ${parsedToOpacity}%)
          )`
}