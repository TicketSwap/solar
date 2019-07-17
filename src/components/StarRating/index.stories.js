import React from 'react'
import { storiesOf } from '@storybook/react'
import { StarRating } from './'

storiesOf('StarRating', module)
  .add('basic', () => <StarRating onChange={rating => console.log(rating)} />)
  .add('with initial rating', () => (
    <StarRating initialRating={3} onChange={rating => console.log(rating)} />
  ))
