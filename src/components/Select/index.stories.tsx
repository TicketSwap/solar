import React from 'react'
import { Select, SelectItemType } from './'
import { MagnifyingGlass, Plus } from '../../icons'
import { Flag } from '../Flag'
import { color } from '../../theme'

const items = [
  { value: 'de', name: 'German' },
  { value: 'it', name: 'Italian' },
  { value: 'nl', name: 'Dutch' },
  { value: 'en', name: 'English' },
  { value: 'hu', name: 'Hungarian' },
  { value: 'fr', name: 'French' },
  { value: 'es', name: 'Spanish' },
]

const itemsWithActions = [
  { value: 'ideal', name: 'iDeal' },
  { value: 'credit_card', name: 'Credit Card' },
  {
    value: 'other',
    name: 'My prefered payment method is missing',
    type: SelectItemType.action,
    leftAdornment: <Plus size={20} color={color.action} />,
    onClick: () => alert('That is a bummer!'),
  },
]

export default {
  title: 'Components/Inputs/Deprecated/Select',
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

export const withActions = () => (
  <Select
    items={itemsWithActions}
    id="language"
    label="Language"
    help="Select a language"
    onChange={selection => console.log(selection)}
    initialSelectedItem={itemsWithActions[0]}
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
