import React from 'react'
import { BaseStyles } from '../src/components/BaseStyles'
import Theme from '../src/components/Theme'

export const parameters = {
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
  options: {
    storySort: {
      order: [
        'Guidelines',
        ['Getting started', 'Brand', 'Colors', 'Logo'],
        'Components',
      ],
    },
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
