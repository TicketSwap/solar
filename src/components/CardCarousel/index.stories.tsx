import React from 'react'
import { CardCarousel } from '.'
import { H1 } from '../Heading'
import { Card } from '../Card'
import styled from '@emotion/styled'
import { color, space } from '../../theme'
import { Avatar } from '../../icons'

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
    text: 'I do not like this service at all!',
    author: 'Ronald Tol',
  },
  {
    text: 'The design looks great!',
    author: 'Jelle Doe',
  },
]

const StyledCard = styled(Card)`
  background-color: ${color.nova};
  min-width: 320px;

  &:hover,
  &:focus {
    background-color: ${color.nova};
  }
`

const Container = styled.div`
  padding: ${space[32]};
  background-color: ${color.stardustLight};
`

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: ${space[8]};
`

export const Basic = () => (
  <Container>
    <CardCarousel
      leftHeader={<H1>What other says</H1>}
      cards={cards.map((card, index) => (
        <StyledCard
          key={index}
          text={card.text}
          footer={
            <Author>
              <Avatar
                src="https://cdn.ticketswap.com/public/testimonials/201810/0946ce7a-5863-4f9f-9636-5ba8bb8414c3.jpeg"
                alt={`Avatar of ${card.author}`}
              />
              <p>{card.author}</p>
            </Author>
          }
        />
      ))}
    />
  </Container>
)

export default {
  title: 'Components/Layout/CardCarousel',
}
