import React from 'react'
import { render } from '../../../test/test.utils'
import { Instruction } from './'

describe('Instruction', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <Instruction variant="danger">This is an instruction</Instruction>
    )

    expect(getByText(/This is an instruction/i)).toBeInTheDocument()
  })
})
