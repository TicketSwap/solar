import React from 'react'
import { BaseStyles } from '../src/components/BaseStyles'
import Theme from '../src/components/Theme'

export const decorators = [
  Story => (
    <Theme>
      <BaseStyles />
      <Story />
    </Theme>
  ),
]

export const parameters = {
  passArgsFirst: false,
}
