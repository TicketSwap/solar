import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { color } from '../../theme'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Container = styled.span`
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

const Image = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  animation-duration: 200ms;
  animation-fill-mode: both;
  animation-name: ${fadeIn};
  z-index: 2;
`

export const Flag = ({ countryCode }) => {
  const country = countryCode.toUpperCase()

  return (
    <Container className="flag">
      <Image
        src={`https://unpkg.com/flagkit-web@0.0.3/svgs/${country}.svg`}
        alt={`Flag of ${country}`}
      />
    </Container>
  )
}

Flag.propTypes = {
  countryCode: PropTypes.string.isRequired,
}
