import styled from '@emotion/styled'
import React, { ReactElement } from 'react'
import { space } from '../../theme'
import { Label } from '../Label'
import { Select, SelectProps } from './Select'

const Wrapper = styled.span`
  display: grid;
  grid-gap: ${space[4]};
`

export interface SelectWithAriaLabel extends SelectProps {
  id: string
  instruction?: ReactElement | null
  label?: string
}

interface SelectWithRequiredLabel
  extends Omit<SelectWithAriaLabel, 'aria-label'> {
  label: string
  'aria-label'?: string
}

export type SelectWithLabelProps = SelectWithAriaLabel | SelectWithRequiredLabel

export const SelectWithLabel = ({
  id,
  instruction = null,
  label,
  'aria-label': ariaLabel,
  ...props
}: SelectWithLabelProps) => {
  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select id={id} aria-label={(ariaLabel || label) as string} {...props} />
      {instruction}
    </Wrapper>
  )
}
