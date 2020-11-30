import React from 'react'
import { Select } from './'
import { MagnifyingGlass } from '@ticketswap/comets'

const items = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

export default {
  title: 'Select',
}

export const Basic = () => (
  <Select
    items={items}
    id="language"
    label="Language"
    help="Select a language"
    onChange={selection => console.log(selection)}
    initialSelectedItem={items[1]}
    leftAdornment={<MagnifyingGlass size={24} />}
  />
)

export const HideLabel = () => (
  <Select
    items={items}
    id="language"
    label="Language"
    help="Select a language"
    onChange={selection => console.log(selection)}
    initialSelectedItem={items[1]}
    leftAdornment={<MagnifyingGlass size={24} />}
    hideLabel
  />
)
