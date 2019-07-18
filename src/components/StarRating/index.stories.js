import React from 'react'
import { storiesOf } from '@storybook/react'
import { StarRating } from './'
import { Input } from '../Input'

storiesOf('StarRating', module)
  .add('basic', () => (
    <StarRating onChange={rating => console.log(rating)} label="Rating" />
  ))
  .add('with initial rating', () => (
    <StarRating
      initialRating={3}
      onChange={rating => console.log(rating)}
      label="Rating"
    />
  ))
  .add('within form', () => (
    <form style={{ display: 'grid', gridGap: '1rem' }}>
      <Input label="Email" />
      <StarRating
        label="Your rating"
        onChange={rating => console.log(rating)}
      />
      <Input label="Message" as="textarea" />
    </form>
  ))
