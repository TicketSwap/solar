import { create } from '@storybook/theming'

export default create({
  base: 'light',
  brandTitle: 'Solar Design System',
  brandUrl: 'https://ticketswap.com',
  brandImage:
    'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/downloads/bm-wm-hor-white-blue.png',

  // UI
  appBg: 'rgba(0, 182, 240, 0.08)',
  appContentBg: 'white',
  appBorderColor: 'white',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  // fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'rgba(0, 182, 240, 0.8)',
  barSelectedColor: 'rgb(0, 182, 240)',
  barBg: 'rgba(0, 182, 240, 0.25)',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,
})
