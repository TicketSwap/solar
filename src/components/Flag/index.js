import React from 'react'
import PropTypes from 'prop-types'
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
  width: ${props => (props.size ? `${props.size}px` : '21px')};
  height: ${props => (props.size ? `${props.size}px` : '15px')};
  min-width: ${props => (props.size ? `${props.size}px` : '21px')};
  min-height: ${props => (props.size ? `${props.size}px` : '15px')};

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

export const Flag = ({ countryCode }) => {
  const country = countryCode.toUpperCase()

  return (
    <StyledImage
      src={`https://unpkg.com/flagkit-web@0.0.3/svgs/${country}.svg`}
      alt={`Flag of ${country}`}
    />
  )
}

Flag.propTypes = {
  countryCode: PropTypes.string.isRequired,
}
