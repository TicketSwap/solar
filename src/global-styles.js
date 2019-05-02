import { css } from 'styled-components'
import {
  fontWeight,
  device,
  fontSize,
  lineHeight,
  color,
  space,
  radius,
} from './theme'

export const globalStyles = css`
  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://cdn.ticketswap.com/static/fonts/ProximaNova-RegularWeb.woff2')
        format('woff2'),
      url('https://cdn.ticketswap.com/static/fonts/ProximaNova-RegularWeb.woff')
        format('woff');
    font-weight: ${fontWeight.regular};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://cdn.ticketswap.com/static/fonts/ProximaNova-RegularItWeb.woff2')
        format('woff2'),
      url('https://cdn.ticketswap.com/static/fonts/ProximaNova-RegularItWeb.woff')
        format('woff');
    font-weight: ${fontWeight.regular};
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://cdn.ticketswap.com/static/fonts/ProximaNova-SemiboldWeb.woff2')
        format('woff2'),
      url('https://cdn.ticketswap.com/static/fonts/ProximaNova-SemiboldWeb.woff')
        format('woff');
    font-weight: ${fontWeight.semiBold};
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url('https://cdn.ticketswap.com/static/fonts/ProximaNova-BoldWeb.woff2')
        format('woff2'),
      url('https://cdn.ticketswap.com/static/fonts/ProximaNova-BoldWeb.woff')
        format('woff');
    font-weight: ${fontWeight.bold};
    font-style: normal;
    font-display: swap;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    border: 0;
  }

  body {
    font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont,
      'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto,
      'segoe ui', arial, sans-serif;
    font-weight: ${fontWeight.regular};
    line-height: ${lineHeight.copy};
    font-size: ${fontSize[16]};
    hyphens: auto;
    color: ${color.space};

    @media ${device.tablet} {
      font-size: ${fontSize[18]};
    }
  }

  code,
  var,
  kbd,
  samp,
  tt,
  dir,
  listing,
  plaintext,
  xmp,
  abbr,
  acronym,
  blockquote,
  input,
  textarea,
  q {
    hyphens: none;
  }

  a {
    text-decoration: none;
    color: ${color.earth};
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
    border-radius: ${radius.md};

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 ${space[4]} ${color.earthFocusAlpha};
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ol,
  ul {
    list-style: none;
  }

  img,
  video {
    max-width: 100%;
  }

  img {
    border-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:after,
  blockquote:before,
  q:after,
  q:before {
    content: '';
    content: none;
  }
`
