import { useState } from 'react'
import { MoneyInput } from './'

export default {
  title: 'Components/Inputs/MoneyInput',
}

const currencies = [
  {
    value: 'EUR',
    label: 'Euro',
    startAdornment: '€',
  },
  {
    value: 'DKK',
    label: 'Danish Krone',
    startAdornment: 'DKK',
  },
  {
    value: 'GBP',
    label: 'British Pound',
    startAdornment: '£',
  },
  {
    value: 'HUF',
    label: 'Hungarian Forint',
    startAdornment: 'HUF',
  },
  {
    value: 'PLN',
    label: 'Polish Zloty',
    startAdornment: 'PLN',
  },
  {
    value: 'SEK',
    label: 'Swedish Krona',
    startAdornment: 'SEK',
  },
  {
    value: 'USD',
    label: 'US Dollar',
    startAdornment: '$',
  },
  {
    value: 'CAD',
    label: 'Canadian Dollar',
    startAdornment: 'CA$',
  },
  {
    value: 'AUD',
    label: 'Australian Dollar',
    startAdornment: 'A$',
  },
  {
    value: 'NZD',
    label: 'New Zealand Dollar',
    startAdornment: 'NZ$',
  },
  {
    value: 'CHF',
    label: 'Swiss Franc',
    startAdornment: 'CHF',
  },
  {
    value: 'NOK',
    label: 'Norwegian Krone',
    startAdornment: 'NOK',
  },
]

export const Controlled = () => {
  const [money, setMoney] = useState({
    currency: 'HUF',
    amount: '',
  })

  return (
    <MoneyInput
      legend="Selling price"
      currencyProps={{
        options: currencies,
        'aria-label': 'Currency',
        onChange: event =>
          setMoney(previousMoney => {
            return {
              ...previousMoney,
              currency: event.target.value,
            }
          }),
        value: money.currency,
      }}
      amountProps={{
        'aria-label': 'Amount',
        onChange: event =>
          setMoney(previousMoney => {
            return {
              ...previousMoney,
              amount: event.target.value,
            }
          }),
        value: money.amount,
      }}
    />
  )
}

export const Uncontrolled = () => {
  return (
    <MoneyInput
      legend="Selling price"
      currencyProps={{
        'aria-label': 'Currency',
        onChange: console.log,
        options: currencies,
        defaultValue: 'HUF',
      }}
      amountProps={{
        'aria-label': 'Amount',
        onChange: console.log,
      }}
    />
  )
}

export const DisabledCurrency = () => {
  return (
    <MoneyInput
      legend="Selling price"
      currencyProps={{
        'aria-label': 'Currency',
        onChange: console.log,
        options: currencies,
        disabled: true,
      }}
      amountProps={{
        'aria-label': 'Amount',
        onChange: console.log,
      }}
    />
  )
}
