import React from 'react'
import styled from '@emotion/styled'
import { color } from '../../theme'
import { Image } from '../Image'

const StyledImage = styled(Image)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background-color: ${color.spaceLightest};
  border-radius: 2px;
  overflow: hidden;
  width: 21px;
  height: 15px;
  min-width: 21px;
  min-height: 15px;

  &::before {
    content: '';
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 0 1px ${color.spaceLightestAlpha} inset;
  }
`

export interface FlagProps {
  countryCode: string
}

export const Flag: React.FC<FlagProps> = ({ countryCode }) => {
  const country = countryCode.toUpperCase()

  return (
    <StyledImage
      src={`https://unpkg.com/flagkit-web@0.0.3/svgs/${country}.svg`}
      alt={`Flag of ${country}`}
    />
  )
}
