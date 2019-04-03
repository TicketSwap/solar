import React from 'react'
import { storiesOf } from '@storybook/react'
import { Select } from './'

const items = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

storiesOf('Select', module).add('basic', () => (
  <Select
    items={items}
    id="language"
    label="Language"
    onChange={selection => console.log(selection)}
    initialSelectedItem={items[1]}
  />
))
