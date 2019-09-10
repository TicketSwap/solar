import React from 'react'
import { BaseStyles } from '../src/components/BaseStyles'
import { configure, addDecorator } from '@storybook/react'

const req = require.context('../src/components', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => (
  <div>
    <BaseStyles />
    {story()}
  </div>
))

configure(loadStories, module)
