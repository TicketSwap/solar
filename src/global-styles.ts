import { css } from '@emotion/react'
import { space, radius, color } from './theme'
import { baseTextStyles } from './components/Text'

export const globalStyles = css`
  :root {
    --space: rgb(0, 19, 25);
    --spaceDark: rgb(40, 56, 61);
    --spaceMedium: rgb(102, 113, 117);
    --spaceLight: rgb(153, 161, 163);
    --spaceLighter: rgb(204, 208, 209);
    --spaceLightest: rgb(229, 231, 232);
    --spaceMediumAlpha: rgba(0, 19, 25, 0.6);
    --spaceLightAlpha: rgba(0, 19, 25, 0.4);
    --spaceLighterAlpha: rgba(0, 19, 25, 0.2);
    --spaceLightestAlpha: rgba(0, 19, 25, 0.1);

    --nova: rgb(255, 255, 255);
    --novaLight: rgb(255, 255, 255);
    --novaLightAlpha: rgba(255, 255, 255, 0.6);
    --novaLighterAlpha: rgba(255, 255, 255, 0.4);
    --novaLightestAlpha: rgba(255, 255, 255, 0.2);

    --stardust: rgb(245, 245, 246);
    --stardustLight: rgb(247, 247, 248);
    --stardustLighter: rgb(251, 251, 252);
    --stardustLightAlpha: rgba(245, 245, 246, 0.8);
    --stardustLighterAlpha: rgba(245, 245, 246, 0.32);

    --earth: rgb(0, 182, 240);
    --earthLight: rgb(51, 197, 243);
    --earthLighter: rgb(153, 226, 249);
    --earthLightest: rgb(214, 243, 252);
    --earthLightAlpha: rgba(0, 182, 240, 0.8);
    --earthLighterAlpha: rgba(0, 182, 240, 0.4);
    --earthLightestAlpha: rgba(0, 182, 240, 0.16);
    --earthFocusAlpha: rgba(0, 182, 240, 0.24);

    --sky: rgb(224, 246, 253);
    --skyAlpha: rgba(0, 182, 240, 0.12);
    --skyLight: rgb(240, 251, 254);
    --skyLightAlpha: rgba(0, 182, 240, 0.06);

    --titan: rgb(0, 206, 92);
    --titanLight: rgb(51, 216, 125);
    --titanLighter: rgb(153, 235, 190);
    --titanLightest: rgb(214, 247, 229);
    --titanLightAlpha: rgba(0, 206, 92, 0.8);
    --titanLighterAlpha: rgba(0, 206, 92, 0.4);
    --titanLightestAlpha: rgba(0, 206, 92, 0.16);
    --titanFocusAlpha: rgba(0, 206, 92, 0.24);

    --mars: rgb(254, 74, 73);
    --marsLight: rgb(254, 110, 109);
    --marsLighter: rgb(255, 183, 182);
    --marsLightest: rgb(254, 226, 226);
    --marsLightAlpha: rgba(254, 74, 73, 0.8);
    --marsLighterAlpha: rgba(254, 74, 73, 0.4);
    --marsLightestAlpha: rgba(254, 74, 73, 0.16);
    --marsFocusAlpha: rgba(254, 74, 73, 0.24);

    --sun: rgb(255, 166, 0);
    --sunLight: rgb(255, 184, 51);
    --sunLighter: rgb(255, 219, 153);
    --sunLightest: rgb(255, 241, 214);
    --sunLightAlpha: rgba(255, 166, 0, 0.8);
    --sunLighterAlpha: rgba(255, 166, 0, 0.4);
    --sunLightestAlpha: rgba(255, 166, 0, 0.16);
    --sunFocusAlpha: rgba(255, 166, 0, 0.24);

    --facebook: rgb(23, 119, 242);
    --facebookLight: rgb(69, 146, 245);
    --facebookFocusAlpha: rgba(23, 119, 242, 0.24);

    --twitter: rgb(56, 161, 243);
    --twitterLight: rgb(96, 180, 245);
    --twitterFocusAlpha: rgba(56, 161, 243, 0.24);

    --whatsapp: rgb(37, 211, 102);
    --whatsappFocusAlpha: rgba(37, 211, 102, 0.24);

    --shadowLighterAlpha: rgba(0, 19, 25, 0.2);
    --shadowLightestAlpha: rgba(0, 19, 25, 0.1);

    --gradientNova: rgba(255, 255, 255, 1);
    --gradientNovaAlpha: rgba(255, 255, 255, 0);
  }

  [data-theme='dark'] {
    --space: rgb(255, 255, 255);
    --spaceDark: rgb(209, 211, 212);
    --spaceMedium: rgb(163, 166, 169);
    --spaceLight: rgb(118, 122, 127);
    --spaceLighter: rgb(72, 77, 84);
    --spaceLightest: rgb(49, 55, 62);
    --spaceMediumAlpha: rgba(255, 255, 255, 0.6);
    --spaceLightAlpha: rgba(255, 255, 255, 0.4);
    --spaceLighterAlpha: rgba(255, 255, 255, 0.2);
    --spaceLightestAlpha: rgba(255, 255, 255, 0.1);

    --nova: rgb(26, 33, 41);
    --novaLightAlpha: rgba(26, 33, 41, 0.6);
    --novaLighterAlpha: rgba(26, 33, 41, 0.4);
    --novaLightestAlpha: rgba(26, 33, 41, 0.2);

    --stardust: rgb(13, 13, 13);
    --stardustLight: rgb(16, 17, 19);
    --stardustLighter: rgb(21, 25, 30);
    --stardustLightAlpha: rgba(13, 13, 13, 0.8);
    --stardustLighterAlpha: rgba(13, 13, 13, 0.4);

    --earth: rgb(0, 182, 240);
    --earthLight: rgb(5, 152, 200);
    --earthLighter: rgb(16, 93, 121);
    --earthLightest: rgb(22, 57, 73);
    --earthLightAlpha: rgba(0, 182, 240, 0.8);
    --earthLighterAlpha: rgba(0, 182, 240, 0.4);
    --earthLightestAlpha: rgba(0, 182, 240, 0.16);
    --earthFocusAlpha: rgba(0, 182, 240, 0.24);

    --sky: rgb(20, 52, 67);
    --skyLight: rgb(24, 42, 53);

    --titan: rgb(0, 206, 92);
    --titanLight: rgb(5, 171, 82);
    --titanLighter: rgb(16, 102, 61);
    --titanLightest: rgb(22, 61, 49);
    --titanLightAlpha: rgba(0, 206, 92, 0.8);
    --titanLighterAlpha: rgba(0, 206, 92, 0.4);
    --titanLightestAlpha: rgba(0, 206, 92, 0.16);
    --titanFocusAlpha: rgba(0, 206, 92, 0.24);

    --mars: rgb(254, 74, 73);
    --marsLight: rgb(208, 66, 67);
    --marsLighter: rgb(117, 49, 54);
    --marsLightest: rgb(62, 40, 46, 1);
    --marsLightAlpha: rgba(254, 74, 73, 0.8);
    --marsLighterAlpha: rgba(254, 74, 73, 0.4);
    --marsLightestAlpha: rgba(254, 74, 73, 0.16);
    --marsFocusAlpha: rgba(254, 74, 73, 0.24);

    --sun: rgb(255, 166, 0);
    --sunLight: rgb(209, 139, 8);
    --sunLighter: rgb(118, 86, 25);
    --sunLightest: rgb(63, 54, 34);
    --sunLightAlpha: rgba(255, 166, 0, 0.8);
    --sunLighterAlpha: rgba(255, 166, 0, 0.4);
    --sunLightestAlpha: rgba(255, 166, 0, 0.16);
    --sunFocusAlpha: rgba(255, 166, 0, 0.24);

    --facebook: rgb(23, 119, 242);
    --facebookLight: rgb(69, 146, 245);
    --facebookFocusAlpha: rgba(23, 119, 242, 0.24);

    --twitter: rgb(56, 161, 243);
    --twitterLight: rgb(96, 180, 245);
    --twitterFocusAlpha: rgba(56, 161, 243, 0.24);

    --whatsapp: rgb(37, 211, 102);
    --whatsappFocusAlpha: rgba(37, 211, 102, 0.24);

    --shadowLighterAlpha: rgba(0, 19, 25, 0.2);
    --shadowLightestAlpha: rgba(0, 19, 25, 0.1);

    --gradientNova: rgba(26, 33, 41, 1);
    --gradientNovaAlpha: rgba(26, 33, 41, 0);
  }

  ::selection {
    background-color: ${color.earth};
    color: ${color.nova};

    [data-theme='dark'] & {
      color: ${color.space};
    }
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
    ${baseTextStyles};
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

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li {
    color: ${color.space};
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
    color: ${color.space};
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
