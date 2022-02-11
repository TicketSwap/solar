import { useState } from 'react'
import { Radio } from './'

export default {
  title: 'Components/Inputs/Radio',
}

export const Basic = () => {
  const [checked, setChecked] = useState(null)

  return (
    <>
      <Radio
        id="radio1"
        name="radio1"
        onChange={event => {
          console.log(event)
          setChecked(event.target.value)
        }}
        value="radio1"
        checked={checked === 'radio1'}
      />
      <label htmlFor="radio1">Radio 1</label>

      <Radio
        id="radio2"
        name="radio1"
        onChange={event => {
          console.log(event)
          setChecked(event.target.value)
        }}
        value="radio2"
        checked={checked === 'radio2'}
      />
      <label htmlFor="radio2">Radio 2</label>
    </>
  )
}
