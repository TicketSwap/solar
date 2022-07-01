import React from 'react'
import styled from '@emotion/styled'
import { Input } from '../InputNew'
import { Select } from '../SelectNew'
import { space } from '../../theme'
import { SelectProps } from '../SelectNew/Select'
import { InputProps } from '../InputNew/Input'

interface MoneyInputProps {
  legend?: string
  countryProps: SelectProps
  numberProps: InputProps
}

const Legend = styled.legend`
  margin-block-end: ${space[4]};
`

const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: ${space[8]};
`

export const PhoneInput = ({ countryProps, numberProps, legend }: MoneyInputProps) => {
  return (
    <Fieldset>
      {legend && <Legend>{legend}</Legend>}
      <Select {...countryProps} variant="shortvalue" />
      <Input {...numberProps} type="tel" />
    </Fieldset>
  )
}
