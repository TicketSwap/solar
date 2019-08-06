import React from 'react'
import { storiesOf } from '@storybook/react'
import { TimeInput } from './'

storiesOf('TimeInput', module)
  .add('basic', () => (
    <TimeInput id="time" label="Time" onChange={val => console.log(val)} />
  ))
  .add('with initial value', () => (
    <TimeInput
      id="time"
      label="Time"
      onChange={val => console.log(val)}
      initialValue="15:00"
    />
  ))
