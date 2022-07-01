import React, { useState } from 'react'
import { House, Logout, MagnifyingGlass, Star } from '../../icons'
import { Instruction } from '../Instruction'
import { Select } from './'

export default {
  title: 'Components/Inputs/SelectV2',
}

export const Basic = () => {
  const [value, setValue] = useState('horse')
  return (
    <Select
      id="pet"
      onChange={event => setValue(event.target.value)}
      aria-label="Select your favourite pet"
      value={value}
      options={[
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Pig', value: 'pig' },
        { label: 'Horse', value: 'horse' },
        { label: 'Chicken', value: 'chicken' },
        { label: 'Turtle', value: 'turtle' },
        { label: 'Tiger', value: 'tiger' },
        { label: 'Izzy', value: 'izzy' },
      ]}
    />
  )
}

export const WithLabel = () => {
  const [value, setValue] = useState('horse')
  return (
    <Select
      id="pet"
      onChange={event => setValue(event.target.value)}
      label="Select your favourite pet"
      value={value}
      options={[
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Pig', value: 'pig' },
        { label: 'Horse', value: 'horse' },
        { label: 'Chicken', value: 'chicken' },
        { label: 'Turtle', value: 'turtle' },
        { label: 'Tiger', value: 'tiger' },
        { label: 'Izzy', value: 'izzy' },
      ]}
      instruction={<Instruction>Of course Izzy is your favourite</Instruction>}
    />
  )
}

export const WithAdornment = () => (
  <Select
    id="pet"
    startAdornment={<MagnifyingGlass size="24" />}
    label="Select your favourite pet"
    options={[
      { label: 'Dog', value: 'dog' },
      { label: 'Cat', value: 'cat' },
      { label: 'Pig', value: 'pig' },
    ]}
  />
)

export const WithOptionAdornment = () => (
  <Select
    id="pet"
    label="Select your favourite pet"
    options={[
      { label: 'Home', value: 'home', startAdornment: <House size="20" /> },
      {
        label: 'Favourites',
        value: 'favourites',
        startAdornment: <Star size="20" />,
      },
      {
        label: 'Logout',
        value: 'logout',
        startAdornment: <Logout size="20" />,
      },
    ]}
  />
)

export const WithSelectedAdornment = () => (
  <Select
    id="pet"
    label="Select your favourite pet"
    options={[
      { label: 'Home', value: 'home', startAdornment: <House size="20" /> },
      {
        label: 'Favourites',
        value: 'favourites',
        startAdornment: <Star size="20" />,
      },
      {
        label: 'Logout',
        value: 'logout',
        startAdornment: <Logout size="20" />,
      },
    ]}
    variant="long"
  />
)

export const WithValues = () => (
  <Select
    id="pet"
    label="Select your favourite pet"
    options={[{ value: 'dog' }, { value: 'cat' }, { value: 'pig' }]}
  />
)
