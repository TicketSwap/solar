import React from 'react'
import styled from '@emotion/styled'
import { color, fontSize, space, fontWeight } from '../../theme'

export const Container = styled.span<PillProps>`
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
  color: ${p =>
    p.variant === 'danger'
      ? color.onFailure
      : p.variant === 'secondary'
      ? color.earth
      : p.variant === 'success'
      ? color.onSuccess
      : p.variant === 'warning'
      ? color.onWarning
      : p.variant === 'disabled'
      ? color.onInactive
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
      ? color.inactive
      : color.action};
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

export enum PillVariant {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  disabled = 'disabled',
}

export interface PillProps {
  variant?: PillVariant
  leftAdornment?: Element | React.ReactNode
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
