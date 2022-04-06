import React from 'react'
import { fireEvent, render, screen } from '../../../test/test.utils'
import { matchers } from '@emotion/jest'
import { BaseButton, BaseButtonSize, ButtonVariant } from '.'
import { color, fontSize } from '../../theme'

expect.extend(matchers)

describe('BaseButton', () => {
  it('renders without crashing and calls action handlers', () => {
    const action = jest.fn()
    render(<BaseButton onClick={action}>Default</BaseButton>)
    fireEvent.click(screen.getByText('Default'))
    expect(action).toHaveBeenCalledTimes(1)
  })

  it('renders the variant prop correctly', () => {
    render(<BaseButton variant={ButtonVariant.danger}>Danger</BaseButton>)

    expect(screen.getByText('Danger')).toHaveStyleRule('color', color.failure)
  })

  it('renders the small size correctly', () => {
    render(<BaseButton size={BaseButtonSize.small}>Small</BaseButton>)
    expect(screen.getByText('Small')).toHaveStyleRule('font-size', fontSize[14])
  })

  it('renders the medium size correctly', () => {
    render(<BaseButton>Medium</BaseButton>)

    expect(screen.getByText('Medium')).toHaveStyleRule(
      'font-size',
      fontSize[16]
    )
  })

  it('can render with a left adornment', () => {
    render(
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

    expect(screen.getByText('🔥')).toBeInTheDocument()
  })
})
