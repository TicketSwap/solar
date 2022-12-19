import React, { useState } from 'react'
import { Flag } from '../Flag'
import { Instruction } from '../Instruction'
import { PhoneInput } from './'

const countries = [
  {
    value: 'AS',
    shortLabel: '+1684',
    label: 'American Samoa',
    startAdornment: <Flag countryCode="as" />,
  },
  {
    value: 'BM',
    shortLabel: '+1441',
    label: 'Bermuda',
    startAdornment: <Flag countryCode="bm" />,
  },
  {
    value: 'BO',
    shortLabel: '+975',
    label: 'Bolivia',
    startAdornment: <Flag countryCode="bo" />,
  },
  {
    value: 'BT',
    shortLabel: '+591',
    label: 'Bhutan',
    startAdornment: <Flag countryCode="bt" />,
  },
  {
    value: 'NL',
    shortLabel: '+31',
    label: 'The Netherlands',
    startAdornment: <Flag countryCode="nl" />,
  },
  {
    value: 'RO',
    shortLabel: '+40',
    label: 'Romania',
    startAdornment: <Flag countryCode="ro" />,
  },
]

export default {
  title: 'Components/Inputs/PhoneInputV2',
}

export const Controlled = () => {
  const [phoneNumber, setPhoneNumber] = useState({
    country: 'NL',
    number: '',
  })

  return (
    <PhoneInput
      countryProps={{
        id: 'country',
        options: countries,
        'aria-label': 'Country',
        onChange: event =>
          setPhoneNumber(previousPhoneNumber => {
            return {
              ...previousPhoneNumber,
              country: event.target.value,
            }
          }),
        value: phoneNumber.country,
      }}
      numberProps={{
        id: 'number',
        'aria-label': 'Number',
        onChange: event =>
          setPhoneNumber(previousPhoneNumber => {
            return {
              ...previousPhoneNumber,
              number: event.target.value,
            }
          }),
        value: phoneNumber.number,
      }}
    />
  )
}

export const WithLegend = () => {
  return (
    <PhoneInput
      legend="Phone number"
      countryProps={{
        id: 'country',
        'aria-label': 'Country',
        onChange: console.log,
        options: countries,
        defaultValue: '+975',
      }}
      instruction={<Instruction>Enter your phone number</Instruction>}
      numberProps={{
        id: 'number',
        'aria-label': 'Number',
        onChange: console.log,
      }}
    />
  )
}

export const Disabled = () => {
  return (
    <PhoneInput
      legend="Phone number"
      countryProps={{
        id: 'country',
        'aria-label': 'Country',
        onChange: console.log,
        options: countries,
        disabled: true,
      }}
      numberProps={{
        id: 'number',
        'aria-label': 'Number',
        onChange: console.log,
        disabled: true,
      }}
    />
  )
}
