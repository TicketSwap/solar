import React from 'react'
import { render, screen } from '../../../test/test.utils'
import { Textarea } from './'

describe('Textarea', () => {
  it('renders without crashing', () => {
    render(
      <Textarea
        onChange={() => null}
        value="Hello"
        id="test"
        name="test"
        label="Textarea"
      />
    )

    expect(screen.getByLabelText('Textarea')).toBeInTheDocument()
  })

  it('changes the value when typed in', async () => {
    const { user } = render(<Textarea label="Textarea" id="textarea" />)

    await user.type(screen.getByLabelText('Textarea'), 'hello')

    expect(screen.getByLabelText('Textarea')).toHaveValue('hello')
  })
})
