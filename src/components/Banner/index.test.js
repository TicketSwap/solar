import React from 'react'
import { render } from '@testing-library/react'
import { Banner } from './'
import { H2 } from '../Heading'

describe('Banner', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Banner
        backgroundImageUrl="https://mynoise.net/Data/RPGFOREST/fb.jpg"
        url="https://ticketswap.com"
      >
        <H2>Some event</H2>
        <p>Description about the event</p>
      </Banner>
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
