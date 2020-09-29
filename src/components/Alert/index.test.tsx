import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { matchers } from 'jest-emotion'
import { Alert, AlertVariant } from '.'
import { color } from '../../theme'

expect.extend(matchers)

describe('Alert', () => {
  it('renders without crashing and calls action handlers', () => {
    const action = jest.fn()
    const { container, getByText } = render(
      <Alert
        action={{
          label: 'Action',
          onClick: action,
        }}
      >
        Body
      </Alert>
    )
    expect(container.firstChild).toBeInTheDocument()
    fireEvent.click(getByText(/action/i))
    expect(action).toHaveBeenCalledTimes(1)
  })

  it('renders info colors correctly', () => {
    const { container, getByText } = render(
      <Alert
        action={{
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
        variant={AlertVariant.success}
        action={{
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
        variant={AlertVariant.error}
        action={{
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
        variant={AlertVariant.warning}
        action={{
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
