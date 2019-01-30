import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { Alert } from '../src/components/Alert'
import { color } from '../src/theme'

describe('Alert', () => {
  it('renders without crashing and calls action handlers', () => {
    const primaryAction = jest.fn()
    const secondaryAction = jest.fn()
    const { container, getByText } = render(
      <Alert
        primaryAction={{
          label: 'Primary Action',
          onClick: primaryAction,
        }}
        secondaryAction={{
          label: 'Secondary Action',
          onClick: secondaryAction,
        }}
      >
        Body
      </Alert>
    )
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(getByText(/primary action/i))
    expect(primaryAction).toHaveBeenCalledTimes(1)
    fireEvent.click(getByText(/secondary action/i))
    expect(secondaryAction).toHaveBeenCalledTimes(1)
  })

  it('renders info colors correctly', () => {
    const { container, getByText } = render(
      <Alert
        primaryAction={{
          label: 'Action',
          onClick: jest.fn(),
        }}
      >
        Body
      </Alert>
    )
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      color.earthLightest
    )
    expect(getByText(/action/i)).toHaveStyleRule('color', color.earth)
  })

  it('renders success colors correctly', () => {
    const { container, getByText } = render(
      <Alert
        variant="success"
        primaryAction={{
          label: 'Action',
          onClick: jest.fn(),
        }}
      >
        Body
      </Alert>
    )
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      color.titanLightest
    )
    expect(getByText(/action/i)).toHaveStyleRule('color', color.titan)
  })

  it('renders error colors correctly', () => {
    const { container, getByText } = render(
      <Alert
        variant="error"
        primaryAction={{
          label: 'Action',
          onClick: jest.fn(),
        }}
      >
        Body
      </Alert>
    )
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      color.marsLightest
    )
    expect(getByText(/action/i)).toHaveStyleRule('color', color.mars)
  })

  it('renders warning colors correctly', () => {
    const { container, getByText } = render(
      <Alert
        variant="warning"
        primaryAction={{
          label: 'Action',
          onClick: jest.fn(),
        }}
      >
        Body
      </Alert>
    )
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      color.sunLightest
    )
    expect(getByText(/action/i)).toHaveStyleRule('color', color.sun)
  })
})
