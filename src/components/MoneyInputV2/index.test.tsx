import React from 'react'
import { fireEvent, render, screen } from '../../../test/test.utils'
import { matchers } from '@emotion/jest'
import { MoneyInput } from './index'

expect.extend(matchers)

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
]

describe('MoneyInput', () => {
  describe('when the MoneyInput is uncontrolled', () => {
    it('will have a default value', async () => {
      render(
        <MoneyInput
          legend="Selling price"
          currencyProps={{
            id: 'currency',
            name: 'currency',
            'aria-label': 'Currency',
            options: currencies,
            defaultValue: 'DKK',
          }}
          amountProps={{
            id: 'amount',
            'aria-label': 'Amount',
            defaultValue: '2000',
          }}
        />
      )

      const currencySelect = screen.getByRole('combobox')
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i })

      expect(currencySelect).toHaveValue('DKK')
      expect(amountInput).toHaveValue(2000)
    })

    it('will update the internal state when the currency is changed and amount is filled in', () => {
      render(
        <MoneyInput
          legend="Selling price"
          currencyProps={{
            id: 'currency',
            name: 'currency',
            'aria-label': 'Currency',
            options: currencies,
            defaultValue: 'DKK',
          }}
          amountProps={{
            id: 'amount',
            'aria-label': 'Amount',
            defaultValue: '2000',
          }}
        />
      )

      const currencySelect = screen.getByRole('combobox')
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i })

      fireEvent.change(currencySelect, { target: { value: 'EUR' } })
      fireEvent.change(amountInput, { target: { value: '3000' } })

      expect(currencySelect).toHaveValue('EUR')
      expect(amountInput).toHaveValue(3000)
    })
  })

  describe('when the Select is controlled', () => {
    it('will have currency selected and amount filled in', async () => {
      render(
        <MoneyInput
          legend="Selling price"
          currencyProps={{
            id: 'currency',
            name: 'currency',
            'aria-label': 'Currency',
            options: currencies,
            value: 'DKK',
          }}
          amountProps={{
            id: 'amount',
            'aria-label': 'Amount',
            value: '2000',
          }}
        />
      )

      const currencySelect = screen.getByRole('combobox')
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i })

      expect(currencySelect).toHaveValue('DKK')
      expect(amountInput).toHaveValue(2000)
    })

    it('will trigger the onChange with the new value', () => {
      const onCurrencyChange = jest.fn()
      const onAmountChange = jest.fn()

      render(
        <MoneyInput
          legend="Selling price"
          currencyProps={{
            id: 'currency',
            name: 'currency',
            'aria-label': 'Currency',
            options: currencies,
            value: 'DKK',
            onChange: event => onCurrencyChange(event.target.value),
          }}
          amountProps={{
            id: 'amount',
            'aria-label': 'Amount',
            value: '2000',
            onChange: event => onAmountChange(event.target.value),
          }}
        />
      )

      const currencySelect = screen.getByRole('combobox')
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i })

      fireEvent.change(currencySelect, { target: { value: 'EUR' } })
      fireEvent.change(amountInput, { target: { value: '3000' } })

      expect(onCurrencyChange).toHaveBeenCalledTimes(1)
      expect(onCurrencyChange).toHaveBeenCalledWith('EUR')

      expect(onAmountChange).toHaveBeenCalledTimes(1)
      expect(onAmountChange).toHaveBeenCalledWith('3000')
    })
  })
})
