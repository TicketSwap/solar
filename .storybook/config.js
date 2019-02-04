import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { globalStyles } from '../src/global-styles'
import { configure, addDecorator } from '@storybook/react'

const req = require.context('../src/components', true, /\.stories\.js$/)
const GlobalStyles = createGlobalStyle`
  ${globalStyles};
`

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => (
  <div>
    <GlobalStyles />
    {story()}
  </div>
))

configure(loadStories, module)
