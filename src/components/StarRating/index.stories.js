import React from 'react'
import { StarRating } from './'
import { Input } from '../Input'

export default {
  title: 'StarRating',
}

export const Basic = () => (
  <StarRating onChange={rating => console.log(rating)} label="Rating" />
)

export const WithInitialRating = () => (
  <StarRating
    initialRating={3}
    onChange={rating => console.log(rating)}
    label="Rating"
  />
)

WithInitialRating.story = {
  name: 'With initial rating',
}

export const WithinForm = () => (
  <form style={{ display: 'grid', gridGap: '1rem' }}>
    <Input label="Email" />
    <StarRating label="Your rating" onChange={rating => console.log(rating)} />
    <Input label="Message" as="textarea" />
  </form>
)

WithinForm.story = {
  name: 'Within form',
}
