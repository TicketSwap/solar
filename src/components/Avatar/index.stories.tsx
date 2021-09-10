import React from 'react'
import { Avatar } from './'

export const WithoutImage = () => <Avatar />

WithoutImage.storyName = 'Without image'

export const WithImage = () => (
  <Avatar
    src="https://cdn.ticketswap.com/public/testimonials/201810/0946ce7a-5863-4f9f-9636-5ba8bb8414c3.jpeg"
    alt="Avatar of Glenn"
  />
)

WithImage.storyName = 'With image'

export const WithImageAndCustomSize = () => (
  <Avatar
    src="https://cdn.ticketswap.com/public/testimonials/201810/0946ce7a-5863-4f9f-9636-5ba8bb8414c3.jpeg"
    size={64}
  />
)

WithImageAndCustomSize.storyName = 'With image and custom size'

export default {
  title: 'Avatar',
}
