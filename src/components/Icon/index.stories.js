import React from 'react'
import { storiesOf } from '@storybook/react'
import { Icon } from './'

storiesOf('Icon', module)
  .add('16x16', () => <Icon glyph="location" size={16} />)
  .add('32x32', () => <Icon glyph="location" />)
  .add('64x64', () => <Icon glyph="location" size={64} />)
