import React from 'react'
import styled from '@emotion/styled'
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

export default {
  title: 'BasicCard',
}

export const Basic = () => (
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
)

export const BasicLoading = () => (
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
)

BasicLoading.story = {
  name: 'Basic loading',
}

export const WithImage = () => (
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
)

WithImage.story = {
  name: 'With image',
}

export const WithImageAndIcon = () => (
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
)

WithImageAndIcon.story = {
  name: 'With image and icon',
}

export const WithImageLoading = () => (
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
)

WithImageLoading.story = {
  name: 'With image loading',
}
