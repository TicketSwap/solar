import React from 'react'
import { Carousel } from '.'
import styled from '@emotion/styled'
import { Card, CardVerticalAlign, CardSize } from '../Card'
import { CalendarAlt } from '../../icons'
import { TinyText } from '../Text'
import { space, color, device } from '../../theme'
import { H6, H2 } from '../Heading'

const cards = [
  {
    imageUrl:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/201610/80afc84b-2091-4359-9fd7-9126d684182c.jpeg',
    text: 'Be grateful to mother earth!',
    title: 'Nature festival',
  },
  {
    imageUrl:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/201610/80afc84b-2091-4359-9fd7-9126d684182c.jpeg',
    text: 'Find your oasis!',
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
  {
    imageUrl:
      'https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/201610/80afc84b-2091-4359-9fd7-9126d684182c.jpeg',
    text: 'Be grateful to mother earth!',
    title: 'Nature festival 2',
  },
]

const Layout = styled.div`
  max-inline-size: 704px;
`
const StyledCard = styled(Card)`
  block-size: 206px;
  inline-size: 308px;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${space[4]};
`
const StyledH6 = styled(H6)`
  color: ${color.action};
  text-transform: none;
  cursor: pointer;
  padding-inline-start: ${space[8]};
`
const Container = styled.div`
  inline-size: 250px;
  block-size: 209px;

  @media ${device.tablet} {
    inline-size: 639px;
    block-size: 244px;
  }
`

export const CarouselWith1Column = () => (
  <Layout>
    <Carousel
      id="curratedContentCarousel"
      leftHeader={<H2>Our top picks</H2>}
      rightHeader={
        <StyledH6 onClick={() => window.alert('This is all')}>See all</StyledH6>
      }
      cards={cards.map((card, index) => (
        <Container>
          <Card
            size={CardSize.large}
            title={card.title}
            text={card.text}
            verticalAlign={CardVerticalAlign.top}
          />
        </Container>
      ))}
    />
  </Layout>
)

CarouselWith1Column.storyName = 'Carousel with single element'

export const CarouselWith2Columns = () => (
  <Layout>
    <Carousel
      id="eventCardCarousel"
      leftHeader={<H2>Popular events nearby</H2>}
      rightHeader={
        <StyledH6 onClick={() => window.alert('This is all')}>See all</StyledH6>
      }
      numberOfColumns={2}
      cards={cards.map((card, index) => (
        <StyledCard
          key={index}
          title={card.title}
          subtitle={card.text}
          image={card.imageUrl}
          header={
            <Header>
              <CalendarAlt size={16} />
              <TinyText>Multiple dates</TinyText>
            </Header>
          }
        />
      ))}
    />
  </Layout>
)

CarouselWith2Columns.storyName = 'Carousel with multiple columns'

const story = {
  title: 'Components/Layout/Carousel',
}

export default story
