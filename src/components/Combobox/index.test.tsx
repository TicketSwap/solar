import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Combobox } from './'

const countries = [
  { value: 'nl', name: 'Netherlands' },
  { value: 'at', name: 'Austria' },
  { value: 'de', name: 'Germany' },
]

describe('ComboboxInput', () => {
  it('renders without crashing', () => {
    const { container, queryByText } = render(
      <Combobox id="country" label="Country" items={countries} />
    )
    expect(container.firstChild).toBeInTheDocument()
    expect(queryByText(/netherlands/i)).toBeNull()
  })

  it('shows suggestions upon typing', () => {
    const { getByTestId, getByText } = render(
      <Combobox id="country" label="Country" items={countries} />
    )

    fireEvent.change(getByTestId('combobox'), {
      target: { value: 'nether' },
    })
    expect(getByText(/netherlands/i)).toBeInTheDocument()
  })

  it('handles a passed initial value correctly', () => {
    const { getByTestId } = render(
      <Combobox
        id="country"
        label="Country"
        items={countries}
        initialValue={countries[1].value}
      />
    )

    const combobox = getByTestId('combobox') as HTMLInputElement
    expect(combobox.value).toEqual(countries[1].name)
  })

  it('resets input upon clicking reset-button', () => {
    const { getByTestId } = render(
      <Combobox
        id="country"
        label="Country"
        items={countries}
        initialValue={countries[1].value}
      />
    )
    fireEvent.click(getByTestId('reset-button'))
    const combobox = getByTestId('combobox') as HTMLInputElement
    expect(combobox.value).toEqual('')
  })

  it('calls onChange handler correctly', () => {
    const handler = jest.fn()
    const { getByText, getByTestId } = render(
      <Combobox
        id="country"
        label="Country"
        items={countries}
        initialValue={countries[1].value}
        onChange={selection => handler(selection.name)}
      />
    )
    fireEvent.change(getByTestId('combobox'), {
      target: { value: 'nether' },
    })
    fireEvent.click(getByText(/netherlands/i))
    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith(countries[0].name)
  })
})
