import React from 'react'
import { Collapsible } from './index'
import { fireEvent, render, screen } from '../../../test/test.utils'

describe('Collapsible', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Collapsible summary="Listing information">
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
      <Collapsible summary="Another beautiful Collapsible">
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

  it('can be rendered open by default', () => {
    const { getByText } = render(
      <Collapsible summary="Another beautiful Collapsible" defaultOpen={true}>
        <ul>
          <li>Uno</li>
          <li>Dos</li>
          <li>Tres</li>
        </ul>
      </Collapsible>
    )
    screen.logTestingPlaygroundURL()
    expect(getByText(/A/i)).toHaveAttribute('aria-expanded', 'true')
  })
})
