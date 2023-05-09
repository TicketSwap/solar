import React from 'react'
import { fireEvent, render, screen } from '../../../test/test.utils'
import { within } from '@testing-library/dom'
import { matchers } from '@emotion/jest'
import { Select } from './index'

expect.extend(matchers)

const options = [
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Pig', value: 'pig' },
  { label: 'Horse', value: 'horse' },
  { label: 'Chicken', value: 'chicken' },
  { label: 'Turtle', value: 'turtle' },
  { label: 'Tiger', value: 'tiger' },
  { label: 'Izzy', value: 'izzy' },
]

describe('Select', () => {
  describe('when the Select is uncontrolled', () => {
    it('will have a default value selected', async () => {
      render(
        <Select id="pets" label="Pets" options={options} defaultValue="izzy" />
      )

      const listbox = screen.getByRole('listbox', {
        name: /pets/i,
        hidden: true,
      })

      const native = screen.getByRole('combobox', {
        name: /pets/i,
      })

      expect(native).toHaveValue('izzy')

      expect(
        within(listbox).getByRole('option', {
          name: /izzy/i,
          hidden: true,
        })
      ).toHaveAttribute('aria-selected', 'true')
    })

    it('will update the internal state when an option is clicked', () => {
      render(
        <Select id="pets" label="Pets" options={options} defaultValue="izzy" />
      )

      const listbox = screen.getByRole('listbox', {
        name: /pets/i,
        hidden: true,
      })

      const native = screen.getByRole('combobox', {
        name: /pets/i,
      })

      fireEvent.change(native, { target: { value: 'cat' } })

      expect(native).toHaveValue('cat')

      expect(
        within(listbox).getByRole('option', {
          name: /cat/i,
          hidden: true,
        })
      ).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('when the Select is controlled', () => {
    it('will have a value selected', async () => {
      render(<Select id="pets" label="Pets" options={options} value="izzy" />)

      const listbox = screen.getByRole('listbox', {
        name: /pets/i,
        hidden: true,
      })

      const native = screen.getByRole('combobox', {
        name: /pets/i,
      })

      expect(native).toHaveValue('izzy')

      expect(
        within(listbox).getByRole('option', {
          name: /izzy/i,
          hidden: true,
        })
      ).toHaveAttribute('aria-selected', 'true')
    })

    it('will trigger the onChange with the new value', () => {
      const onChange = jest.fn()

      render(
        <Select
          id="pets"
          label="Pets"
          options={options}
          value="izzy"
          onChange={event => onChange(event.target.value)}
        />
      )

      const native = screen.getByRole('combobox', {
        name: /pets/i,
      })

      fireEvent.change(native, { target: { value: 'cat' } })

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('cat')
    })
  })
})
