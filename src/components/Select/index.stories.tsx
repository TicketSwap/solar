import React from 'react'
import { Select } from './'
import { MagnifyingGlass } from '@ticketswap/comets'
import { Flag } from '../Flag'

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

const languages = [
  { value: 'de', name: 'German', rightAdornment: <Flag countryCode="de" /> },
  { value: 'it', name: 'Italian', rightAdornment: <Flag countryCode="it" /> },
  {
    value: 'nl',
    name: 'Dutch',
    rightAdornment: <Flag countryCode="nl" />,
    leftAdornment: <Flag countryCode="nl" />,
  },
]

export const withItemAdornments = () => (
  <Select
    items={languages}
    id="language"
    label="Language"
    help="Select a language"
    onChange={selection => console.log(selection)}
    initialSelectedItem={items[0]}
    leftAdornment={<MagnifyingGlass size={24} />}
  />
)
