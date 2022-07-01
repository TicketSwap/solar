import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Input } from '../InputNew'
import { DesktopDropdown } from '../SelectNew/DesktopDropdown'

const Fieldset = styled.fieldset`
  position: relative;
`

export const Combobox = () => {
  const [value, setValue] = useState('')

  return (
    <Fieldset>
      <Input aria-label="Hello" value={value} />
      <DesktopDropdown
        variant="default"
        options={[
          { value: 'dog', label: 'Dog' },
          { value: 'cat', label: 'Cat' },
        ]}
        onChange={(_event, value) => {
          setValue(value)
        }}
      />
    </Fieldset>
  )
}
