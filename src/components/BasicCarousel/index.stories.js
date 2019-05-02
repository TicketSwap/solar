import React from 'react'
import styled from '@emotion/styled'
import { storiesOf } from '@storybook/react'
import { BasicCarousel } from './'
import { Image } from '../Image'
import { Button } from '../Button'
import { H4 } from '../Heading'
import { space, device } from '../../theme'

export const ContentWrapper = styled.div`
  position: relative;
  padding-left: ${space[16]};
  padding-right: ${space[16]};
  max-width: ${960 / 16}rem;
  margin: 0 auto;

  @media ${device.tablet} {
    padding-left: ${space[32]};
    padding-right: ${space[32]};
  }

  @media ${device.laptopM} {
    max-width: ${1128 / 16}rem;
  }
`

const items = [
  <div>
    <Image
      src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80"
      aspectRatio="4x3"
      rounded
    />
    <H4>Title</H4>
  </div>,
  <Image
    src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80"
    aspectRatio="4x3"
    rounded
  />,
  <Image
    src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80"
    aspectRatio="4x3"
    rounded
  />,
  <Image
    src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80"
    aspectRatio="4x3"
    rounded
  />,
  <Image
    src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80"
    aspectRatio="4x3"
    rounded
  />,
  <Image
    src="https://images.unsplash.com/photo-1539550298564-8a06769aa728?auto=format&fit=crop&w=400&q=80"
    aspectRatio="4x3"
    rounded
  />,
]

storiesOf('BasicCarousel', module)
  .add('default', () => (
    <ContentWrapper>
      <BasicCarousel
        items={items}
        itemWidth={1}
        itemWidthSm={0.75}
        itemWidthMd={0.25}
      />
    </ContentWrapper>
  ))
  .add('with variable-width items', () => (
    <ContentWrapper>
      <BasicCarousel
        items={[
          <Button rounded>Amsterdam</Button>,
          <Button rounded>Utrecht</Button>,
          <Button rounded>Zwolle</Button>,
          <Button rounded>Rotterdam</Button>,
          <Button rounded>Ghent</Button>,
          <Button rounded>Antwerp</Button>,
          <Button rounded>Paris</Button>,
          <Button rounded>Copenhagen</Button>,
          <Button rounded>Oslo</Button>,
          <Button rounded>Stockholm</Button>,
        ]}
      />
    </ContentWrapper>
  ))
