import React from 'react'
import { render } from '../../../test/test.utils'
import { Flag } from '.'

describe('Flag', () => {
  it('renders without crashing', () => {
    const { container } = render(<Flag countryCode="nl" />)

    expect(container.firstChild).toBeInTheDocument()
  })
})
