import styled from '@emotion/styled'
import React from 'react'
import { color, device, fontSize, space } from '../..'
import { RadioProps } from './Radio'
import { RadioWithLabel } from './RadioWithLabel'

const Fieldset = styled.fieldset`
  display: grid;
  grid-gap: ${space[8]};
`

const Legend = styled.legend`
  margin-block-end: ${space[16]};
  font-size: ${fontSize[16]};
  color: ${color.foreground};

  @media ${device.tablet} {
    font-size: ${fontSize[18]};
  }
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
    {legend && <Legend>{legend}</Legend>}
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
