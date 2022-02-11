import styled from '@emotion/styled'
import React from 'react'
import { color, device, fontSize, space } from '../..'
import { RadioWithLabel } from './RadioWithLabel'

const Fieldset = styled.fieldset`
  display: grid;
  grid-gap: ${space[8]};
`

const Legend = styled.legend`
  margin-bottom: ${space[16]};
  font-size: ${fontSize[16]};
  color: ${color.foreground};

  @media ${device.tablet} {
    font-size: ${fontSize[18]};
  }
`

export interface RadioOption {
  id: string
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  legend?: string
  name: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options = [],
  onChange,
  value,
  name,
  legend,
}) => {
  return (
    <Fieldset>
      {legend && <Legend>{legend}</Legend>}
      {options.map(option => (
        <RadioWithLabel
          key={option.id}
          onChange={onChange}
          name={name}
          value={option.value}
          id={option.id}
          checked={option.value === value}
          label={option.label}
          disabled={option.disabled}
        />
      ))}
    </Fieldset>
  )
}
