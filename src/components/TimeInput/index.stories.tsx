import React from 'react'
import { TimeInput } from '.'

export default {
  title: 'TimeInput',
}

export const Basic = () => (
  <TimeInput id="time" label="Time" onChange={val => console.log(val)} />
)

export const WithInitialValue = () => (
  <TimeInput
    id="time"
    label="Time"
    onChange={val => console.log(val)}
    initialValue="15:00"
  />
)

WithInitialValue.storyName = 'With initial value'
