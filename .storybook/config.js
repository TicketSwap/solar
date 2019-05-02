import React from 'react'
import { Global } from '@emotion/core'
import { globalStyles } from '../src/global-styles'
import { configure, addDecorator } from '@storybook/react'

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => (
  <div>
    <Global styles={globalStyles} />
    {story()}
  </div>
))

configure(loadStories, module)
