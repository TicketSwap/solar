import React from 'react'
import { BaseStyles } from '../src/components/BaseStyles'

export const decorators = [
  Story => (
    <div>
      <BaseStyles />
      <Story />
    </div>
  ),
]

export const parameters = {
  passArgsFirst: false,
}
