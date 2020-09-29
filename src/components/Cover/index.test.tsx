import React from 'react'
import { render } from '@testing-library/react'
import { Cover } from '.'
import { H1 } from '../Heading'

describe('Cover', () => {
  it('renders without crashing', () => {
    const { container, getByText } = render(
      <Cover
        fullHeight={true}
        caption="i am a caption"
        imageUrl="https://cdn.ticketswap.com/public/201810/b8010445-f7dd-4a7a-86ec-96748d742d58.64738ee46de91a6a52866112dc7b17d85e3453c6.jpeg"
      >
        <H1>Heading</H1>
      </Cover>
    )
    expect(container.firstChild).toBeInTheDocument()
    expect(getByText(/i am a caption/i)).toBeInTheDocument()
  })
})
