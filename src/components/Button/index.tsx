import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import {
  color,
  device,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  shadow,
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
}

export enum ButtonSize {
  large = 'large',
  medium = 'medium',
  small = 'small',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  leftAdornment?: ReactNode
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  active?: boolean
  as?: 'a'
  href?: string
}

interface StyledButtonProps extends ButtonProps {
  isSquare: boolean
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
  text-shadow: ${shadow.text};
  line-height: ${lineHeight.solid};
  align-items: center;

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &:focus::after {
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    background-color: transparent;
    border-radius: calc(${radius.md} + 1px);
    box-shadow: 0 0 0 ${space[4]} ${color.earthFocusAlpha};
    pointer-events: none;
  }

  &:active {
    outline: 0;
    background-image: none;
    background-color: ${color.earthLight};
  }

  &:hover {
    ${({ variant }) =>
      variant === ButtonVariant.primary &&
      css`
        color: ${color.nova};
        text-shadow: ${shadow.text};
        background-color: ${color.earthLight};
      `};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};

  ${({ size, isSquare, fullWidth }) =>
    size === ButtonSize.small &&
    css`
      height: ${space[24]};
      width: ${fullWidth ? '100%' : isSquare ? space[24] : 'auto'};
      font-size: ${fontSize[16]};
      padding: ${isSquare ? space[4] : `${space[4]} ${space[12]}`};
      border-radius: ${space[32]};

      &:focus::after {
        border-radius: calc(${space[32]} + 1px);
      }

      @media ${device.tablet} {
        height: ${space[32]};
        width: ${isSquare ? space[32] : 'auto'};
        padding: ${isSquare ? space[8] : `${space[8]} ${space[16]}`};
      }
    `}

  ${({ size, isSquare, fullWidth }) =>
    size === ButtonSize.medium &&
    css`
      height: ${space[44]};
      width: ${fullWidth ? '100%' : isSquare ? space[44] : 'auto'};
      font-size: ${fontSize[16]};
      padding: ${isSquare ? space[12] : `${space[12]} ${space[24]}`};
      border-radius: ${radius.md};
    `}
    
    ${({ size, isSquare, fullWidth }) =>
    size === ButtonSize.large &&
    css`
      height: ${space[56]};
      width: ${fullWidth ? '100%' : isSquare ? space[56] : 'auto'};
      font-size: ${fontSize[18]};
      padding: ${isSquare ? space[16] : `${space[16]} ${space[32]}`};
      border-radius: ${radius.md};
    `}

  background-color: ${color.earth};
  color: ${color.nova};

  [data-theme='dark'] & {
    color: ${color.space};
  }

  ${({ variant, active }) =>
    variant === ButtonVariant.secondary &&
    css`
      background-color: ${active ? color.earth : color.skyLightAlpha};
      color: ${active ? color.nova : color.earth};
      text-shadow: ${active ? shadow.text : 'none'};
      background-image: unset;

      [data-theme='dark'] & {
        color: ${active ? color.space : color.earth};
      }

      &:hover {
        background-color: ${active ? color.earthLight : color.skyAlpha};
        color: ${active ? color.nova : color.earth};
        text-shadow: ${active ? shadow.text : 'none'};

        [data-theme='dark'] & {
          color: ${color.space};
        }
      }

      &:active {
        background-color: ${active
          ? color.earthLight
          : color.earthLightestAlpha};
        color: ${active ? color.nova : color.earth};
        text-shadow: ${active ? shadow.text : 'none'};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.caution &&
    css`
      background-color: #fff4f4;
      color: ${color.mars};
      text-shadow: none;

      [data-theme='dark'] & {
        color: ${color.mars};
      }

      &:hover {
        background-color: #fee9e9;
      }

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.marsFocusAlpha};
      }

      &:active {
        background-color: ${color.marsLightest};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.success &&
    css`
      background-color: ${color.titan};

      &:hover {
        background-color: ${color.titanLight};
      }

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.titanFocusAlpha};
      }

      &:active {
        background-color: ${color.titanLight};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.warning &&
    css`
      background-color: ${color.sun};

      &:hover {
        background-color: ${color.sunLight};
      }

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.sunFocusAlpha};
      }

      &:active {
        background-color: ${color.sunLight};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.danger &&
    css`
      background-color: ${color.mars};

      &:hover {
        background-color: ${color.marsLight};
      }

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.marsFocusAlpha};
      }

      &:active {
        background-color: ${color.marsLight};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.facebook &&
    css`
      background-color: ${color.facebook};

      &:hover {
        background-color: ${color.facebookLight};
      }

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.facebookFocusAlpha};
      }

      &:active {
        background-color: ${color.facebookLight};
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.inverted &&
    css`
      text-shadow: none;
      background-color: ${color.nova};
      color: ${color.earth};

      svg {
        filter: none;
      }

      &:hover {
        color: ${color.earthLight};
        background-color: ${color.nova};
      }

      &:active {
        color: ${color.earth};
        background-color: ${color.nova};
      }

      [data-theme='dark'] & {
        color: ${color.earth};
        background-image: unset;

        &:hover,
        &:active {
          color: ${color.earthLight};
          background-image: unset;
        }
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.apple &&
    css`
      background-color: ${color.space};

      [data-theme='dark'] & {
        color: ${color.nova};
      }

      &:hover {
        background-color: ${color.spaceDark};
      }

      &:focus::after {
        box-shadow: 0 0 0 ${space[4]} ${color.spaceLighterAlpha};
      }

      &:active {
        background-color: ${color.spaceDark};
      }
    `};
`

interface LeftAdornmentProps {
  size: ButtonSize
  isSquare: boolean
}

const LeftAdornment = styled.span<LeftAdornmentProps>`
  margin-right: ${({ size }) =>
    size === ButtonSize.small ? space[4] : space[8]};
  line-height: 0;

  ${({ isSquare }) =>
    isSquare &&
    css`
      margin-right: 0;
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
      active = false,
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
        active={active}
        fullWidth={fullWidth}
        onClick={loading ? () => {} : onClick}
        {...props}
      >
        {hasAdornment && (
          <LeftAdornment size={size} isSquare={isSquare}>
            {loading ? <Spinner size={loadingIconSize} /> : leftAdornment}
          </LeftAdornment>
        )}
        {children}
      </StyledButton>
    )
  }
)
