import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import { PhoneInput } from '.'
import { color } from '../../theme'

expect.extend(matchers)

const countries = [
  {
    code: 1684,
    name: 'American Samoa',
    value: 'as',
  },
  {
    code: 31,
    name: 'The Netherlands',
    value: 'nl',
  },
]

describe('PhoneInput', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <PhoneInput id="phonenumber" label="Phone number" countries={countries} />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('can contain an error', () => {
    const { getByLabelText } = render(
      <PhoneInput
        id="phonenumber"
        label="Phone number"
        countries={countries}
        validateNumber={false}
      />
    )

    expect(getByLabelText('Number')).toHaveStyleRule(
      'background-color',
      color.marsLightestAlpha
    )
  })

  it('can have a help text', () => {
    const { getByText } = render(
      <PhoneInput
        id="phonenumber"
        label="Phone number"
        countries={countries}
        help="Enter your phone number"
      />
    )

    expect(getByText('Enter your phone number')).toBeInTheDocument()
  })

  it('can change the country of the input', () => {
    const { getByLabelText, getByText } = render(
      <PhoneInput
        id="phonenumber"
        label="Phone number"
        countries={countries}
        help="Enter your phone number"
      />
    )

    expect(getByLabelText(/Country/i)).toHaveValue('+1684')
    fireEvent.focus(getByLabelText(/Country/i))
    fireEvent.mouseDown(getByText(/The Netherlands/i))
    expect(getByLabelText(/Country/i)).toHaveValue('+31')
  })
})
