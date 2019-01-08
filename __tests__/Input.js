import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import { Input } from '../src/components/Input'
import { space } from '../src/theme'

describe('Input', () => {
  const handleReset = jest.fn()

  it('renders without crashing', () => {
    const { container } = render(<Input id="fname" label="First Name" />)
    const el = container.firstChild
    expect(el).toBeInTheDocument()
  })

  it('renders the input with label', () => {
    const { getByText } = render(<Input id="fname" label="First Name" />)
    const label = getByText(/first name/i).parentNode
    expect(label).toBeInTheDocument()
  })

  it('renders the input with hidden label', () => {
    const { getByText } = render(
      <Input id="fname" label="First Name" hideLabel />
    )
    const label = getByText(/first name/i).parentNode
    expect(label).toHaveStyleRule('height', '1px')
    expect(label).toHaveStyleRule('margin', '-1px')
  })

  it('renders the input with a rounded border', () => {
    const { getByLabelText } = render(
      <Input id="fname" label="First Name" rounded />
    )
    const input = getByLabelText(/first name/i)
    expect(input).toHaveStyleRule('border-radius', space[32])
  })

  it('renders the input with a clear button', () => {
    const { getByTestId } = render(
      <Input
        id="fname"
        label="First Name"
        value="Some value"
        onChange={() => {}}
        onReset={handleReset}
      />
    )
    const closeButton = getByTestId('reset-button')
    expect(closeButton).toBeInTheDocument()
  })

  it('clicking the reset button calls the reset handler', () => {
    const { getByTestId } = render(
      <Input
        id="fname"
        label="First Name"
        value="Some value"
        onChange={() => {}}
        onReset={handleReset}
      />
    )
    const closeButton = getByTestId('reset-button')
    fireEvent.click(closeButton)
    expect(handleReset).toHaveBeenCalledTimes(1)
  })
})
