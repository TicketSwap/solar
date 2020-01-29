import React from 'react'
import { addDecorator } from '@storybook/react'
import { BaseStyles } from '../src/components/BaseStyles'

addDecorator(storyFn => (
  <div>
    <BaseStyles />
    {storyFn()}
  </div>
))
