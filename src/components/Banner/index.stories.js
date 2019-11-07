import React from 'react'
import { Banner } from './'
import { H2 } from '../Heading'

export default {
  title: 'Banner',
}

export const Basic = () => (
  <Banner
    backgroundImageUrl="https://mynoise.net/Data/RPGFOREST/fb.jpg"
    url="https://ticketswap.com"
  >
    <H2>Some event</H2>
    <p>Description about the event</p>
  </Banner>
)
