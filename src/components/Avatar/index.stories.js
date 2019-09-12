import React from 'react'
import { storiesOf } from '@storybook/react'
import { Avatar } from './'

storiesOf('Avatar', module)
  .add('basic', () => <Avatar />)
  .add('with image', () => (
    <Avatar src="https://cdn.ticketswap.com/public/testimonials/201810/0946ce7a-5863-4f9f-9636-5ba8bb8414c3.jpeg" />
  ))
  .add('with custom size', () => (
    <Avatar
      src="https://cdn.ticketswap.com/public/testimonials/201810/0946ce7a-5863-4f9f-9636-5ba8bb8414c3.jpeg"
      size={64}
    />
  ))
