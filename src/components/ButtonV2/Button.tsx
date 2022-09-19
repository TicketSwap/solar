import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { fontWeight, space, fontSize, color, radius, device } from '../../theme'

export enum ButtonVariant {
  primary = 'primary',
  success = 'success',
  danger = 'danger',
}

export enum ButtonSize {
  large = 'large',
  medium = 'medium',
  small = 'small',
}

export enum ButtonWeight {
  full = 'full',
  outlined = 'outlined',
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${fontWeight.semiBold};
  line-height: 1;
  user-select: none;
  background-color: var(--background-color, var(--accent-color));
  border: 2px solid var(--border-color, var(--accent-color));
  color: var(--color);
  font-size: var(--font-size);
  padding-block: var(--padding-block);
  padding-inline: var(--padding-inline);
  border-radius: var(--border-radius);

  &:hover {
    background-color: var(--background-color-hover, var(--accent-color-hover));
    border-color: var(--border-color-hover, var(--accent-color-hover));
  }

  &:focus {
    box-shadow: 0 0 0 ${space[4]} var(--boxShadowColor);
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      text-shadow: none;
    `}

  ${({ size }) =>
    size === ButtonSize.small &&
    css`
      --font-size: ${fontSize[16]};
      --padding-block: ${space[4]};
      --padding-inline: ${space[12]};
      --border-radius: ${space[32]};

      @media ${device.tablet} {
        --padding-block: ${space[8]};
        --padding-inline: ${space[16]};
      }
    `}

  ${({ size }) =>
    size === ButtonSize.medium &&
    css`
      --font-size: ${fontSize[16]};
      --padding-block: ${space[12]};
      --padding-inline: ${space[24]};
      --border-radius: ${radius.md};
    `}

  ${({ size }) =>
    size === ButtonSize.large &&
    css`
      --font-size: ${fontSize[18]};
      --padding-block: ${space[16]};
      --padding-inline: ${space[32]};
      --border-radius: ${radius.md};
    `}

    ${({ square }) =>
    square &&
    css`
      --padding-inline: var(--padding-block);

      @media ${device.tablet} {
        --padding-inline: var(--padding-block);
      }
    `};

  ${({ variant }) =>
    variant === ButtonVariant.primary &&
    css`
      --accent-color: ${color.action};
      --accent-color-hover: var(--earth300);
      --muted-color: ${color.actionBackground};
      --color: ${color.onAction};
      --boxShadowColor: ${color.actionFocus};
    `}

  ${({ variant }) =>
    variant === ButtonVariant.success &&
    css`
      --accent-color: ${color.success};
      --accent-color-hover: var(--titan300);
      --muted-color: ${color.successBackground};
      --color: ${color.onSuccess};
      --boxShadowColor: ${color.successFocus};
    `}

  ${({ variant }) =>
    variant === ButtonVariant.danger &&
    css`
      --accent-color: ${color.failure};
      --accent-color-hover: var(--mars300);
      --muted-color: ${color.failureBackground};
      --color: ${color.onFailure};
      --boxShadowColor: ${color.failureFocus};
    `}

    ${({ weight }) =>
    weight === ButtonWeight.outlined &&
    css`
      --color: var(--accent-color);
      --background-color: transparent;
      --background-color-hover: var(--muted-color);
      --border-color-hover: var(--accent-color);
    `}
`

const Adornment = styled.span`
  margin-inline-end: ${space[8]};
`

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startAdornment?: ReactNode
  size?: keyof typeof ButtonSize
  variant?: keyof typeof ButtonVariant
  fullWidth?: boolean
  weight?: keyof typeof ButtonWeight
  square?: boolean
  className?: string
}

export const Button: FC<ButtonProps> = ({
  children,
  startAdornment,
  size = ButtonSize.large,
  variant = ButtonVariant.primary,
  fullWidth = false,
  square = false,
  weight = ButtonWeight.full,
  ...props
}) => (
  <StyledButton
    variant={variant}
    size={size}
    fullWidth={fullWidth}
    square={square}
    weight={weight}
    {...props}
  >
    {startAdornment && <Adornment>{startAdornment}</Adornment>}
    {children}
  </StyledButton>
)
