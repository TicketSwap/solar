import React from 'react'
import { storiesOf } from '@storybook/react'
import { MenuButton } from '../MenuButton'

const items = [
  { name: 'English', value: 'en' },
  { name: 'Nederlands', value: 'nl' },
  { name: 'German', value: 'de' },
]

storiesOf('MenuButton', module)
  .add('default', () => (
    <div style={{ padding: '2rem' }}>
      <span>
        Language:{' '}
        <MenuButton items={items} onChange={item => console.log(item)} />
      </span>
    </div>
  ))
  .add('top', () => (
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
          dropdownPosition="top"
          onChange={item => console.log(item)}
          initialSelectedItem={items[1]}
        />
      </span>
    </div>
  ))
