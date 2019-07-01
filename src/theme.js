export const color = {
  space: 'rgb(0,19,25)',
  spaceMedium: 'rgb(102,113,117)',
  spaceLight: 'rgb(153,161,163)',
  spaceLighter: 'rgb(204,208,209)',
  spaceLightest: 'rgb(229,231,232)',
  spaceMediumAlpha: 'rgba(0,19,25,0.6)',
  spaceLightAlpha: 'rgba(0,19,25,0.4)',
  spaceLighterAlpha: 'rgba(0,19,25,0.2)',
  spaceLightestAlpha: 'rgba(0,19,25,0.1)',

  stardust: 'rgb(245,245,246)',
  stardustLight: 'rgb(247,247,248)',
  stardustLighter: 'rgb(251,251,252)',
  stardustLightAlpha: 'rgba(245,245,246,0.8)',
  stardustLighterAlpha: 'rgba(245,245,246,0.32)',

  earth: 'rgb(0,182,240)',
  earthLight: 'rgb(51,197,243)',
  earthLighter: 'rgb(153,226,249)',
  earthLightest: 'rgb(214,243,252)',
  earthLightAlpha: 'rgba(0,182,240,0.8)',
  earthLighterAlpha: 'rgba(0,182,240,0.4)',
  earthLightestAlpha: 'rgba(0,182,240,0.16)',
  earthFocusAlpha: 'rgba(0,182,240,0.24)',

  titan: 'rgb(0,206,92)',
  titanLight: 'rgb(51,216,125)',
  titanLighter: 'rgb(153,235,190)',
  titanLightest: 'rgb(214,247,229)',
  titanLightAlpha: 'rgba(0,206,92,0.8)',
  titanLighterAlpha: 'rgba(0,206,92,0.4)',
  titanLightestAlpha: 'rgba(0,206,92,0.16)',
  titanFocusAlpha: 'rgba(0,206,92,0.24)',

  mars: 'rgb(254,74,73)',
  marsLight: 'rgb(254,110,109)',
  marsLighter: 'rgb(255,183,182)',
  marsLightest: 'rgb(254,226,226)',
  marsLightAlpha: 'rgba(254,74,73,0.8)',
  marsLighterAlpha: 'rgba(254,74,73,0.4)',
  marsLightestAlpha: 'rgba(254,74,73,0.16)',
  marsFocusAlpha: 'rgba(254,74,73,0.24)',

  sun: 'rgb(255,166,0)',
  sunLight: 'rgb(255,184,51)',
  sunLighter: 'rgb(255,219,153)',
  sunLightest: 'rgb(255,241,214)',
  sunLightAlpha: 'rgba(255,166,0,0.8)',
  sunLighterAlpha: 'rgba(255,166,0,0.4)',
  sunLightestAlpha: 'rgba(255,166,0,0.16)',
  sunFocusAlpha: 'rgba(255,166,0,0.24)',

  facebook: 'rgb(23,119,242)',
  facebookLight: 'rgb(69,146,245)',
  facebookFocusAlpha: 'rgba(23,119,242,0.24)',

  twitter: 'rgb(56,161,243)',
  twitterLight: 'rgb(96,180,245)',
  twitterFocusAlpha: 'rgba(56,161,243,0.24)',
}

export const fontSize = {
  12: '0.75rem',
  14: '0.875rem',
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  24: '1.5rem',
  28: '1.75rem',
  32: '2rem',
  56: '3.5rem',
}

export const shadow = {
  text: `0 1px 0 ${color.spaceLightestAlpha}`,
  light: `0 1px 4px ${color.spaceLightestAlpha}`,
  strong: `0 1px 2px ${color.spaceLighterAlpha}, 0 4px 12px ${color.spaceLightestAlpha}`,
}

export const space = {
  0: '0',
  4: '0.25rem',
  8: '0.5rem',
  12: '0.75rem',
  16: '1rem',
  24: '1.5rem',
  32: '2rem',
  44: '2.75rem',
  48: '3rem',
  56: '3.5rem',
  64: '4rem',
  96: '6rem',
  128: '8rem',
  256: '16rem',
  512: '32rem',
  768: '48rem',
}

export const radius = {
  sm: space[4],
  md: space[8],
  lg: space[16],
}

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
}

export const easingFunctions = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  easeInQuint: t => t * t * t * t * t,
  easeOutQuint: t => 1 + --t * t * t * t * t,
  easeInOutQuint: t =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
}

export const duration = 200
export const transition = `${duration}ms ${easing.easeInOutCubic}`

export const lineHeight = {
  solid: 1,
  title: 1.25,
  titleLg: 1.125,
  copy: 1.5,
}

export const fontWeight = {
  regular: 400,
  semiBold: 600,
  bold: 700,
}

export const sizes = {
  mobile: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopM: 1280,
  laptopL: 1440,
  desktop: 2560,
}

export const device = {
  mobile: `(min-width: ${sizes.mobile / 16}em)`,
  mobileM: `(min-width: ${sizes.mobileM / 16}em)`,
  mobileL: `(min-width: ${sizes.mobileL / 16}em)`,
  tablet: `(min-width: ${sizes.tablet / 16}em)`,
  laptop: `(min-width: ${sizes.laptop / 16}em)`,
  laptopM: `(min-width: ${sizes.laptopM / 16}em)`,
  laptopL: `(min-width: ${sizes.laptopL / 16}em)`,
  desktop: `(min-width: ${sizes.desktop / 16}em)`,
}
