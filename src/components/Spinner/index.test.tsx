import React from 'react'
import { render } from '@testing-library/react'
import { Spinner } from '.'

describe('Spinner', () => {
  it('renders without crashing', () => {
    const { container, getByRole } = render(<Spinner />)
    expect(container.firstChild).toBeInTheDocument()
    expect(getByRole('status')).toBeInTheDocument()
  })
})
