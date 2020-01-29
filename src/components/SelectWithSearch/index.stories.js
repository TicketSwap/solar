import React from 'react'
import { SelectWithSearch } from './'
import { Flag } from '../Flag'
import { Envelope, Messenger, Phone } from '@ticketswap/comets'

const tickets = [
  { value: '1', name: '1 ticket' },
  { value: '2', name: '2 tickets' },
  { value: '3', name: '3 tickets' },
  { value: '4', name: '4 tickets' },
  { value: '5', name: '5 tickets' },
  { value: '6', name: '6 tickets' },
]

const communicationMethods = [
  { value: 'phone', name: 'Phone', adornment: <Phone size={20} /> },
  { value: 'mail', name: 'Mail', adornment: <Envelope size={20} /> },
  { value: 'talking', name: 'Talking' },
  { value: 'chat', name: 'Chat', adornment: <Messenger size={20} /> },
  { value: 'other', name: 'Other' },
]

const countries = [
  { value: 'nl', name: 'Netherlands', adornment: <Flag countryCode="nl" /> },
  { value: 'at', name: 'Austria', adornment: <Flag countryCode="at" /> },
  { value: 'de', name: 'Germany', adornment: <Flag countryCode="de" /> },
  { value: 'it', name: 'Italy', adornment: <Flag countryCode="it" /> },
  { value: 'be', name: 'Belgium', adornment: <Flag countryCode="be" /> },
  { value: 'au', name: 'Australia', adornment: <Flag countryCode="au" /> },
  { value: 'us', name: 'United States', adornment: <Flag countryCode="us" /> },
  { value: 'gb', name: 'United Kingdom', adornment: <Flag countryCode="gb" /> },
  { value: 'es', name: 'Spain', adornment: <Flag countryCode="es" /> },
  { value: 'br', name: 'Brazil', adornment: <Flag countryCode="br" /> },
  { value: 'fr', name: 'France', adornment: <Flag countryCode="fr" /> },
  { value: 'ch', name: 'Switzerland', adornment: <Flag countryCode="ch" /> },
  { value: 'hu', name: 'Hungary', adornment: <Flag countryCode="hu" /> },
]

export default {
  title: 'SelectWithSearch',
}

export const basic = () => (
  <SelectWithSearch
    id="selectWithSearch"
    label="SelectWithSearch"
    items={tickets}
  />
)

export const withAdornment = () => (
  <SelectWithSearch
    id="selectWithSearch"
    label="SelectWithSearch"
    items={countries}
  />
)

export const mixed = () => (
  <SelectWithSearch
    id="selectedWithSearch"
    label="SelectedWithSearch"
    items={communicationMethods}
  />
)

export const withInitialValue = () => (
  <SelectWithSearch
    id="country"
    label="Country"
    items={countries}
    initialValue="at"
    hideLabel
    onChange={selection => alert(selection.name)}
  />
)

withInitialValue.story = {
  name: 'with initial value',
}
