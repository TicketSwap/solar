import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DateInput } from '.'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

describe('DateInput', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <DateInput id="dob" label="Date of birth" months={months} />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('can have an initial date', () => {
    const { getByLabelText } = render(
      <DateInput
        id="dob"
        label="Date of birth"
        months={months}
        initialSelectedDate="1990-09-06"
      />
    )

    expect(getByLabelText('Date of birth')).toHaveValue('1990-09-06')
  })

  it('can change the month', () => {
    const { getByLabelText, getByText } = render(
      <DateInput id="dob" label="Date of birth" months={months} />
    )

    expect(getByLabelText(/Month/i)).toHaveValue('January')
    fireEvent.focus(getByLabelText(/Month/i))
    fireEvent.mouseDown(getByText(/February/i))
    expect(getByLabelText(/Month/i)).toHaveValue('February')
  })
})
