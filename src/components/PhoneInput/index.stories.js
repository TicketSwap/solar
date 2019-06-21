import React from 'react'
import { storiesOf } from '@storybook/react'
import PhoneDetailsInput from '.'

const countries = [
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

storiesOf('PhoneInput', module)
  .add('basic', () => (
    <PhoneDetailsInput
      id="phonenumber"
      label="Phone number"
      countries={countries}
      onChange={e => console.log(e)}
    />
  ))
  .add('with initial values', () => (
    <PhoneDetailsInput
      id="phonenumber"
      label="Phone number"
      countries={countries}
      initialSelectedCountry={countries[4]}
      initialNumber={2500}
      onChange={e => console.log(e)}
      help="Enter your phone number"
    />
  ))
  .add('with error', () => (
    <PhoneDetailsInput
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
  ))
