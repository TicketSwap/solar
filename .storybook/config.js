import React from 'react'
import { BaseStyles } from '../src/components/BaseStyles'
import { configure, addDecorator, addParameters } from '@storybook/react'

const req = require.context('../src/components', true, /\.stories\.(tsx|js)$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

// Styles
addDecorator(story => (
  <div>
    <BaseStyles />
    {story()}
  </div>
))

configure(loadStories, module)
