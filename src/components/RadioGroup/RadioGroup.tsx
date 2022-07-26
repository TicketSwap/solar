import styled from '@emotion/styled'
import React from 'react'
import { space } from '../..'
import { RadioProps } from './Radio'
import { RadioWithLabel } from './RadioWithLabel'
import { Label } from '../Label'

const Fieldset = styled.fieldset`
  display: grid;
  grid-gap: ${space[4]};
`

export interface RadioOption
  extends Omit<RadioProps, 'id' | 'value' | 'label'> {
  id: string
  value: string
  label: string
}

export interface RadioGroupProps {
  options: RadioOption[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  legend?: string
  name: string
}

export const RadioGroup = ({
  options = [],
  onChange,
  value,
  name,
  legend,
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
  </Fieldset>
)
