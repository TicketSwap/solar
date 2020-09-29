import React from 'react'
import { Cover } from '.'
import { Avatar } from '../Avatar'
import { H1 } from '../Heading'

const data = {
  randomBackgroundImage: {
    copyrightText: 'Geza Talaber',
    copyrightLink: 'https://www.facebook.com/gezatalaberphotography',
    imageSizes: {
      desktop:
        'https://s3-eu-west-1.amazonaws.com/ticketswap/public/201610/80afc84b-2091-4359-9fd7-9126d684182c.jpeg',
      tablet:
        'https://s3-eu-west-1.amazonaws.com/ticketswap/public/201610/87dc40a0-2c46-4130-9881-42779bcd3215.jpeg',
      mobileLandscape:
        'https://s3-eu-west-1.amazonaws.com/ticketswap/public/201610/3154ef01-2e6b-4e50-99c9-91edc13f3f6a.jpeg',
      mobilePortrait:
        'https://s3-eu-west-1.amazonaws.com/ticketswap/public/201610/904e600a-4994-40cf-8ea2-792e6d6d7a9b.jpeg',
    },
  },
}

export default {
  title: 'Cover',
}

export const basic = () => (
  <Cover images={data.randomBackgroundImage.imageSizes}>
    <H1>Awakenings Festival 2019</H1>
  </Cover>
)

export const basicBlurred = () => (
  <Cover
    blurred
    imageUrl="https://graph.facebook.com/83711079303/picture?redirect=true&type=large"
  >
    <Avatar
      src="https://graph.facebook.com/83711079303/picture?redirect=true&type=large"
      size={128}
    />
    <H1>Drake</H1>
  </Cover>
)

basicBlurred.storyName = 'Basic blurred'

export const fullHeight = () => (
  <Cover
    fullHeight
    caption={data.randomBackgroundImage.copyrightText}
    captionUrl={data.randomBackgroundImage.copyrightLink}
    images={data.randomBackgroundImage.imageSizes}
  >
    <H1>The safest way to buy and sell e-tickets</H1>
  </Cover>
)

fullHeight.storyName = 'Full height'

export const withoutImage = () => (
  <Cover fullHeight>
    <H1>The safest way to buy and sell e-tickets</H1>
  </Cover>
)

withoutImage.storyName = 'Without image'
