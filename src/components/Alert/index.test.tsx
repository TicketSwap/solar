import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { matchers } from '@emotion/jest'
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
      color.infoBackground
    )
    expect(getByText(/action/i)).toHaveStyleRule('color', color.info)
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
      color.successBackground
    )
    expect(getByText(/action/i)).toHaveStyleRule('color', color.success)
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
      color.failureBackground
    )
    expect(getByText(/action/i)).toHaveStyleRule('color', color.failure)
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
      color.warningBackground
    )
    expect(getByText(/action/i)).toHaveStyleRule('color', color.warning)
  })
})
