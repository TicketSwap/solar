import React from 'react'
import { Combobox } from './'
import { Flag } from '../Flag'
import { Envelope, Messenger, Phone } from '../../icons'

const banks = [
  {
    value: '492',
    name: 'ING BANK N.V (492)',
  },
  {
    value: '652',
    name: 'ITAÚ UNIBANCO HOLDING BM S.A (652)',
  },
  {
    value: '128',
    name: 'MS BANK S.A BANCO DE CÂMBIO (128)',
  },
  {
    value: '137',
    name: 'MULTIMONEY CC LTDA (137)',
  },
]

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
  title: 'Components/Inputs/Combobox',
}

export const basic = () => (
  <Combobox id="Combobox" label="Combobox" items={tickets} />
)

export const withAdornment = () => (
  <Combobox id="Combobox" label="Combobox" items={countries} />
)

export const mixed = () => (
  <Combobox id="Combobox" label="Combobox" items={communicationMethods} />
)

export const normalized = () => (
  <Combobox id="Combobox" label="Combobox" items={banks} normalize={true} />
)

export const withInitialValue = () => (
  <Combobox
    id="country"
    label="Country"
    items={countries}
    initialValue="at"
    hideLabel
    onChange={selection => alert(selection.name)}
  />
)

export const withOnReset = () => (
  <Combobox
    id="country"
    label="Country"
    items={countries}
    initialValue="at"
    hideLabel
    onReset={() => console.log('reset')}
    onChange={selection => alert(selection.name)}
  />
)

withInitialValue.storyName = 'With initial value'
