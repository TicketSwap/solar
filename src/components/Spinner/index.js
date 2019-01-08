import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { Icon } from '../Icon'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Rotate = styled.div`
  animation: ${rotate} 1s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Spinner = ({ size, ...props }) => (
  <Rotate {...props}>
    <Icon glyph="spinner" size={size} />
  </Rotate>
)

Spinner.propTypes = {
  size: PropTypes.number,
}

Spinner.defaultProps = {
  size: 32,
}
