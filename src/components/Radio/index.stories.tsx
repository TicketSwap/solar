import { useState } from 'react'
import { Radio, RadioGroup, RadioWithLabel } from './'

export default {
  title: 'Components/Inputs/Radio',
}

export const Basic = () => {
  const [checked, setChecked] = useState(null)

  return (
    <Radio
      id="radio1"
      name="radio1"
      value="radio1"
      checked={checked === 'radio1'}
      onChange={event => {
        console.log(event)
        setChecked(event.target.value)
      }}
    />
  )
}

export const WithLabel = () => {
  const [checked, setChecked] = useState(null)

  return (
    <RadioWithLabel
      id="radio1"
      name="radio1"
      label="Radio 1"
      value="radio1"
      checked={checked === 'radio1'}
      onChange={event => {
        console.log(event)
        setChecked(event.target.value)
      }}
    />
  )
}

export const Group = () => {
  const [value, setValue] = useState(null)

  return (
    <RadioGroup
      name="whos-the-best"
      options={[
        { id: 'Rob', value: 'Rob', label: 'Rob', disabled: true },
        { id: 'Bob', value: 'Bob', label: 'Bob' },
      ]}
      value={value}
      onChange={event => {
        console.log(event)
        setValue(event.target.value)
      }}
    />
  )
}

export const GroupWithLegend = () => {
  const [value, setValue] = useState(null)

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
      ]}
      value={value}
      onChange={event => {
        console.log(event)
        setValue(event.target.value)
      }}
    />
  )
}
