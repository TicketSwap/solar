import React from 'react'
import { PhoneInput } from './'

const countries = [
  {
    code: 1684,
    name: 'American Samoa',
    value: 'as',
  },
  {
    code: 1441,
    name: 'Bermuda',
    value: 'bm',
  },
  {
    code: 975,
    name: 'Bolivia',
    value: 'bo',
  },
  {
    code: 591,
    name: 'Bhutan',
    value: 'bt',
  },
  {
    code: 31,
    name: 'The Netherlands',
    value: 'nl',
  },
  {
    code: 40,
    name: 'Romania',
    value: 'ro',
  },
]

export default {
  title: 'PhoneInput',
}

export const Basic = () => (
  <PhoneInput
    id="phonenumber"
    label="Phone number"
    countries={countries}
    onChange={e => console.log(e)}
  />
)

export const WithInitialValues = () => (
  <PhoneInput
    id="phonenumber"
    label="Phone number"
    countries={countries}
    initialSelectedCountry={countries[4]}
    initialNumber={2500}
    onChange={e => console.log(e)}
    help="Enter your phone number"
  />
)

WithInitialValues.story = {
  name: 'With initial values',
}

export const WithError = () => (
  <PhoneInput
    id="phonenumber"
    label="Phone number"
    countries={countries}
    initialSelectedCountry={countries[4]}
    initialNumber={2500}
    onChange={e => console.log(e)}
    help="Enter your phone number"
    validateCountry={false}
    validateNumber={false}
  />
)

WithError.story = {
  name: 'With error',
}
