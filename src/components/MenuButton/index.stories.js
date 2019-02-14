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
    <div
      css={`
        padding: 2rem;
      `}
    >
      <span>
        Language:{' '}
        <MenuButton
          items={items}
          itemKey={'name'}
          downShiftProps={{
            itemToString: item => (item ? item.name : ''),
            onChange: item => console.log(item),
            initialSelectedItem: items[0],
          }}
        />
      </span>
    </div>
  ))
  .add('top', () => (
    <div
      css={`
        display: flex;
        align-items: flex-end;
        padding: 2rem;
        height: 100vh;
      `}
    >
      <span>
        Language:{' '}
        <MenuButton
          items={items}
          itemKey={'name'}
          dropdownPosition="top"
          onSelect={index => console.log(items[index].value)}
          downShiftProps={{
            itemToString: item => (item ? item.name : ''),
            initialSelectedItem: items[0],
          }}
        />
      </span>
    </div>
  ))
