import React from 'react'
import { render } from '../../../test/test.utils'
import { Card } from '../Card'
import { CardCarousel } from '.'

const cards = [
  {
    text: 'It’s really helpful to have a personal contact.',
    author: 'Glenn Gijsberts',
  },
  {
    text: 'I like how the tool is working.',
    author: 'Rob Vermeer',
  },
  {
    text: 'The design looks great!',
    author: 'Jelle Doe',
  },
]

describe('CardCarousel', () => {
  it('renders without crashing', () => {
    const { container, getByText } = render(
      <CardCarousel
        leftHeader={<p>What other says</p>}
        cards={cards.map((card, index) => (
          <Card key={index} text={card.text} subtitle={card.author} />
        ))}
      />
    )

    expect(container.firstChild).toBeInTheDocument()
    expect(getByText(/What other says/i)).toBeInTheDocument()
    expect(getByText(/Glenn Gijsberts/i)).toBeInTheDocument()
    expect(getByText(/Rob Vermeer/i)).toBeInTheDocument()
    expect(getByText(/Jelle Doe/i)).toBeInTheDocument()
  })
})
