import { useState } from 'react'
import { Flag } from '../Flag'
import { DateInput } from './'

export default {
  title: 'Components/Inputs/DateInput',
}

const months = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

export const Controlled = () => {
  const [date, setDate] = useState({
    day: '',
    month: '6',
    year: '',
  })

  return (
    <DateInput
      legend="Date"
      dayProps={{
        'aria-label': 'Day',
        onChange: event =>
          setDate(previousDate => {
            return {
              ...previousDate,
              day: event.target.value,
            }
          }),
        value: date.day,
      }}
      monthProps={{
        options: months,
        'aria-label': 'Month',
        onChange: event =>
          setDate(previousDate => {
            return {
              ...previousDate,
              month: event.target.value,
            }
          }),
        value: date.month,
      }}
      yearProps={{
        'aria-label': 'Year',
        onChange: event =>
          setDate(previousDate => {
            return {
              ...previousDate,
              year: event.target.value,
            }
          }),
        value: date.year,
      }}
    />
  )
}

export const Uncontrolled = () => {
  return (
    <DateInput
      legend="Date"
      dayProps={{
        'aria-label': 'Day',
        onChange: console.log,
      }}
      monthProps={{
        options: months,
        'aria-label': 'Month',
        onChange: console.log,
      }}
      yearProps={{
        'aria-label': 'Year',
        onChange: console.log,
      }}
    />
  )
}

export const DisabledMonthAndYear = () => {
  return (
    <DateInput
      legend="Date"
      dayProps={{
        'aria-label': 'Day',
        onChange: console.log,
        defaultValue: '23',
      }}
      monthProps={{
        options: months,
        'aria-label': 'Month',
        onChange: console.log,
        disabled: true,
        value: '6',
      }}
      yearProps={{
        'aria-label': 'Year',
        onChange: console.log,
        disabled: true,
        value: '1984',
      }}
    />
  )
}
