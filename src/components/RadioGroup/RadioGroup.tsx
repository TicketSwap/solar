import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import { space } from '../..'
import { RadioProps } from './Radio'
import { RadioWithLabel } from './RadioWithLabel'
import { Label } from '../Label'

const Fieldset = styled.div`
  display: grid;
  grid-gap: ${space[4]};
`

export interface RadioOption
  extends Omit<RadioProps, 'id' | 'value' | 'label'> {
  id: string
  value: string
  label: ReactNode
}

export interface RadioGroupProps {
  options: RadioOption[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  legend?: string
  name: string
  instruction?: ReactNode
}

export const RadioGroup = ({
  options = [],
  onChange,
  value,
  name,
  legend,
  instruction,
}: RadioGroupProps) => (
  <Fieldset>
    {legend && <Label as="legend">{legend}</Label>}
    {options.map(option => (
      <RadioWithLabel
        key={option.id}
        onChange={onChange}
        name={name}
        checked={option.value === value}
        {...option}
      />
    ))}
    {instruction}
  </Fieldset>
)
