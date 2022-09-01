import React, { ReactElement } from 'react'
import { Label } from '../Label'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { Input, InputProps } from './Input'

const Wrapper = styled.span`
  display: grid;
  grid-gap: ${space[4]};
`

export interface InputWithAriaLabel extends InputProps {
  id: string
  instruction?: ReactElement
  label?: string
}

interface InputWithRequiredLabel
  extends Omit<InputWithAriaLabel, 'aria-label'> {
  label: string
  'aria-label'?: string
}

export type InputWithLabelProps = InputWithAriaLabel | InputWithRequiredLabel

export const InputWithLabel = ({
  id,
  instruction,
  label,
  'aria-label': ariaLabel,
  ...props
}: InputWithLabelProps) => (
  <Wrapper>
    {label && <Label htmlFor={id}>{label}</Label>}
    <Input id={id} aria-label={(ariaLabel || label) as string} {...props} />
    {instruction}
  </Wrapper>
)
