import React from 'react'
import styled from '@emotion/styled'
import { Path } from './Path'
import { device } from '../../theme'

export const SvgWrapper = styled.div`
  display: inline-block;
  flex: none;
  width: 152px;
  height: 25px;
  position: relative;

  @media ${device.tablet} {
    width: 220px;
    height: 36px;
  }
`

export const InlineSvg = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: inherit;
  fill: currentColor;
`

export enum LogoVariants {
  default = 'default',
  lgbt = 'lgbt',
}

export interface LogoProps {
  variant?: LogoVariants
}

export const Logo = ({
  variant = LogoVariants.default,
  ...props
}: LogoProps) => (
  <SvgWrapper {...props}>
    <InlineSvg
      viewBox="0 0 244 40"
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
