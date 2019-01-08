import React from 'react'
import { render } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { Banner } from '../src/components/Banner'
import { H2 } from '../src/components/Heading'

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
    const el = container.firstChild
    expect(el).toBeInTheDocument()
  })
})
