import React, { useState } from 'react'
import { Chip, ChipWithSelect, ChipWithToggle } from './'
import { ChevronDown, CalendarAlt, Trophy, Filter } from '../../icons'

export default {
  title: 'Components/Actions/Chip',
}

export const Basic = () => <Chip onClick={console.log}>Has tickets</Chip>

export const Active = () => <Chip active>Today</Chip>

export const Compact = () => (
  <Chip compact startAdornment={<CalendarAlt size={24} />}>
    Nearby
  </Chip>
)

export const WithStartAdornment = () => (
  <Chip startAdornment={<CalendarAlt size={24} />}>Nearby</Chip>
)

export const WithEndAdornment = () => (
  <Chip endAdornment={<ChevronDown size={16} />}>Today</Chip>
)

export const WithAdornments = () => (
  <Chip
    active
    startAdornment={<CalendarAlt size={24} />}
    endAdornment={<ChevronDown size={16} />}
  >
    Clermont-Ferrand
  </Chip>
)

export const WithIcon = () => (
  <Chip>
    <Filter size={24} />
  </Chip>
)

export const WithSelectControlled = () => {
  const [value, setValue] = useState('tomorrow')

  return (
    <ChipWithSelect
      value={value}
      onChange={event => setValue(event.target.value)}
      options={[
        { label: 'Today', value: 'today' },
        { label: 'Tomorrow', value: 'tomorrow' },
        { label: 'This weekend', value: 'this-weekend' },
      ]}
    />
  )
}

export const WithSelectUncontrolled = () => (
  <ChipWithSelect
    options={[
      { label: 'Category', value: '' },
      { label: 'Festivals', value: 'festivals' },
      { label: 'Concerts', value: 'concerts' },
    ]}
  />
)

export const WithCompactSelect = () => (
  <ChipWithSelect
    compact
    startAdornment={<CalendarAlt size={24} />}
    options={[
      { label: 'Today', value: 'today' },
      { label: 'Tomorrow', value: 'tomorrow' },
      { label: 'This weekend', value: 'this-weekend' },
    ]}
  />
)

export const WithToggleControlled = () => {
  const [checked, setChecked] = useState(false)

  return (
    <>
      <div>
        <input
          type="checkbox"
          onChange={event => setChecked(event.target.checked)}
        />
      </div>
      <ChipWithToggle checked={checked}>Has tickets</ChipWithToggle>
    </>
  )
}

export const WithToggleUncontrolled = () => (
  <ChipWithToggle
    startAdornment={<Trophy size={24} />}
    endAdornment={<Trophy size={24} />}
    onChange={event => console.log(event.target.checked)}
    defaultChecked
  >
    Has tickets
  </ChipWithToggle>
)
