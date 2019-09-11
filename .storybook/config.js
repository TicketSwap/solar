import React from 'react'
import { BaseStyles } from '../src/components/BaseStyles'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks'

const req = require.context('../src/components', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

//@storybook/addon-docs
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
})

// Styles
addDecorator(story => (
  <div>
    <BaseStyles />
    {story()}
  </div>
))

configure(loadStories, module)
