import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { device, fontSize, color } from '../..'

export enum InstructionVariant {
  info = 'foregroundMuted',
  success = 'success',
  warning = 'warning',
  danger = 'failure',
}

type InstructionVariantString = keyof typeof InstructionVariant

interface WrapperProps {
  variant: InstructionVariantString
}

const Wrapper = styled.span<WrapperProps>`
  font-size: ${fontSize[14]};
  color: ${({ variant }) => color[InstructionVariant[variant]]};

  @media ${device.tablet} {
    font-size: ${fontSize[16]};
  }
`

export interface InstructionProps {
  variant?: InstructionVariantString
  children: ReactNode
}

export const Instruction = ({ children, variant = 'info' }: InstructionProps) => (
  <Wrapper variant={variant}>{children}</Wrapper>
)
