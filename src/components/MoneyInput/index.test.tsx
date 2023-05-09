import React from 'react'
import { render, fireEvent } from '../../../test/test.utils'
import { MoneyInput } from '.'

const currencies = [
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
  },
  {
    code: 'DKK',
    symbol: 'DKK',
    name: 'Danish Krone',
  },
]

describe('MoneyInput', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MoneyInput
        id="maximum-price"
        label="Maximum price"
        currencies={currencies}
        currency={currencies[0]}
        amount={25}
      />
    )

    expect(container.firstChild).toBeInTheDocument()
  })

  it('can have a help text', () => {
    const { getByText } = render(
      <MoneyInput
        id="maximum-price"
        label="Maximum price"
        currencies={currencies}
        currency={currencies[0]}
        amount={25}
        help="The price you want to get"
      />
    )

    expect(getByText('The price you want to get')).toBeInTheDocument()
  })

  it('can change the currency of the input', () => {
    const { getByLabelText, getByText } = render(
      <MoneyInput
        id="maximum-price"
        label="Maximum price"
        currencies={currencies}
        currency={currencies[0]}
        amount={25}
        help="The price you want to get"
      />
    )

    expect(getByLabelText(/Currency/i)).toHaveValue('€')
    fireEvent.focus(getByLabelText(/Currency/i))
    fireEvent.mouseDown(getByText(/Danish Krone/i))
    expect(getByLabelText(/Currency/i)).toHaveValue('DKK')
  })
})
