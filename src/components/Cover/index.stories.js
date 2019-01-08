import React from 'react'
import { storiesOf } from '@storybook/react'
import { Cover } from './'
import { H1 } from '../Heading'

storiesOf('Cover', module)
  .add('basic', () => (
    <Cover
      theme="dark"
      imageUrl="https://cdn.ticketswap.com/public/201810/b8010445-f7dd-4a7a-86ec-96748d742d58.64738ee46de91a6a52866112dc7b17d85e3453c6.jpeg"
    >
      <H1>Awakenings Festival 2019</H1>
    </Cover>
  ))
  .add('basic tinted', () => (
    <Cover
      theme="dark"
      tinted
      imageUrl="https://cdn.ticketswap.com/public/201810/b8010445-f7dd-4a7a-86ec-96748d742d58.64738ee46de91a6a52866112dc7b17d85e3453c6.jpeg"
    >
      <H1>Awakenings Festival 2019</H1>
    </Cover>
  ))
  .add('full height', () => (
    <Cover
      height="full"
      theme="dark"
      caption="Photo &copy; Vincent van den Boogaard"
      captionUrl="https://www.facebook.com/vincentvandenboogaard"
      imageUrl="https://cdn.ticketswap.com/public/201810/b8010445-f7dd-4a7a-86ec-96748d742d58.64738ee46de91a6a52866112dc7b17d85e3453c6.jpeg"
    >
      <H1>The safest way to buy and sell e-tickets</H1>
    </Cover>
  ))
  .add('full height with light image', () => (
    <Cover
      height="full"
      theme="dark"
      caption="Photo &copy; Vincent van den Boogaard"
      captionUrl="https://www.facebook.com/vincentvandenboogaard"
      imageUrl="https://cdn.ticketswap.com/public/201810/7ee778ad-d732-4c18-94ba-b610f4dcb7e0.9ebfa223802beac137fe1eed63136b6ab22ab11c.jpeg"
    >
      <H1>The safest way to buy and sell e-tickets</H1>
    </Cover>
  ))
