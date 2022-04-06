import React from 'react'
import { Checkbox } from './'
import { fireEvent, render } from '../../../test/test.utils'
describe('Checkbox', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Checkbox id="updates" label="Do you want to receive updates?" />
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it('can toggle the checkbox', () => {
    const { getByLabelText, getByRole } = render(
      <Checkbox id="updates" label="Do you want to receive updates?" />
    )

    fireEvent.click(getByLabelText(/updates/i))
    expect(getByRole(/presentation/i)).toBeInTheDocument()
  })

  it('can be default on', () => {
    const { getByRole } = render(
      <Checkbox
        id="updates"
        label="Do you want to receive updates?"
        defaultOn
      />
    )

    expect(getByRole(/presentation/i)).toBeInTheDocument()
  })

  it('can have a help text', () => {
    const { getByText } = render(
      <Checkbox
        id="updates"
        label="Do you want to receive updates?"
        help="Help me"
      />
    )

    expect(getByText(/Help me/i)).toBeInTheDocument()
  })
})
