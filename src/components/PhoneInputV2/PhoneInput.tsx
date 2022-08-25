import React from 'react'
import styled from '@emotion/styled'
import { Input, InputProps } from '../InputV2'
import { Select, SelectProps } from '../SelectV2'
import { space } from '../../theme'

export interface PhoneInputProps {
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
  column-gap: ${space[8]};
`

export const PhoneInput = ({
  legend,
  countryProps,
  numberProps,
}: PhoneInputProps) => {
  return (
    <Fieldset>
      {legend && <Legend>{legend}</Legend>}
      <Select {...countryProps} variant="shortvalue" />
      <Input {...numberProps} type="tel" />
    </Fieldset>
  )
}
