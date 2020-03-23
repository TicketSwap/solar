import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TimeInput } from './'

describe('TimeInput', () => {
  it('renders without crashing', () => {
    const { container } = render(<TimeInput id="time" label="Time" />)
    const el = container.firstChild
    expect(el).toBeInTheDocument()
  })

  it('correctly calls the `onChange` handler', () => {
    const handleChange = jest.fn()
    const invalidInputValue = '20:0'
    const validInputValue = '20:00'
    const { getByLabelText } = render(
      <TimeInput id="time" label="Time" onChange={handleChange} />
    )
    const input = getByLabelText(/time/i)
    fireEvent.change(input, {
      target: { value: invalidInputValue },
    })
    expect(handleChange).toHaveBeenCalledTimes(0)
    fireEvent.change(input, {
      target: { value: validInputValue },
    })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(validInputValue)
  })
})
