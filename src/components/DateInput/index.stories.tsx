import React from 'react'
import { DateInput } from '.'

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

export default {
  title: 'DateInput',
}

export const Basic = () => (
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
)

export const WithInitialDateString = () => (
  <DateInput
    id="dob"
    label="Date of birth"
    months={months}
    onChange={date => console.log(date)}
    initialSelectedDate="1990-09-06"
  />
)

WithInitialDateString.storyName = 'With initial date (string)'

export const WithInitialDateObject = () => (
  <DateInput
    id="dob"
    label="Date of birth"
    months={months}
    onChange={date => console.log(date)}
    initialSelectedDate={new Date(1990, 8, 6)}
  />
)

WithInitialDateObject.storyName = 'With initial date (object)'
