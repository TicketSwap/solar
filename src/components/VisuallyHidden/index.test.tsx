import React from 'react'
import { render } from '@testing-library/react'
import { VisuallyHidden } from '.'

describe('VisuallyHidden', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <VisuallyHidden>
        <p>Hidden</p>
      </VisuallyHidden>
    )
    expect(getByText(/Hidden/i)).toBeInTheDocument()
  })
})
