import React from 'react'
import { BaseStyles } from '../src/components/BaseStyles'
import { configure, addDecorator } from '@storybook/react'

addDecorator(story => (
  <div>
    <BaseStyles />
    {story()}
  </div>
))

configure(require.context('../src/components', true, /\.stories\.js$/), module)
