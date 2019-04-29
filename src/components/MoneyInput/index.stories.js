import React from 'react'
import { storiesOf } from '@storybook/react'
import { MoneyInput } from './'

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
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
  },
  {
    code: 'HUF',
    symbol: 'HUF',
    name: 'Hungarian Forint',
  },
  {
    code: 'PLN',
    symbol: 'PLN',
    name: 'Polish Zloty',
  },
  {
    code: 'SEK',
    symbol: 'SEK',
    name: 'Swedish Krona',
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
  },
  {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
  },
  {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
  },
  {
    code: 'NZD',
    symbol: 'NZ$',
    name: 'New Zealand Dollar',
  },
  {
    code: 'CHF',
    symbol: 'CHF',
    name: 'Swiss Franc',
  },
  {
    code: 'NOK',
    symbol: 'NOK',
    name: 'Norwegian Krone',
  },
]

storiesOf('MoneyInput', module)
  .add('basic', () => (
    <MoneyInput
      id="maximum-price"
      label="Maximum price"
      currencies={currencies}
      onChange={e => console.log(e)}
    />
  ))
  .add('with initial values', () => (
    <MoneyInput
      id="maximum-price"
      label="Maximum price"
      placeholder="Enter an amount"
      currencies={currencies}
      onChange={e => console.log(e)}
      initialSelectedCurrency={currencies[2]}
      initialValue="25"
      help="Leave blank for no maximum price"
    />
  ))
