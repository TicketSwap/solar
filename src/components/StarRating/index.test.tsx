import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { StarRating } from '.'

describe('StarRating', () => {
  it('renders without crashing', () => {
    const { container } = render(<StarRating label="Rating" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has 0 selected initially when no initial rating passed', () => {
    const { getByLabelText } = render(<StarRating label="Rating" />)
    const checkbox = getByLabelText(/0 stars/i) as HTMLInputElement
    expect(checkbox.checked).toEqual(true)
  })

  it('has 2 stars selected initially when passed as initial rating', () => {
    const { getByLabelText } = render(
      <StarRating initialRating={2} label="Rating" />
    )
    const checkbox = getByLabelText(/2 stars/i) as HTMLInputElement
    expect(checkbox.checked).toEqual(true)
  })

  it('calls onChange handler with the selected rating', () => {
    const mockedOnChange = jest.fn()
    const { getByLabelText } = render(
      <StarRating onChange={mockedOnChange} label="Rating" />
    )
    fireEvent.click(getByLabelText(/2 stars/i))
    expect(mockedOnChange).toHaveBeenCalledTimes(1)
    expect(mockedOnChange).toHaveBeenCalledWith(2)
  })
})
