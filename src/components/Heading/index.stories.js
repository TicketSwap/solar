import React from 'react'
import { storiesOf } from '@storybook/react'
import { H1, H2, H3, H4, H5, H6 } from './'

storiesOf('Heading', module)
  .add('heading 1', () => <H1>Heading 1</H1>)
  .add('heading 2', () => <H2>Heading 2</H2>)
  .add('heading 3', () => <H3>Heading 3</H3>)
  .add('heading 4', () => <H4>Heading 4</H4>)
  .add('heading 5', () => <H5>Heading 5</H5>)
  .add('heading 6', () => <H6>Heading 6</H6>)
