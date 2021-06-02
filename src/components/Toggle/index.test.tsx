import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Toggle } from '.'

describe('Toggle', () => {
  it('renders without crashing', () => {
    const { container } = render(<Toggle on={true} />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('can be toggled', () => {
    const { getByRole } = render(<Toggle />)

    expect(document.querySelector('input')).not.toBeChecked()
    fireEvent.click(getByRole(/switch/i))
    expect(document.querySelector('input')).toBeChecked()
  })

  it('can have an adornment', () => {
    const { getByText } = render(
      <Toggle
        adornment={
          <span role="img" aria-label="">
            🍀
          </span>
        }
      />
    )

    expect(getByText(/🍀/i)).toBeInTheDocument()
  })

  it('can have a loading state', () => {
    const { getByRole } = render(<Toggle loading={true} />)

    expect(getByRole(/status/i)).toBeInTheDocument()
  })
})
