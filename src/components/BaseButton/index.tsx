import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { space, color, fontWeight, radius, device } from '../../theme'
import { baseTextStyles } from '../Text'

export enum ButtonVariant {
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  leftAdornment?: ReactNode
  variant?: ButtonVariant
  disabled?: boolean
}

const StyledButton = styled.button<ButtonProps>`
  ${baseTextStyles};
  position: relative;
  display: inline-block;
  color: ${p =>
    p.disabled
      ? color.spaceLight
      : p.variant === ButtonVariant.success
      ? color.titan
      : p.variant === ButtonVariant.danger
      ? color.mars
      : p.variant === ButtonVariant.warning
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
        : p.variant === ButtonVariant.success
        ? color.titanLight
        : p.variant === ButtonVariant.danger
        ? color.marsLight
        : p.variant === ButtonVariant.warning
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
        p.variant === ButtonVariant.success
          ? color.titanFocusAlpha
          : p.variant === ButtonVariant.danger
          ? color.marsFocusAlpha
          : p.variant === ButtonVariant.warning
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

const BaseButton: React.FC<ButtonProps> = React.forwardRef(
  (
    { children, leftAdornment, ...props },
    ref: React.Ref<HTMLButtonElement>
  ) => (
    <StyledButton ref={ref} {...props}>
      {leftAdornment && <Adornment>{leftAdornment}</Adornment>}
      {children}
    </StyledButton>
  )
)

export { BaseButton }
