import React from 'react'
import { Collapsible } from './index'
import { fireEvent, render } from '@testing-library/react'

describe('Collapsible', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Collapsible buttonLabel="Listing information">
        <ul>
          <li>Uno</li>
          <li>Dos</li>
          <li>Tres</li>
        </ul>
      </Collapsible>
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('can toggle the collapsible', () => {
    const { getByText } = render(
      <Collapsible buttonLabel="A">
        <ul>
          <li>Uno</li>
          <li>Dos</li>
          <li>Tres</li>
        </ul>
      </Collapsible>
    )

    expect(getByText(/A/i)).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(getByText(/A/i))
    expect(getByText(/A/i)).toHaveAttribute('aria-expanded', 'true')
  })
})
