import React from 'react'
import { storiesOf } from '@storybook/react'
import { DateInput } from './'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

storiesOf('DateInput', module)
  .add('basic', () => (
    <DateInput
      id="dob"
      label="Date of birth"
      months={months}
      onChange={date => console.log(date)}
      dayInputProps={{
        placeholder: 'Tag',
        label: 'Tag',
      }}
      yearInputProps={{
        placeholder: 'Jahr',
        label: 'Jahr',
      }}
    />
  ))
  .add('with initial date (string)', () => (
    <DateInput
      id="dob"
      label="Date of birth"
      months={months}
      onChange={date => console.log(date)}
      initialSelectedDate="1990-09-06"
    />
  ))
  .add('with initial date (object)', () => (
    <DateInput
      id="dob"
      label="Date of birth"
      months={months}
      onChange={date => console.log(date)}
      initialSelectedDate={new Date(1990, 8, 6)}
    />
  ))
