import React from 'react'
import styled from '@emotion/styled'
import { Input } from '../InputNew'
import { Select } from '../SelectNew'
import { space } from '../../theme'
import { SelectProps } from '../SelectNew/Select'
import { InputProps } from '../InputNew/Input'

interface MoneyInputProps {
  legend?: string
  currencyProps: SelectProps
  amountProps: InputProps
}

const Legend = styled.legend`
  margin-block-end: ${space[4]};
`

const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: ${space[8]};

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    appearance: none;
  }

  input[type='number'] {
    appearance: none;
  }
`

export const MoneyInput = ({ currencyProps, amountProps, legend }: MoneyInputProps) => {
  return (
    <Fieldset>
      {legend && <Legend>{legend}</Legend>}
      <Select {...currencyProps} variant="short" />
      <Input {...amountProps} type="number" />
    </Fieldset>
  )
}
