import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import {
  color,
  device,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  space,
} from '../../theme'
import { css } from '@emotion/react'
import { Spinner } from '../Spinner'

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  caution = 'caution',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  facebook = 'facebook',
  inverted = 'inverted',
  apple = 'apple',
  google = 'google',
}

export enum ButtonSize {
  large = 'large',
  medium = 'medium',
  small = 'small',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof ButtonVariant
  leftAdornment?: ReactNode
  size?: keyof typeof ButtonSize
  fullWidth?: boolean
  loading?: boolean
  active?: boolean
  as?: 'a'
  href?: string
}

interface StyledButtonProps extends ButtonProps {
  isSquare: boolean
}

const spinnerColor = {
  primary: color.onAction,
  secondary: color.action,
  caution: color.failure,
  success: color.onAction,
  warning: color.onAction,
  danger: color.onAction,
  facebook: color.onAction,
  inverted: color.action,
  apple: color.invertedForeground,
  google: color.darkForeground,
}

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  font-family: inherit;
  font-weight: ${fontWeight.semiBold};
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.24),
    rgba(255, 255, 255, 0)
  );
  line-height: ${lineHeight.solid};
  align-items: center;

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &:focus::after {
    content: '';
    position: absolute;
    inset: -1px;
    background-color: transparent;
    border-radius: calc(${radius.md} + 1px);
    box-shadow: 0 0 0 ${space[4]} ${color.actionFocus};
    pointer-events: none;
  }

  &:active {
    outline: 0;
    background-image: none;
  }

  &:hover {
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.48),
      rgba(255, 255, 255, 0.24)
    );
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      text-shadow: none;
    `};

  ${({ size, isSquare, fullWidth }) =>
    size === ButtonSize.small &&
    css`
      block-size: ${space[24]};
      inline-size: ${fullWidth ? '100%' : isSquare ? space[24] : 'auto'};
      font-size: ${fontSize[16]};
      padding-block: ${space[4]};
      padding-inline: ${isSquare ? space[4] : space[12]};
      border-radius: ${space[32]};

      &:focus::after {
        border-radius: calc(${space[32]} + 1px);
      }

      @media ${device.tablet} {
        block-size: ${space[32]};
        inline-size: ${isSquare ? space[32] : 'auto'};
        padding-block: ${space[8]};
        padding-inline: ${isSquare ? space[8] : space[16]};
      }
    `}

  ${({ size, isSquare, fullWidth }) =>
    size === ButtonSize.medium &&
    css`
      block-size: ${space[44]};
      inline-size: ${fullWidth ? '100%' : isSquare ? space[44] : 'auto'};
      font-size: ${fontSize[16]};
      padding-block: ${space[12]};
      padding-inline: ${isSquare ? space[12] : space[24]};
      border-radius: ${radius.md};
    `}

  ${({ size, isSquare, fullWidth }) =>
    size === ButtonSize.large &&
    css`
      block-size: ${space[56]};
      inline-size: ${fullWidth ? '100%' : isSquare ? space[56] : 'auto'};
      font-size: ${fontSize[18]};
      padding-block: ${space[16]};
      padding-inline: ${isSquare ? space[16] : space[32]};
      border-radius: ${radius.md};
    `}

  ${({ variant }) =>
    variant === ButtonVariant.primary &&
    css`
      background-color: ${color.action};
      color: ${color.onAction};
    `};

  ${({ variant }) =>
    variant === ButtonVariant.secondary &&
    css`
      background-color: ${color.actionBackground};
      color: ${color.action};
      background-image: unset;

      &:hover {
        background-image: unset;
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.caution &&
    css`
      background-color: ${color.failureBackground};
      color: ${color.failure};

      [data-theme='dark'] & {
        background-image: unset;
      }

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.failureFocus};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.success &&
    css`
      background-color: ${color.success};
      color: ${color.onSuccess};

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.successFocus};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.warning &&
    css`
      background-color: ${color.warning};
      color: ${color.onWarning};

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.warningFocus};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.danger &&
    css`
      background-color: ${color.failure};
      color: ${color.onFailure};

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.failureFocus};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.inverted &&
    css`
      background-color: ${color.background};
      color: ${color.action};

      [data-theme='dark'] & {
        background-image: unset;
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.facebook &&
    css`
      background-color: #1777f2;
      color: #ffffff;

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} #1777f252;
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.apple &&
    css`
      background-color: ${color.foreground};
      color: ${color.background};

      [data-theme='dark'] & {
        &:focus::after {
          box-shadow: 0 0 0 ${space[4]} #ffffff52;
        }
      }

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} #1a212952;
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.google &&
    css`
      background-color: ${color.lightBackground};
      color: ${color.darkForeground};
      border: 1px solid ${color.lightElevatedBackground};
      background-image: unset;

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} #ccd0d152;
      }
    `};
`

interface LeftAdornmentProps {
  size: keyof typeof ButtonSize
  isSquare: boolean
}

const LeftAdornment = styled.span<LeftAdornmentProps>`
  margin-inline-end: ${({ size }) =>
    size === ButtonSize.small ? space[4] : space[8]};
  line-height: 0;

  ${({ isSquare }) =>
    isSquare &&
    css`
      margin-inline-end: 0;
    `}
`

export const Button: React.FC<ButtonProps> = React.forwardRef(
  (
    {
      children,
      leftAdornment,
      size = ButtonSize.large,
      variant = ButtonVariant.primary,
      loading = false,
      fullWidth = false,
      onClick,
      ...props
    },
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const isSquare = !Boolean(children)
    const hasAdornment = leftAdornment || loading
    const loadingIconSize = {
      small: 16,
      medium: 16,
      large: 24,
    }[size]

    return (
      <StyledButton
        ref={ref}
        size={size}
        isSquare={isSquare}
        variant={variant}
        fullWidth={fullWidth}
        onClick={loading ? () => {} : onClick}
        {...props}
      >
        {hasAdornment && (
          <LeftAdornment size={size} isSquare={isSquare}>
            {loading ? (
              <Spinner size={loadingIconSize} color={spinnerColor[variant]} />
            ) : (
              leftAdornment
            )}
          </LeftAdornment>
        )}
        {children}
      </StyledButton>
    )
  }
)
