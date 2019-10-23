import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { color, fontSize, space, fontWeight } from '../../theme'

export const Container = styled.span`
  position: relative;
  padding-left: ${p => (p.leftAdornment ? space[24] : space[8])};
  padding-right: ${space[8]};
  padding-top: 5px;
  padding-bottom: 3px;
  border-radius: ${space[32]};
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  letter-spacing: 0.05em;
  font-size: ${fontSize[14]};
  font-weight: ${fontWeight.bold};
  display: inline-flex;
  align-items: center;
  line-height: 1;
  text-transform: uppercase;
  color: ${p => (p.variant === 'secondary' ? color.earth : 'white')};
  background-color: ${p =>
    p.variant === 'danger'
      ? color.mars
      : p.variant === 'secondary'
      ? color.skyLight
      : p.variant === 'success'
      ? color.titan
      : p.variant === 'warning'
      ? color.sun
      : color.earth};
`

const LeftAdornment = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${28 / 16}rem;
`

export function Pill({ children, ...props }) {
  return (
    <Container {...props}>
      {props.leftAdornment && (
        <LeftAdornment>{props.leftAdornment}</LeftAdornment>
      )}
      {children}
    </Container>
  )
}

Pill.defaultProps = {
  variant: 'primary',
}

Pill.propTypes = {
  leftAdornment: PropTypes.element,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
  ]),
}
