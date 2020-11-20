import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  fontWeight,
  lineHeight,
  fontSize,
  device,
  fontStack,
} from '../../theme'

export const baseTextStyles = css`
  font-family: ${fontStack};
  font-weight: ${fontWeight.regular};
  line-height: ${lineHeight.copy};
  color: inherit;
  font-size: ${fontSize[16]};

  @media ${device.tablet} {
    font-size: ${fontSize[18]};
  }

  /* Hyphenation */
  /* http://clagnut.com/blog/2395 */

  -webkit-hyphens: auto;
  -webkit-hyphenate-limit-before: 3;
  -webkit-hyphenate-limit-after: 3;
  -webkit-hyphenate-limit-chars: 6 3 3;
  -webkit-hyphenate-limit-lines: 2;
  -webkit-hyphenate-limit-last: always;
  -webkit-hyphenate-limit-zone: 8%;

  -moz-hyphens: auto;
  -moz-hyphenate-limit-chars: 6 3 3;
  -moz-hyphenate-limit-lines: 2;
  -moz-hyphenate-limit-last: always;
  -moz-hyphenate-limit-zone: 8%;

  -ms-hyphens: auto;
  -ms-hyphenate-limit-chars: 6 3 3;
  -ms-hyphenate-limit-lines: 2;
  -ms-hyphenate-limit-last: always;
  -ms-hyphenate-limit-zone: 8%;

  hyphens: auto;
  hyphenate-limit-chars: 6 3 3;
  hyphenate-limit-lines: 2;
  hyphenate-limit-last: always;
  hyphenate-limit-zone: 8%;
`

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: string
}

export const Text = styled.span<TextProps>`
  ${baseTextStyles};
`

export const SmallText = styled.span`
  ${baseTextStyles};
  font-size: ${fontSize[14]};

  @media ${device.tablet} {
    font-size: ${fontSize[16]};
  }
`
