import React from 'react'
import styled from '@emotion/styled'
import { Path } from './Path'
import { device } from '../../theme'

export const SvgWrapper = styled.div`
  display: inline-block;
  flex: none;
  inline-size: 152px;
  block-size: 25px;
  position: relative;

  @media ${device.tablet} {
    inline-size: 220px;
    block-size: 36px;
  }
`

export const InlineSvg = styled.svg`
  position: absolute;
  inset: 0;
  block-size: 100%;
  inline-size: 100%;
  color: inherit;
  fill: currentColor;
`

export enum LogoVariant {
  default = 'default',
  lgbt = 'lgbt',
}

export interface LogoProps {
  variant?: keyof typeof LogoVariant
}

export const Logo = ({
  variant = LogoVariant.default,
  ...props
}: LogoProps) => (
  <SvgWrapper {...props}>
    <InlineSvg
      viewBox="0 0 244 35"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="1.414"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      focusable="false"
    >
      <Path variant={variant} />
    </InlineSvg>
  </SvgWrapper>
)
