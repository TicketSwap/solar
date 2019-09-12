import * as React from 'react'
import { render } from '@testing-library/react'
import { Avatar } from './'

describe('Avatar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Avatar src="https://cdn.ticketswap.com/public/testimonials/201810/0946ce7a-5863-4f9f-9636-5ba8bb8414c3.jpeg" />
    )
    const el = container.firstChild
    expect(el).toBeInTheDocument()
  })
})
