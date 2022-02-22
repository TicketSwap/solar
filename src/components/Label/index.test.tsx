import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Label } from './'

describe('Label', () => {
  it('renders without crashing', () => {
    render(<Label htmlFor="input">This is a label</Label>)

    expect(screen.getByText(/This is a label/i)).toBeInTheDocument()
  })

  describe('when clicked', () => {
    it('focusess on the accompanied input', () => {
      render(
        <>
          <Label htmlFor="input">This is a label</Label>
          <input id="input" />
        </>
      )

      const label = screen.getByText(/This is a label/i)

      userEvent.click(label)

      const input = screen.getByLabelText(/This is a label/i)

      expect(input).toHaveFocus()
    })
  })
})
