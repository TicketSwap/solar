import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input id="my-input" aria-label="Hello, World!" />)
    screen.logTestingPlaygroundURL()
    expect(
      screen.getByRole('textbox', {
        name: /hello, world!/i,
      })
    ).toBeInTheDocument()
  })
})
