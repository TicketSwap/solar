import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SelectWithSearch } from './'

const countries = [
  { value: 'nl', name: 'Netherlands' },
  { value: 'at', name: 'Austria' },
  { value: 'de', name: 'Germany' },
]

describe('CountryInput', () => {
  it('renders without crashing', () => {
    const { container, queryByText } = render(
      <SelectWithSearch id="country" label="Country" items={countries} />
    )
    expect(container.firstChild).toBeInTheDocument()
    expect(queryByText(/netherlands/i)).toBeNull()
  })

  it('shows suggestions upon typing', () => {
    const { getByLabelText, getByText } = render(
      <SelectWithSearch id="country" label="Country" items={countries} />
    )
    fireEvent.change(getByLabelText(/country/i), {
      target: { value: 'nether' },
    })
    expect(getByText(/netherlands/i)).toBeInTheDocument()
  })

  it('handles a passed initial value correctly', () => {
    const { getByLabelText } = render(
      <SelectWithSearch
        id="country"
        label="Country"
        items={countries}
        initialValue={countries[1].value}
      />
    )
    expect(getByLabelText(/country/i).value).toEqual(countries[1].name)
  })

  it('resets input upon clicking reset-button', () => {
    const { getByLabelText, getByTestId } = render(
      <SelectWithSearch
        id="country"
        label="Country"
        items={countries}
        initialValue={countries[1].value}
      />
    )
    fireEvent.click(getByTestId('reset-button'))
    expect(getByLabelText(/country/i).value).toEqual('')
  })

  it('calls onChange handler correctly', () => {
    const handler = jest.fn()
    const { getByText, getByLabelText } = render(
      <SelectWithSearch
        id="country"
        label="Country"
        items={countries}
        initialValue={countries[1].value}
        onChange={selection => handler(selection.name)}
      />
    )
    fireEvent.change(getByLabelText(/country/i), {
      target: { value: 'nether' },
    })
    fireEvent.click(getByText(/netherlands/i))
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(countries[0].name)
  })
})
