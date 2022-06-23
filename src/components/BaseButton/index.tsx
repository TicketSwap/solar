import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { space, color, fontWeight, radius, device, fontSize } from '../../theme'
import { baseTextStyles } from '../Text'
import { css } from '@emotion/react'

export enum ButtonVariant {
  info = 'info',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

export enum BaseButtonSize {
  medium = 'medium',
  small = 'small',
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  leftAdornment?: ReactNode
  variant?: keyof typeof ButtonVariant
  disabled?: boolean
  size?: keyof typeof BaseButtonSize
}

const StyledButton = styled.button<ButtonProps>`
  ${baseTextStyles};
  position: relative;
  display: inline-block;
  color: ${p =>
    p.disabled
      ? color.inactive
      : p.variant === ButtonVariant.success
      ? color.success
      : p.variant === ButtonVariant.danger
      ? color.failure
      : p.variant === ButtonVariant.warning
      ? color.warning
      : color.info};
  font-weight: ${fontWeight.semiBold};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  ${({ size }) =>
    size === BaseButtonSize.small &&
    css`
      font-size: ${fontSize[14]};
      font-weight: ${fontWeight.regular};

      @media ${device.tablet} {
        font-size: ${fontSize[16]};
      }
    `}

  &:hover,
  &:focus {
    outline: 0;
    box-shadow: none;
    opacity: 0.8;
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
    opacity: 0.6;
    box-shadow: 0 0 0 ${space[4]}
      ${p =>
        p.variant === ButtonVariant.success
          ? color.success
          : p.variant === ButtonVariant.danger
          ? color.failure
          : p.variant === ButtonVariant.warning
          ? color.warning
          : color.info};

    @media ${device.tablet} {
      top: -2px;
    }
  }
`

const Adornment = styled.span`
  margin-inline-start: -${space[4]};
  margin-inline-end: ${space[4]};

  & > span {
    margin-block-start: -2px;
  }
`

const BaseButton: React.FC<ButtonProps> = React.forwardRef(
  (
    { children, leftAdornment, size = BaseButtonSize.medium, ...props },
    ref: React.Ref<HTMLButtonElement>
  ) => (
    <StyledButton ref={ref} size={size} {...props}>
      {leftAdornment && <Adornment>{leftAdornment}</Adornment>}
      {children}
    </StyledButton>
  )
)

export { BaseButton }
