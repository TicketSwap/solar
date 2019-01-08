import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from '../Box'
import { MenuButton } from '../MenuButton'

const items = [
  { name: 'English', value: 'en' },
  { name: 'Nederlands', value: 'nl' },
  { name: 'German', value: 'de' },
]

storiesOf('MenuButton', module)
  .add('default', () => (
    <Box padding={32}>
      <span>
        Language:{' '}
        <MenuButton
          items={items}
          itemKey={'name'}
          onSelect={index => console.log(items[index].value)}
          downShiftProps={{
            itemToString: item => (item ? item.name : ''),
            initialSelectedItem: items[0],
          }}
        />
      </span>
    </Box>
  ))
  .add('top', () => (
    <Box display="flex" alignItems="flex-end" padding={32} height="100vh">
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
    </Box>
  ))
