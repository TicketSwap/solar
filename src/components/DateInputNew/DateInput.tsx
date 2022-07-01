import React from 'react'
import styled from '@emotion/styled'
import { Input } from '../InputNew'
import { Select } from '../SelectNew'
import { space } from '../../theme'
import { SelectProps } from '../SelectNew/Select'
import { InputProps } from '../InputNew/Input'

interface MoneyInputProps {
  legend?: string
  dayProps: InputProps
  monthProps: SelectProps
  yearProps: InputProps
}

const Legend = styled.legend`
  margin-block-end: ${space[4]};
`

const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${space[8]};

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    appearance: none;
  }

  input[type='number'] {
    appearance: none;
  }
`

export const DateInput = ({ dayProps, monthProps, yearProps, legend }: MoneyInputProps) => {
  return (
    <Fieldset>
      {legend && <Legend>{legend}</Legend>}
      <Input {...dayProps} type="number" />
      <Select {...monthProps} />
      <Input {...yearProps} type="number" />
    </Fieldset>
  )
}
