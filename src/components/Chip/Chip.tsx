import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  space,
  color,
  device,
  lineHeight,
  fontSize,
  fontWeight,
} from '../../theme'

const Content = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: auto;
`

interface ContainerProps {
  active: boolean
  compact: boolean
  hasStartAdornment: boolean
}

const Container = styled.span<ContainerProps>`
  --_accentColor: ${color.inactive};
  --_backgroundColor: ${color.background};

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border: 2px solid var(--_accentColor);
    border-radius: ${space[32]};
    pointer-events: none;
  }

  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding-inline: ${space[16]};
  padding-block: ${space[8]};
  gap: ${space[4]};
  background-color: var(--_backgroundColor);
  border-radius: ${space[32]};
  color: var(--_accentColor);
  max-width: ${space[144]};
  line-height: 20px;
  font-size: ${fontSize[14]};
  font-weight: ${fontWeight.semiBold};
  user-select: none;

  & > * {
    pointer-events: none;
  }

  & ${Content} {
    pointer-events: auto;
  }

  ${({ active }) =>
    active &&
    css`
      --_accentColor: ${color.action};
      --_backgroundColor: ${color.actionBackground};
    `}

  ${({ hasStartAdornment, compact }) =>
    hasStartAdornment &&
    compact &&
    css`
      > *:first-of-type {
        display: none;
      }

      @media ${device.tablet} {
        > *:first-of-type {
          display: block;
        }
      }
    `}

  @media ${device.tablet} {
    max-width: 240px;
    gap: ${space[8]};
    font-size: ${fontSize[16]};
    line-height: ${lineHeight.copy};
  }
`

export interface ChipProps {
  as?: 'button' | 'label'
  active?: boolean
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  compact?: boolean
}

interface ButtonChipProps
  extends ChipProps,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const Chip = ({
  as = 'button',
  active = false,
  startAdornment,
  endAdornment,
  compact = false,
  children,
  ...props
}: ButtonChipProps) => {
  return (
    <Container
      as={as}
      active={active}
      compact={compact}
      hasStartAdornment={Boolean(startAdornment)}
      {...props}
    >
      {startAdornment}

      <Content>{children}</Content>

      {endAdornment}
    </Container>
  )
}
