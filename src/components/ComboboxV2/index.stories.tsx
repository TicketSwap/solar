import React, { useState } from 'react'
import { Combobox } from './'
import { Flag } from '../Flag'

export default {
  title: 'Components/Inputs/ComboboxV2',
}

const countries = [
  {
    id: 'nl',
    value: 'nl',
    label: 'Netherlands',
    startAdornment: <Flag countryCode="nl" />,
  },
  {
    id: 'at',
    value: 'at',
    label: 'Austria',
    startAdornment: <Flag countryCode="at" />,
  },
  {
    id: 'de',
    value: 'de',
    label: 'Germany',
    startAdornment: <Flag countryCode="de" />,
  },
  {
    id: 'it',
    value: 'it',
    label: 'Italy',
    startAdornment: <Flag countryCode="it" />,
  },
  {
    id: 'be',
    value: 'be',
    label: 'Belgium',
    startAdornment: <Flag countryCode="be" />,
  },
  {
    id: 'au',
    value: 'au',
    label: 'Australia',
    startAdornment: <Flag countryCode="au" />,
  },
  {
    id: 'us',
    value: 'us',
    label: 'United States',
    startAdornment: <Flag countryCode="us" />,
  },
  {
    id: 'gb',
    value: 'gb',
    label: 'United Kingdom',
    startAdornment: <Flag countryCode="gb" />,
  },
  {
    id: 'es',
    value: 'es',
    label: 'Spain',
    startAdornment: <Flag countryCode="es" />,
  },
  {
    id: 'br',
    value: 'br',
    label: 'Brazil',
    startAdornment: <Flag countryCode="br" />,
  },
  {
    id: 'fr',
    value: 'fr',
    label: 'France',
    startAdornment: <Flag countryCode="fr" />,
  },
  {
    id: 'ch',
    value: 'ch',
    label: 'Switzerland',
    startAdornment: <Flag countryCode="ch" />,
  },
  {
    id: 'hu',
    value: 'hu',
    label: 'Hungary',
    startAdornment: <Flag countryCode="hu" />,
  },
]

export const Basic = () => {
  const [country, setCountry] = useState('de')

  return (
    <Combobox
      id="country"
      label="Country"
      options={countries}
      value={country}
      onChange={(_, value) => setCountry(value)}
    />
  )
}

export const Controlled = () => {
  const [country, setCountry] = useState('de')

  return (
    <Combobox
      id="country"
      aria-label="Country"
      options={countries}
      value={country}
      onChange={(_, value) => setCountry(value)}
    />
  )
}

export const Uncontrolled = () => (
  <Combobox
    id="country"
    aria-label="Country"
    options={countries}
    defaultValue="nl"
    onChange={console.log}
  />
)
