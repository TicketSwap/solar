import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { space, color, fontWeight, radius, device } from '../../theme'
import { baseTextStyles } from '../Text'

const StyledButton = styled.button`
  ${baseTextStyles};
  position: relative;
  display: inline-block;
  color: ${p =>
    p.disabled
      ? color.spaceLight
      : p.variant === 'success'
      ? color.titan
      : p.variant === 'danger'
      ? color.mars
      : p.variant === 'warning'
      ? color.sun
      : color.earth};
  font-weight: ${fontWeight.semiBold};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover,
  &:focus {
    outline: 0;
    box-shadow: none;
    color: ${p =>
      p.disabled
        ? color.spaceLight
        : p.variant === 'success'
        ? color.titanLight
        : p.variant === 'danger'
        ? color.marsLight
        : p.variant === 'warning'
        ? color.sunLight
        : color.earthLight};
  }

  &:focus::after {
    content: '';
    position: absolute;
    left: -4px;
    right: -4px;
    top: -1px;
    bottom: 0;
    background-color: transparent;
    border-radius: ${radius.md};
    box-shadow: 0 0 0 ${space[4]}
      ${p =>
        p.variant === 'success'
          ? color.titanFocusAlpha
          : p.variant === 'danger'
          ? color.marsFocusAlpha
          : p.variant === 'warning'
          ? color.sunFocusAlpha
          : color.earthFocusAlpha};

    @media ${device.tablet} {
      top: -2px;
    }
  }
`

const Adornment = styled.span`
  margin-left: -${space[4]};
  margin-right: ${space[4]};

  & > span {
    margin-top: -2px;
  }
`

export const BaseButton = React.forwardRef(({ children, ...props }, ref) => (
  <StyledButton ref={ref} {...props}>
    {props.leftAdornment && <Adornment>{props.leftAdornment}</Adornment>}
    {children}
  </StyledButton>
))

BaseButton.propTypes = {
  variant: PropTypes.oneOf(['success', 'danger', 'warning']),
  leftAdornment: PropTypes.object,
}
