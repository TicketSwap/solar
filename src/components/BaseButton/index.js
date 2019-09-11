import styled from '@emotion/styled'
import { space, color, fontWeight, radius, device } from '../../theme'
import { baseTextStyles } from '../Text'

export const BaseButton = styled.button`
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
