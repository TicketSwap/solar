import React from 'react'
import { storiesOf } from '@storybook/react'
import { HorizontalScroll } from './'
import { Button } from '../Button'

storiesOf('HorizontalScroll', module).add('basic', () => (
  <HorizontalScroll>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
    <Button rounded>Button</Button>
  </HorizontalScroll>
))
