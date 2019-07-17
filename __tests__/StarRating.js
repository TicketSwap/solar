import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { StarRating } from '../src/components/StarRating'

describe('StarRating', () => {
  it('renders without crashing', () => {
    const { container } = render(<StarRating />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has 0 selected initially when no initial rating passed', () => {
    const { getByLabelText } = render(<StarRating />)
    const checkbox = getByLabelText(/0 stars/i)
    expect(checkbox.checked).toEqual(true)
  })

  it('has 2 stars selected initially when passed as initial rating', () => {
    const { getByLabelText } = render(<StarRating initialRating={2} />)
    const checkbox = getByLabelText(/2 stars/i)
    expect(checkbox.checked).toEqual(true)
  })

  it('calls onChange handler with the selected rating', () => {
    const mockedOnChange = jest.fn()
    const { getByLabelText } = render(<StarRating onChange={mockedOnChange} />)
    fireEvent.click(getByLabelText(/2 stars/i))
    expect(mockedOnChange).toHaveBeenCalledTimes(1)
    expect(mockedOnChange).toHaveBeenCalledWith(2)
  })
})
