import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { matchers } from '@emotion/jest'
import { BaseButton, ButtonVariant } from '.'
import { color } from '../../theme'

expect.extend(matchers)

describe('BaseButton', () => {
  it('renders without crashing and calls action handlers', () => {
    const action = jest.fn()
    const { container, getByText } = render(
      <BaseButton onClick={action}>Default</BaseButton>
    )
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(getByText(/Default/i))
    expect(action).toHaveBeenCalledTimes(1)
  })

  it('renders the varriant prop correctly', () => {
    const { getByText } = render(
      <BaseButton variant={ButtonVariant.danger}>Danger</BaseButton>
    )

    expect(getByText(/Danger/i)).toHaveStyleRule('color', color.mars)
  })

  it('can render with a left adornment', () => {
    const { getByText } = render(
      <BaseButton
        leftAdornment={
          <span role="img" aria-label="fire">
            🔥
          </span>
        }
      >
        With Left Adornment
      </BaseButton>
    )

    expect(getByText(/🔥/i)).toBeInTheDocument()
  })
})
