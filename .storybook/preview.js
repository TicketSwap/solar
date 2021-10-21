import React from 'react'
import { BaseStyles } from '../src/components/BaseStyles'
import Theme from '../src/components/Theme'

export const parameters = {
  // layout: 'centered',
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#FFFFFF',
      },
      {
        name: 'dark',
        value: '#1A212A',
      },
    ],
  },
  passArgsFirst: false,
}

export const decorators = [
  (Story, context) => {
    const isDarkOn = context.globals?.backgrounds?.value === '#1A212A'

    return (
      <Theme darkOn={isDarkOn}>
        <BaseStyles />
        <Story />
      </Theme>
    )
  },
]
