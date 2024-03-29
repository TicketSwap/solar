import { css } from '@emotion/react'
import { space, radius, color } from './theme'
import { baseTextStyles } from './components/Text'

export const globalStyles = css`
  :root {
    --earth50: #f0fbfe;
    --earth100: #d6f3fc;
    --earth200: #99e2f9;
    --earth300: #33c5f3;
    --earth400: #00b6f0;
    --earth500: #0598c8;
    --earth600: #2881a4;
    --earth700: #105d79;
    --earth800: #163949;
    --earth900: #182a35;
    --titan50: #eefcf4;
    --titan100: #d6f7e5;
    --titan200: #99ebbe;
    --titan300: #33d87d;
    --titan400: #00ce5c;
    --titan500: #05ab52;
    --titan600: #20975d;
    --titan700: #10663d;
    --titan800: #1b4b3c;
    --titan900: #163d31;
    --sun50: #fff8eb;
    --sun100: #fff1d6;
    --sun200: #ffdb99;
    --sun300: #ffb833;
    --sun400: #ffa600;
    --sun500: #d18b08;
    --sun600: #b17607;
    --sun700: #765619;
    --sun800: #3f3622;
    --sun900: #322b1b;
    --mars50: #fff4f4;
    --mars100: #ffe2e2;
    --mars200: #ffb7b6;
    --mars300: #fe6e6d;
    --mars400: #fe4a49;
    --mars500: #d04243;
    --mars600: #ac2b2c;
    --mars700: #753136;
    --mars800: #3e282e;
    --mars900: #31252c;
    --stardust50: #fbfbfc;
    --stardust100: #f5f5f6;
    --stardust200: #ececee;
    --stardust300: #e5e7e8;
    --stardust400: #ccd0d1;
    --stardust500: #99a1a3;
    --stardust600: #667175;
    --stardust700: #59616b;
    --stardust800: #3b424b;
    --stardust900: #1a2129;
    --nova: #ffffff;
    --space: #00131a;
    --overlay: #00000099;

    // Brand
    --brand: var(--earth400);
    --onBrand: var(--nova);

    // Foreground
    --foreground: var(--stardust900);
    --foregroundMuted: var(--stardust600);
    --foregroundSubtle: var(--stardust500);

    // Background
    --background: var(--nova);
    --elevatedBackground: var(--stardust100);

    // Action
    --action: var(--earth400);
    --actionBackground: var(--earth50);
    --onAction: var(--nova);
    --actionFocus: #00b6f052;
    --actionBackgroundAlpha12: #00b6f01f;

    // Success
    --success: var(--titan400);
    --successBackground: var(--titan50);
    --onSuccess: var(--nova);
    --successFocus: #00ce5c52;

    // Warning
    --warning: var(--sun400);
    --warningBackground: var(--sun50);
    --onWarning: var(--nova);
    --warningFocus: #ffa60052;

    // Failure
    --failure: var(--mars400);
    --failureBackground: var(--mars50);
    --onFailure: var(--nova);
    --failureFocus: #fe6e6d52;

    // Info
    --info: var(--earth400);
    --infoBackground: var(--earth50);
    --onInfo: var(--nova);
    --actionFocus: #00b6f052;

    // Inactive
    --inactive: var(--stardust500);
    --inactiveBackground: var(--stardust300);
    --onInactive: var(--stardust800);
    --inactiveFocus: #99a1a352;

    // Misc
    --accent: var(--mars400);
    --stroke: var(--stardust300);
    --strokeStrong: var(--stardust400);
    --shadow: #1a21291a;
    --invertedForeground: var(--nova);
    --invertedBackground: var(--stardust900);

    // Palette
    --earth: var(--earth400);
    --titan: var(--titan400);
    --sun: var(--sun400);
    --mars: var(--mars400);

    // Theme independent
    --lightBackground: var(--nova);
    --lightElevatedBackground: var(--stardust100);
    --lightForeground: var(--nova);
    --lightForegroundMuted: #ffffffcc;
    --darkBackground: var(--stardust900);
    --darkElevatedBackground: var(--space);
    --darkForeground: var(--stardust900);
    --darkForegroundMuted: #1a2129cc;

    // Gradients
    --linearGradientDark: rgba(0, 19, 25, 0.6) 0%, rgba(0, 19, 25, 0) 100%;
    --linearGradientCover: rgba(0, 19, 25, 1) 0%, rgba(0, 19, 25, 0.738) 19%,
      rgba(0, 19, 25, 0.541) 34%, rgba(0, 19, 25, 0.382) 47%,
      rgba(0, 19, 25, 0.278) 56.5%, rgba(0, 19, 25, 0.194) 65%,
      rgba(0, 19, 25, 0.126) 73%, rgba(0, 19, 25, 0.075) 80.2%,
      rgba(0, 19, 25, 0.042) 86.1%, rgba(0, 19, 25, 0.021) 91%,
      rgba(0, 19, 25, 0.008) 95.2%, rgba(0, 19, 25, 0.002) 98.2%,
      rgba(0, 19, 25, 0) 100%;

    @media (prefers-color-scheme: dark) {
      // Brand
      --brand: var(--earth400);
      --onBrand: var(--nova);

      // Foreground
      --foreground: var(--nova);
      --foregroundMuted: var(--stardust500);
      --foregroundSubtle: var(--stardust600);

      // Background
      --background: var(--stardust900);
      --elevatedBackground: var(--space);

      // Action
      --action: var(--earth400);
      --actionBackground: var(--earth800);
      --onAction: var(--nova);

      // Success
      --success: var(--titan400);
      --successBackground: var(--titan800);
      --onSuccess: var(--nova);

      // Warning
      --warning: var(--sun400);
      --warningBackground: var(--sun800);
      --onWarning: var(--nova);

      // Failure
      --failure: var(--mars400);
      --failureBackground: var(--mars800);
      --onFailure: var(--nova);

      // Info
      --info: var(--earth400);
      --infoBackground: var(--earth800);
      --onInfo: var(--nova);

      // Inactive
      --inactive: var(--stardust600);
      --inactiveBackground: var(--stardust800);
      --onInactive: var(--stardust300);

      // Misc
      --accent: var(--mars400);
      --stroke: var(--stardust800);
      --strokeStrong: var(--stardust700);
      --shadow: #00000073;
      --invertedForeground: var(--stardust900);
      --invertedBackground: var(--nova);

      // Palette
      --earth: var(--earth400);
      --titan: var(--titan400);
      --sun: var(--sun400);
      --mars: var(--mars400);

      // Theme independent
      --lightBackground: var(--nova);
      --lightElevatedBackground: var(--stardust100);
      --lightForeground: var(--nova);
      --lightForegroundMuted: #ffffffcc;
      --darkBackground: var(--stardust900);
      --darkElevatedBackground: var(--space);
      --darkForeground: var(--stardust900);
      --darkForegroundMuted: #1a2129cc;

      // Gradients
      --linearGradientDark: rgba(26, 33, 41, 0.6) 0%, rgba(26, 33, 41, 0) 100%;
      --linearGradientCover: rgba(26, 33, 41, 1) 0%, rgba(26, 33, 41, 0.738) 19%,
        rgba(26, 33, 41, 0.541) 34%, rgba(26, 33, 41, 0.382) 47%,
        rgba(26, 33, 41, 0.278) 56.5%, rgba(26, 33, 41, 0.194) 65%,
        rgba(26, 33, 41, 0.126) 73%, rgba(26, 33, 41, 0.075) 80.2%,
        rgba(26, 33, 41, 0.042) 86.1%, rgba(26, 33, 41, 0.021) 91%,
        rgba(26, 33, 41, 0.008) 95.2%, rgba(26, 33, 41, 0.002) 98.2%,
        rgba(26, 33, 41, 0) 100%;
    }
  }

  ::selection {
    background-color: ${color.brand};
    color: ${color.onBrand};
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-block: 0;
    margin-inline: 0;
    padding-block: 0;
    padding-inline: 0;
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
    color: ${color.foreground};
  }

  a {
    text-decoration: none;
    color: ${color.action};
  }

  button {
    padding-block: 0;
    padding-inline: 0;
    margin-block: 0;
    margin-inline: 0;
    border: none;
    font: inherit;
    color: ${color.action};
    background-color: transparent;
    cursor: pointer;
    border-radius: ${radius.md};

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 ${space[4]} ${color.actionFocus};
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
