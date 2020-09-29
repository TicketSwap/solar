import React from 'react'
import { MenuButton } from '.'
import { CustomDropdownPostion } from '../CustomDropdown'

const items = [
  { name: 'English', value: 'en' },
  { name: 'Nederlands', value: 'nl' },
  { name: 'German', value: 'de' },
]

export default {
  title: 'MenuButton',
}

export const Basic = () => (
  <div style={{ padding: '2rem' }}>
    <span>
      Language:{' '}
      <MenuButton
        items={items}
        initialSelectedItem={items[0]}
        onChange={item => console.log(item)}
      />
    </span>
  </div>
)

export const Top = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
      padding: '2rem',
      height: '100vh',
    }}
  >
    <span>
      Language:{' '}
      <MenuButton
        items={items}
        dropdownPosition={CustomDropdownPostion.top}
        onChange={item => console.log(item)}
        initialSelectedItem={items[1]}
      />
    </span>
  </div>
)
