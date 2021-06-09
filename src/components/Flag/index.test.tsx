import React from 'react'
import { render } from '@testing-library/react'
import { Flag } from '.'

describe('Flag', () => {
  it('renders without crashing', () => {
    const { container } = render(<Flag countryCode="nl" />)

    expect(container.firstChild).toBeInTheDocument()
  })
})
