import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import { Button, ButtonVariant } from '.'
import { color } from '../../theme'

expect.extend(matchers)

describe('BaseButton', () => {
  it('renders without crashing and calls action handlers', () => {
    const action = jest.fn()
    const { container, getByText } = render(
      <Button onClick={action}>Default</Button>
    )
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(getByText(/Default/i))
    expect(action).toHaveBeenCalledTimes(1)
  })

  it('renders the varriant prop correctly', () => {
    const { getByText } = render(
      <Button variant={ButtonVariant.danger}>Danger</Button>
    )

    expect(getByText(/Danger/i)).toHaveStyleRule(
      'background-color',
      color.failure
    )
  })

  it('can render with a left adornment', () => {
    const { getByText } = render(
      <Button
        leftAdornment={
          <span role="img" aria-label="fire">
            🔥
          </span>
        }
      >
        With Left Adornment
      </Button>
    )

    expect(getByText(/🔥/i)).toBeInTheDocument()
  })

  it('can render with disabled state', () => {
    const { getByText } = render(<Button disabled={true}>Disabled</Button>)

    expect(getByText(/Disabled/i)).toBeDisabled()
  })

  it('can render with loading state', () => {
    const { getByRole } = render(<Button loading={true}>Loading</Button>)

    expect(getByRole('status')).toBeInTheDocument()
  })
})
