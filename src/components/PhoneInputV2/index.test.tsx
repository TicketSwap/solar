import React from 'react'
import { fireEvent, render, screen } from '../../../test/test.utils'
import { matchers } from '@emotion/jest'
import { PhoneInput } from './index'
import { Flag } from '../Flag'

expect.extend(matchers)

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
]

describe('PhoneInput', () => {
  describe('when the PhoneInput is uncontrolled', () => {
    it('will have a default value', async () => {
      render(
        <PhoneInput
          legend="Selling price"
          countryProps={{
            id: 'country',
            name: 'country',
            'aria-label': 'Country',
            options: countries,
            defaultValue: '+1441',
          }}
          numberProps={{
            id: 'number',
            'aria-label': 'Number',
            defaultValue: '612345678',
          }}
        />
      )

      const countrySelect = screen.getByRole('combobox')
      const numberInput = screen.getByRole('textbox', { name: /number/i })

      expect(countrySelect).toHaveValue('+1441')
      expect(numberInput).toHaveValue('612345678')
    })

    it('will update the internal state when the country is changed and number is filled in', () => {
      render(
        <PhoneInput
          legend="Selling price"
          countryProps={{
            id: 'country',
            name: 'country',
            'aria-label': 'Country',
            options: countries,
            defaultValue: '+1441',
          }}
          numberProps={{
            id: 'number',
            'aria-label': 'Number',
            defaultValue: '612345678',
          }}
        />
      )

      const countrySelect = screen.getByRole('combobox')
      const numberInput = screen.getByRole('textbox', { name: /number/i })

      fireEvent.change(countrySelect, { target: { value: '+1684' } })
      fireEvent.change(numberInput, { target: { value: '687654321' } })

      expect(countrySelect).toHaveValue('+1684')
      expect(numberInput).toHaveValue('687654321')
    })
  })

  describe('when the Select is controlled', () => {
    it('will have country selected and number filled in', async () => {
      render(
        <PhoneInput
          legend="Selling price"
          countryProps={{
            id: 'country',
            name: 'country',
            'aria-label': 'Country',
            options: countries,
            value: '+1441',
          }}
          numberProps={{
            id: 'number',
            'aria-label': 'Number',
            value: '612345678',
          }}
        />
      )

      const countrySelect = screen.getByRole('combobox')
      const numberInput = screen.getByRole('textbox', { name: /number/i })

      expect(countrySelect).toHaveValue('+1441')
      expect(numberInput).toHaveValue('612345678')
    })

    it('will trigger the onChange with the new value', () => {
      const onCountryChange = jest.fn()
      const onNumberChange = jest.fn()

      render(
        <PhoneInput
          legend="Selling price"
          countryProps={{
            id: 'country',
            name: 'country',
            'aria-label': 'Country',
            options: countries,
            value: '+1441',
            onChange: event => onCountryChange(event.target.value),
          }}
          numberProps={{
            id: 'number',
            'aria-label': 'Number',
            value: '612345678',
            onChange: event => onNumberChange(event.target.value),
          }}
        />
      )

      const countrySelect = screen.getByRole('combobox')
      const numberInput = screen.getByRole('textbox', { name: /number/i })

      fireEvent.change(countrySelect, { target: { value: '+1684' } })
      fireEvent.change(numberInput, { target: { value: '687654321' } })

      expect(onCountryChange).toHaveBeenCalledTimes(1)
      expect(onCountryChange).toHaveBeenCalledWith('+1684')

      expect(onNumberChange).toHaveBeenCalledTimes(1)
      expect(onNumberChange).toHaveBeenCalledWith('687654321')
    })
  })
})
