import { useState } from 'react'
import { House, Logout, MagnifyingGlass, Star } from '../../icons'
import { Select } from './'

export default {
  title: 'Components/Inputs/Select',
}

export const Basic = () => {
  const [value, setValue] = useState('horse')
  return (
    <Select
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

export const WithAdornment = () => (
  <Select
    startAdornment={<MagnifyingGlass size="24" />}
    aria-label="Select your favourite pet"
    options={[
      { label: 'Dog', value: 'dog' },
      { label: 'Cat', value: 'cat' },
      { label: 'Pig', value: 'pig' },
    ]}
  />
)

export const WithOptionAdornment = () => (
  <Select
    aria-label="Select your favourite pet"
    options={[
      { label: 'Home', value: 'home', startAdornment: <House size="20" /> },
      { label: 'Favourites', value: 'favourites', startAdornment: <Star size="20" /> },
      { label: 'Logout', value: 'logout', startAdornment: <Logout size="20" /> },
    ]}
  />
)

export const WithSelectedAdornment = () => (
  <Select
    aria-label="Select your favourite pet"
    options={[
      { label: 'Home', value: 'home', startAdornment: <House size="20" /> },
      { label: 'Favourites', value: 'favourites', startAdornment: <Star size="20" /> },
      { label: 'Logout', value: 'logout', startAdornment: <Logout size="20" /> },
    ]}
    variant="long"
  />
)
