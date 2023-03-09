import React from 'react'
import styled from '@emotion/styled'
import { color } from '../../theme'
import { Image } from '../Image'

const StyledImage = styled(Image)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background-color: ${color.elevatedBackground};
  border-radius: 2px;
  overflow: hidden;
  inline-size: 21px;
  block-size: 15px;
  min-inline-size: 21px;
  min-block-size: 15px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.6;
    box-shadow: 0 0 0 1px ${color.strokeStrong} inset;
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
