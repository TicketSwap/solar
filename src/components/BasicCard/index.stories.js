import React from 'react'
import styled from '@emotion/styled'
import { storiesOf } from '@storybook/react'
import { Loudspeaker } from '@ticketswap/comets'
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
    image: 'https://source.unsplash.com/user/vanschneider/likes/600x400',
    title: 'Dockyard Festival #ade I am a very long title',
    info: 'Sat, 20th October • Havenpark',
    tickets: '34 tickets',
  },
  {
    image: 'https://source.unsplash.com/user/vanschneider/likes/600x400',
    title: 'Dockyard Festival #ade',
    info: 'Sat, 20th October • Havenpark',
    tickets: '34 tickets',
  },
  {
    image: 'https://source.unsplash.com/user/vanschneider/likes/600x400',
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
  .add('with image and icon', () => (
    <Container>
      {cards.map(card => (
        <a href="/">
          <BasicCard
            imageUrl={card.image}
            adornment={<Loudspeaker size={48} />}
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
