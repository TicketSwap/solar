import React from 'react'
import { StarRating } from '.'
import { InputWithLabel } from '../Input'
import { Textarea } from '../Textarea'

export default {
  title: 'Components/Inputs/StarRating',
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

WithInitialRating.storyName = 'With initial rating'

export const WithinForm = () => (
  <form style={{ display: 'grid', gridGap: '1rem' }}>
    <InputWithLabel id="email" label="Email" />
    <StarRating label="Your rating" onChange={rating => console.log(rating)} />
    <Textarea aria-label="Text box" />
  </form>
)

WithinForm.storyName = 'Within form'
