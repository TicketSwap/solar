import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { color, fontSize, space, fontWeight } from '../../theme'

export const Container = styled.span<PillProps>`
  position: relative;
  padding-inline-start: ${p => (p.leftAdornment ? space[24] : space[8])};
  padding-inline-end: ${space[8]};
  padding-block-start: 5px;
  padding-block-end: 3px;
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
  color: ${p =>
    p.variant === 'danger'
      ? color.onFailure
      : p.variant === 'secondary'
      ? color.action
      : p.variant === 'success'
      ? color.onSuccess
      : p.variant === 'warning'
      ? color.onWarning
      : p.variant === 'disabled'
      ? color.inactive
      : color.onAction};
  background-color: ${p =>
    p.variant === 'danger'
      ? color.failure
      : p.variant === 'secondary'
      ? color.actionBackground
      : p.variant === 'success'
      ? color.success
      : p.variant === 'warning'
      ? color.warning
      : p.variant === 'disabled'
      ? color.inactiveBackground
      : color.action};
`

const LeftAdornment = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset-inline-start: 0;
  inset-block: 0;
  inline-size: ${28 / 16}rem;
`

export enum PillVariant {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  disabled = 'disabled',
}

export interface PillProps {
  variant?: keyof typeof PillVariant
  leftAdornment?: ReactNode
  children: ReactNode
}

const Pill: React.FC<PillProps> = ({ children, ...props }) => (
  <Container className="pill" {...props}>
    {props.leftAdornment && (
      <LeftAdornment>{props.leftAdornment}</LeftAdornment>
    )}
    {children}
  </Container>
)

export { Pill }
