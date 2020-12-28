import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  fontWeight,
  lineHeight,
  fontSize,
  device,
  fontStack,
  color,
} from '../../theme'

export const baseTextStyles = css`
  font-family: ${fontStack};
  font-weight: ${fontWeight.regular};
  line-height: ${lineHeight.copy};
  color: ${color.space};
  font-size: ${fontSize[16]};

  @media ${device.tablet} {
    font-size: ${fontSize[18]};
  }
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
