import React, { useState } from 'react'
import { RadioGroup } from '.'
import { Instruction } from '../Instruction'

export default {
  title: 'Components/Inputs/RadioGroup',
}

export const Basic = () => {
  const [value, setValue] = useState('')

  return (
    <RadioGroup
      legend="Who's the best?"
      name="whos-the-best"
      options={[
        { id: 'Emeline', value: 'Emeline', label: 'Emeline' },
        { id: 'Diogo', value: 'Diogo', label: 'Diogo' },
        { id: 'Ronald', value: 'Ronald', label: 'Ronald' },
        { id: 'Glenn', value: 'Glenn', label: 'Glenn' },
        { id: 'Rob', value: 'Rob', label: 'Rob', disabled: true },
        { id: 'Bob', value: 'Bob', label: 'Bob' },
        { id: 'Viktor', value: 'Viktor', label: 'Viktor' },
      ]}
      value={value}
      instruction={<Instruction>Choose your favorite (Glenn)</Instruction>}
      onChange={event => {
        console.log(event)
        setValue(event.target.value)
      }}
    />
  )
}
