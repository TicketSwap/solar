import { createGlobalStyle } from 'styled-components'
import { fontWeight, device, space, fontSize, lineHeight, color } from './theme'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Proxima Nova";
    src: url('https://cdn.ticketswap.com/static/fonts/ProximaNova-RegularWeb.woff2') format('woff2'),
         url('https://cdn.ticketswap.com/static/fonts/ProximaNova-RegularWeb.woff') format('woff');
    font-weight: ${fontWeight.regular};
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: "Proxima Nova";
    src: url('https://cdn.ticketswap.com/static/fonts/ProximaNova-RegularItWeb.woff2') format('woff2'),
         url('https://cdn.ticketswap.com/static/fonts/ProximaNova-RegularItWeb.woff') format('woff');
    font-weight: ${fontWeight.regular};
    font-style: italic;
    font-display: fallback;
  }

  @font-face {
    font-family: "Proxima Nova";
    src: url('https://cdn.ticketswap.com/static/fonts/ProximaNova-SemiboldWeb.woff2') format('woff2'),
         url('https://cdn.ticketswap.com/static/fonts/ProximaNova-SemiboldWeb.woff') format('woff');
    font-weight: ${fontWeight.semiBold};
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: "Proxima Nova";
    src: url('https://cdn.ticketswap.com/static/fonts/ProximaNova-BoldWeb.woff2') format('woff2'),
         url('https://cdn.ticketswap.com/static/fonts/ProximaNova-BoldWeb.woff') format('woff');
    font-weight: ${fontWeight.bold};
    font-style: normal;
    font-display: fallback;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* https://twitter.com/LeaVerou/status/1045768279753666562 */
  *:focus:not(:focus-visible) { outline: none }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
    font-weight: ${fontWeight.regular};
    line-height: ${lineHeight.copy};
    font-size: ${fontSize[16]};
    hyphens: auto;

    @media ${device.tablet} {
      font-size: ${fontSize[18]};
    }
  }

  .fonts-loaded body {
    font-family: 'Proxima Nova', sans-serif;
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
  q {
    hyphens: none;
  }

  a {
    text-decoration: none;
    color: ${color.earth};
  }

  p {
    margin-top: 0;
    margin-bottom: ${space[32]};
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
  }
`
