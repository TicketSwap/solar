import { css } from '@emotion/react'

export const color = {
  brand: 'var(--brand)',
  onBrand: 'var(--onBrand)',
  foreground: 'var(--foreground)',
  foregroundMuted: 'var(--foregroundMuted)',
  foregroundSubtle: 'var(--foregroundSubtle)',
  background: 'var(--background)',
  elevatedBackground: 'var(--elevatedBackground)',
  action: 'var(--action)',
  actionBackground: 'var(--actionBackground)',
  onAction: 'var(--onAction)',
  success: 'var(--success)',
  successBackground: 'var(--successBackground)',
  onSuccess: 'var(--onSuccess)',
  successFocus: 'var(--successFocus)',
  warning: 'var(--warning)',
  warningBackground: 'var(--warningBackground)',
  onWarning: 'var(--onWarning)',
  warningFocus: 'var(--warningFocus)',
  failure: 'var(--failure)',
  failureBackground: 'var(--failureBackground)',
  onFailure: 'var(--onFailure)',
  failureFocus: 'var(--failureFocus)',
  info: 'var(--info)',
  infoBackground: 'var(--infoBackground)',
  onInfo: 'var(--onInfo)',
  infoFocus: 'var(--infoFocus)',
  inactive: 'var(--inactive)',
  inactiveBackground: 'var(--inactiveBackground)',
  onInactive: 'var(--onInactive)',
  inactiveFocus: 'var(--inactiveFocus)',
  accent: 'var(--accent)',
  stroke: 'var(--stroke)',
  strokeStrong: 'var(--strokeStrong)',
  shadow: 'var(--shadow)',
  invertedForeground: 'var(--invertedForeground)',
  invertedBackground: 'var(--invertedBackground)',
  earth: 'var(--earth)',
  titan: 'var(--titan)',
  sun: 'var(--sun)',
  mars: 'var(--mars)',
  lightBackground: 'var(--lightBackground)',
  lightElevatedBackground: 'var(--lightElevatedBackground)',
  lightForeground: 'var(--lightForeground)',
  lightForegroundMuted: 'var(--lightForegroundMuted)',
  darkBackground: 'var(--darkBackground)',
  darkElevatedBackground: 'var(--darkElevatedBackground)',
  darkForeground: 'var(--darkForeground)',
  darkForegroundMuted: 'var(--darkForegroundMuted)',
  overlay: 'var(--overlay)',
} as const

export const opacity = {
  statusBackgroundColor: .1,
  statusFocusColor: .5
} as const

export const fontStack = `'Proxima Nova', -apple-system, BlinkMacSystemFont,
'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto,
'segoe ui', arial, sans-serif`

export const fontSize = {
  12: '0.75rem',
  14: '0.875rem',
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  22: ' 1.375rem',
  24: '1.5rem',
  28: '1.75rem',
  32: '2rem',
  56: '3.5rem',
} as const

export const shadow = {
  text: `0 1px 0 var(--shadow)`,
  light: `0 1px 4px var(--shadow)`,
  strong: `0 1px 2px var(--shadow), 0 4px 12px var(--shadow)`,
} as const

export const space = {
  0: '0',
  4: '0.25rem',
  8: '0.5rem',
  12: '0.75rem',
  16: '1rem',
  24: '1.5rem',
  32: '2rem',
  40: '2.5rem',
  44: '2.75rem',
  48: '3rem',
  56: '3.5rem',
  64: '4rem',
  80: '5rem',
  88: '5.5rem',
  96: '6rem',
  128: '8rem',
  144: '9rem',
  256: '16rem',
  512: '32rem',
  768: '48rem',
} as const

export const radius = {
  sm: space[4],
  md: space[8],
  lg: space[12],
} as const

export const easing = {
  easeInQuad: 'cubic-bezier(.55, .085, .68, .53)',
  easeInCubic: 'cubic-bezier(.550, .055, .675, .19)',
  easeInQuart: 'cubic-bezier(.895, .03, .685, .22)',
  easeInQuint: 'cubic-bezier(.755, .05, .855, .06)',
  easeInExpo: 'cubic-bezier(.95, .05, .795, .035)',
  easeInCirc: 'cubic-bezier(.6, .04, .98, .335)',

  easeOutQuad: 'cubic-bezier(.25, .46, .45, .94)',
  easeOutCubic: 'cubic-bezier(.215, .61, .355, 1)',
  easeOutQuart: 'cubic-bezier(.165, .84, .44, 1)',
  easeOutQuint: 'cubic-bezier(.23, 1, .32, 1)',
  easeOutExpo: 'cubic-bezier(.19, 1, .22, 1)',
  easeOutCirc: 'cubic-bezier(.075, .82, .165, 1)',

  easeInOutQuad: 'cubic-bezier(.455, .03, .515, .955)',
  easeInOutCubic: 'cubic-bezier(.645, .045, .355, 1)',
  easeInOutQuart: 'cubic-bezier(.77, 0, .175, 1)',
  easeInOutQuint: 'cubic-bezier(.86, 0, .07, 1)',
  easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
  easeInOutCirc: 'cubic-bezier(.785, .135, .15, .86)',
} as const

export const duration = 200
export const transition = `${duration}ms ${easing.easeInOutCubic}`

export const lineHeight = {
  solid: 1,
  title: 1.25,
  titleLg: 1.125,
  copy: 1.5,
} as const

export const fontWeight = {
  regular: 400,
  semiBold: 600,
  bold: 700,
} as const

export const sizes = {
  mobile: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopM: 1280,
  laptopL: 1440,
  desktop: 2560,
} as const

export const gradients = {
  nova: 'var(--gradientNova)',
  novaAlpha: 'var(--gradientNovaAlpha)',
} as const

export const linearGradients = {
  dark: 'var(--linearGradientDark)',
  cover: 'var(--linearGradientCover)',
} as const

export const device = {
  mobile: `(min-width: ${sizes.mobile / 16}em)`,
  mobileM: `(min-width: ${sizes.mobileM / 16}em)`,
  mobileL: `(min-width: ${sizes.mobileL / 16}em)`,
  tablet: `(min-width: ${sizes.tablet / 16}em)`,
  laptop: `(min-width: ${sizes.laptop / 16}em)`,
  laptopM: `(min-width: ${sizes.laptopM / 16}em)`,
  laptopL: `(min-width: ${sizes.laptopL / 16}em)`,
  desktop: `(min-width: ${sizes.desktop / 16}em)`,
} as const

export const fullBleed = css`
  inline-size: 100vw;
  position: relative;
  inset-inline: 50%;
  margin-inline-start: -50vw;
  margin-inline-end: -50vw;
`

export const resetFullBleed = css`
  inline-size: auto;
  position: relative;
  inset-inline: auto;
  margin-inline-start: 0;
  margin-inline-end: 0;
`
