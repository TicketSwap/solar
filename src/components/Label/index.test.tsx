import React from 'react'
import { render } from '../../../test/test.utils'
import { Label } from './'

describe('Label', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Label htmlFor="input">This is a label</Label>)

    expect(getByText(/This is a label/i)).toBeInTheDocument()
  })

  describe('when clicked', () => {
    it('focusess on the accompanied input', async () => {
      const { user, getByText, getByLabelText } = render(
        <>
          <Label htmlFor="input">This is a label</Label>
          <input id="input" />
        </>
      )

      const label = getByText(/This is a label/i)

      await user.click(label)

      const input = getByLabelText(/This is a label/i)

      expect(input).toHaveFocus()
    })
  })
})
