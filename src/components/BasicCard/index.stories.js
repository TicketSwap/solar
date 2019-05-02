import React from 'react'
import styled from '@emotion/styled'
import { storiesOf } from '@storybook/react'
import { BasicCard } from './'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  @media (min-width: 48em) {
    grid-gap: 2rem;
  }
`

const cards = [
  {
    image:
      'https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80',
    title: 'Dockyard Festival #ade I am a very long title',
    info: 'Sat, 20th October • Havenpark',
    tickets: '34 tickets',
  },
  {
    image:
      'https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80',
    title: 'Dockyard Festival #ade',
    info: 'Sat, 20th October • Havenpark',
    tickets: '34 tickets',
  },
  {
    image:
      'https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80',
    title: 'Dockyard Festival #ade',
    info: 'Sat, 20th October • Havenpark',
    tickets: '34 tickets',
  },
]

storiesOf('BasicCard', module)
  .add('basic', () => (
    <Container>
      {cards.map(card => (
        <a href="/">
          <BasicCard
            title={card.title}
            subtitle={card.info}
            info={card.tickets}
          />
        </a>
      ))}
    </Container>
  ))
  .add('basic loading', () => (
    <Container>
      {cards.map(card => (
        <a href="/">
          <BasicCard
            title={card.title}
            subtitle={card.info}
            info={card.tickets}
            loading={true}
          />
        </a>
      ))}
    </Container>
  ))
  .add('with image', () => (
    <Container>
      {cards.map(card => (
        <a href="/">
          <BasicCard
            imageUrl={card.image}
            title={card.title}
            subtitle={card.info}
            info={card.tickets}
          />
        </a>
      ))}
    </Container>
  ))
  .add('with image loading', () => (
    <Container>
      {cards.map(card => (
        <a href="/">
          <BasicCard
            imageUrl={'Image'}
            title={card.title}
            subtitle={card.info}
            info={card.tickets}
            loading={true}
          />
        </a>
      ))}
    </Container>
  ))
