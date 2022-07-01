import { useState } from 'react'
import { Flag } from '../Flag'
import { PhoneInput } from './'

export default {
  title: 'Components/Inputs/PhoneInput',
}

const countries = [
  {
    value: '+1684',
    label: 'American Samoa',
    startAdornment: <Flag countryCode="as" />,
  },
  {
    value: '+1441',
    label: 'Bermuda',
    startAdornment: <Flag countryCode="bm" />,
  },
  {
    value: '+975',
    label: 'Bolivia',
    startAdornment: <Flag countryCode="bo" />,
  },
  {
    value: '+591',
    label: 'Bhutan',
    startAdornment: <Flag countryCode="bt" />,
  },
  {
    value: '+31',
    label: 'The Netherlands',
    startAdornment: <Flag countryCode="nl" />,
  },
  {
    value: '+40',
    label: 'Romania',
    startAdornment: <Flag countryCode="ro" />,
  },
]

export const Controlled = () => {
  const [phoneNumber, setPhoneNumber] = useState({
    country: '+31',
    number: '',
  })

  return (
    <PhoneInput
      legend="Phone number"
      countryProps={{
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

export const Uncontrolled = () => {
  return (
    <PhoneInput
      legend="Phone number"
      countryProps={{
        'aria-label': 'Country',
        onChange: console.log,
        options: countries,
        defaultValue: '+975',
      }}
      numberProps={{
        'aria-label': 'Number',
        onChange: console.log,
      }}
    />
  )
}

export const DisabledCountry = () => {
  return (
    <PhoneInput
      legend="Phone number"
      countryProps={{
        'aria-label': 'Country',
        onChange: console.log,
        options: countries,
        disabled: true,
      }}
      numberProps={{
        'aria-label': 'Number',
        onChange: console.log,
      }}
    />
  )
}
