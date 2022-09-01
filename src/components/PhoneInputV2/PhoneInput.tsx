import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Input, InputProps } from '../InputV2'
import { Select, SelectProps } from '../SelectV2'
import { space } from '../../theme'

export interface PhoneInputProps {
  legend?: string
  countryProps: SelectProps
  numberProps: InputProps
  instruction?: ReactNode
}

const Legend = styled.legend`
  margin-block-end: ${space[4]};
`

const Fieldset = styled.div`
  display: grid;
  grid-gap: ${space[4]};
`

const InputFields = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: ${space[8]};
`

export const PhoneInput = ({
  legend,
  countryProps,
  numberProps,
  instruction,
}: PhoneInputProps) => {
  return (
    <Fieldset role="group">
      {legend && <Legend>{legend}</Legend>}
      <InputFields>
        <Select {...countryProps} variant="shortvalue" />
        <Input {...numberProps} type="tel" />
      </InputFields>
      {instruction}
    </Fieldset>
  )
}
