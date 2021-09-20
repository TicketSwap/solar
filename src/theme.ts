import { css } from '@emotion/react'

export const color = {
  space: 'var(--space)',
  spaceDark: 'var(--spaceDark)',
  spaceMedium: 'var(--spaceMedium)',
  spaceMediumAlpha: 'var(--spaceMediumAlpha)',
  spaceLight: 'var(--spaceLight)',
  spaceLightAlpha: 'var(--spaceLightAlpha)',
  spaceLighter: 'var(--spaceLighter)',
  spaceLighterAlpha: 'var(--spaceLighterAlpha)',
  spaceLightest: 'var(--spaceLightest)',
  spaceLightestAlpha: 'var(--spaceLightestAlpha)',

  nova: 'var(--nova)',
  novaLight: 'var(--novaLight)',
  novaLightAlpha: 'var(--novaLightAlpha)',
  novaLighterAlpha: 'var(--novaLighterAlpha)',
  novaLightestAlpha: 'var(--novaLightestAlpha)',

  stardust: 'var(--stardust)',
  stardustLight: 'var(--stardustLight)',
  stardustLightAlpha: 'var(--stardustLightAlpha)',
  stardustLighter: 'var(--stardustLighter)',
  stardustLighterAlpha: 'var(--stardustLighterAlpha)',

  earth: 'var(--earth)',
  earthLight: 'var(--earthLight)',
  earthLightAlpha: 'var(--earthLightAlpha)',
  earthLighter: 'var(--earthLighter)',
  earthLighterAlpha: 'var(--earthLighterAlpha)',
  earthLightest: 'var(--earthLightest)',
  earthLightestAlpha: 'var(--earthLightestAlpha)',

  sky: 'var(--sky)',
  skyAlpha: 'var(--skyAlpha)',
  skyLight: 'var(--skyLight)',
  skyLightAlpha: 'var(--skyLightAlpha)',

  titan: 'var(--titan)',
  titanLight: 'var(--titanLight)',
  titanLightAlpha: 'var(--titanLightAlpha)',
  titanLighter: 'var(--titanLighter)',
  titanLighterAlpha: 'var(--titanLighterAlpha)',
  titanLightest: 'var(--titanLightest)',
  titanLightestAlpha: 'var(--titanLightestAlpha)',

  mars: 'var(--mars)',
  marsLight: 'var(--marsLight)',
  marsLightAlpha: 'var(--marsLightAlpha)',
  marsLighter: 'var(--marsLighter)',
  marsLighterAlpha: 'var(--marsLighterAlpha)',
  marsLightest: 'var(--marsLightest)',
  marsLightestAlpha: 'var(--marsLightestAlpha)',

  sun: 'var(--sun)',
  sunLight: 'var(--sunLight)',
  sunLightAlpha: 'var(--sunLightAlpha)',
  sunLighter: 'var(--sunLighter)',
  sunLighterAlpha: 'var(--sunLighterAlpha)',
  sunLightest: 'var(--sunLightest)',
  sunLightestAlpha: 'var(--sunLightestAlpha)',

  facebook: 'var(--facebook)',
  facebookLight: 'var(--facebookLight)',

  twitter: 'var(--twitter)',
  twitterLight: 'var(--twitterLight)',

  whatsapp: 'var(--whatsapp)',
}

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
}

export const shadow = {
  text: `0 1px 0 var(--shadowLightestAlpha)`,
  light: `0 1px 4px var(--shadowLightestAlpha)`,
  strong: `0 1px 2px var(--shadowLighterAlpha), 0 4px 12px var(--shadowLightestAlpha)`,
}

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
  88: '5.5rem',
  96: '6rem',
  128: '8rem',
  256: '16rem',
  512: '32rem',
  768: '48rem',
}

export const radius = {
  sm: space[4],
  md: space[8],
  lg: space[12],
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

export const gradients = {
  nova: 'var(--gradientNova)',
  novaAlpha: 'var(--gradientNovaAlpha)',
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

export const fullBleed = css`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`

export const resetFullBleed = css`
  width: auto;
  position: relative;
  left: auto;
  right: auto;
  margin-left: 0;
  margin-right: 0;
`
