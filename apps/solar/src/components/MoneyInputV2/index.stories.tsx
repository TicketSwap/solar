import React, { useState } from 'react'
import { Instruction } from '../Instruction'
import { MoneyInput } from './'

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

export default {
  title: 'Components/Inputs/MoneyInputV2',
}

export const Basic = () => {
  const [money, setMoney] = useState({
    currency: 'HUF',
    amount: '',
  })

  return (
    <MoneyInput
      currencyProps={{
        id: 'currency',
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
      instruction={
        <Instruction>
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </Instruction>
      }
      amountProps={{
        id: 'amount',
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
export const Disabled = () => {
  return (
    <MoneyInput
      legend="Selling price"
      currencyProps={{
        id: 'currency',
        'aria-label': 'Currency',
        onChange: console.log,
        options: currencies,
        disabled: true,
      }}
      amountProps={{
        id: 'amount',
        'aria-label': 'Amount',
        onChange: console.log,
        disabled: true,
        value: '12.30',
      }}
    />
  )
}

export const WithLegend = () => {
  const [money, setMoney] = useState({
    currency: 'HUF',
    amount: '',
  })

  return (
    <MoneyInput
      legend="Selling price for all of your amazing tickets"
      instruction={
        <Instruction>
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </Instruction>
      }
      currencyProps={{
        id: 'currency',
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
        id: 'amount',
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
