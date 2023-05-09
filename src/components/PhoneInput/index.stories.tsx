import React, { useEffect, useRef, useState } from 'react'
import { PhoneInput } from '.'

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
  title: 'Components/Inputs/PhoneInput',
}

export const Basic = () => (
  <PhoneInput
    id="phonenumber"
    label="Phone number"
    countries={countries}
    onChange={e => console.log(e)}
  />
)

export const BasicWithRef = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return

    inputRef.current.focus()
  }, [])

  return (
    <PhoneInput
      id="phonenumber"
      label="Phone number"
      countries={countries}
      ref={inputRef}
      onChange={e => console.log(e)}
    />
  )
}

export const Controlled = () => {
  const [number, setNumber] = useState('')

  return (
    <>
      <button onClick={() => setNumber('')}>Clear input</button>

      <PhoneInput
        id="phonenumber"
        label="Phone number"
        countries={countries}
        value={number}
        onChange={event => setNumber(event.number)}
      />
    </>
  )
}

export const WithInitialValues = () => (
  <PhoneInput
    id="phonenumber"
    label="Phone number"
    countries={countries}
    initialSelectedCountry={countries[4]}
    initialNumber="2500"
    onChange={e => console.log(e)}
    help="Enter your phone number"
  />
)

WithInitialValues.storyName = 'With initial values'

export const WithError = () => (
  <PhoneInput
    id="phonenumber"
    label="Phone number"
    countries={countries}
    initialSelectedCountry={countries[4]}
    initialNumber="2500"
    // onChange={e => console.log(e)}
    help="Enter your phone number"
    validateCountry={false}
    validateNumber={false}
  />
)

WithError.storyName = 'With error'
