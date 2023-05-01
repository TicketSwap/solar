import React from 'react'
import { render } from '../../../test/test.utils'
import { Carousel } from '.'
import { ImageCard } from '../ImageCard'
import styled from '@emotion/styled'
import { space, color } from '../../theme'
import { H6, H2 } from '../Heading'

const cards = [
  {
    imageUrl:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/201610/80afc84b-2091-4359-9fd7-9126d684182c.jpeg',
    text: 'IFind your oasis!',
    title: 'Desert festival',
  },
  {
    imageUrl:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/201610/80afc84b-2091-4359-9fd7-9126d684182c.jpeg',
    text: 'Let’s get wild!',
    title: 'Jungle festival',
  },
  {
    imageUrl:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/201610/80afc84b-2091-4359-9fd7-9126d684182c.jpeg',
    text: 'Swim like a fish!',
    title: 'Ocean festival',
  },
]

const StyledH6 = styled(H6)`
  color: ${color.action};
  text-transform: none;
  cursor: pointer;
  padding-inline-start: ${space[8]};
`

describe('Carousel', () => {
  it('renders without crashing', () => {
    const { container, getByText } = render(
      <Carousel
        id="curratedContentCarousel"
        leftHeader={<H2>Our top picks</H2>}
        rightHeader={
          <StyledH6 onClick={() => window.alert('This is all')}>
            See all
          </StyledH6>
        }
        cards={cards.map((card, index) => (
          <ImageCard
            key={index}
            title={card.title}
            imageAlt={`${card.title}-image`}
            text={card.text}
            imageUrl={card.imageUrl}
          />
        ))}
      />
    )

    expect(container.firstChild).toBeInTheDocument()
    expect(getByText(/Our top picks/i)).toBeInTheDocument()
    expect(getByText(/Desert festival/i)).toBeInTheDocument()
    expect(getByText(/Ocean festival/i)).toBeInTheDocument()
    expect(getByText(/Jungle festival/i)).toBeInTheDocument()
  })
})
