import React from 'react'
import { Avatar } from './'

export default {
  title: 'Avatar',
}

export const WithoutImage = () => <Avatar />

WithoutImage.story = {
  name: 'Without image',
}

export const WithImage = () => (
  <Avatar src="https://cdn.ticketswap.com/public/testimonials/201810/0946ce7a-5863-4f9f-9636-5ba8bb8414c3.jpeg" />
)

WithImage.story = {
  name: 'With image',
}

export const WithImageAndCustomSize = () => (
  <Avatar
    src="https://cdn.ticketswap.com/public/testimonials/201810/0946ce7a-5863-4f9f-9636-5ba8bb8414c3.jpeg"
    size={64}
  />
)

WithImageAndCustomSize.story = {
  name: 'With image and custom size',
}
