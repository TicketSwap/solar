import React from 'react'
import { Banner } from './'
import { H2 } from '../Heading'

export const Basic = () => (
  <Banner backgroundImageUrl="https://mynoise.net/Data/RPGFOREST/fb.jpg">
    <H2>Some event</H2>
    <p>Description about the event</p>
  </Banner>
)

export default {
  title: 'Components/Surfaces/Banner',
}
