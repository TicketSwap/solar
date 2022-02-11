import React from 'react'
import { Label } from '..'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { Input, InputProps } from './Input'

const Wrapper = styled.span`
  display: grid;
  grid-gap: ${space[4]};
`

export interface InputWithLabelProps extends Omit<InputProps, 'aria-label'> {
  id: string
  label: string
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({ id, label, ...props }) => (
  <Wrapper>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} aria-label={label} {...props} />
  </Wrapper>
)
