import React from 'react'
import { ImageCard } from '.'
import styled from '@emotion/styled'
import { device } from '../../theme'

const Container = styled.div`
  @media ${device.tablet} {
    inline-size: 704px;
    block-size: 244px;
  }
`

export const basic = () => (
  <Container>
    <ImageCard
      imageAlt="intoTheDunesImage"
      imageUrl="https://s3-eu-west-1.amazonaws.com/ticketswap-public/public/201610/80afc84b-2091-4359-9fd7-9126d684182c.jpeg"
      title="Into the dunes Festival"
      text="Whisper of the sand in the dunes, sun on your face, feet burning... find the oasis"
    />
  </Container>
)

const story = {
  title: 'Components/Surfaces/ImageCard',
}

export default story
