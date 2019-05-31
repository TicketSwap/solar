import React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox } from './'

storiesOf('Checkbox', module)
  .add('basic', () => (
    <Checkbox
      id="remember-me"
      label="Remember me"
      onChange={on => console.log(on)}
    />
  ))
  .add('default on', () => (
    <Checkbox
      id="remember-me"
      label="Remember me"
      onChange={on => console.log(on)}
      defaultOn
    />
  ))
  .add('without label', () => (
    <Checkbox
      id="remember-me"
      label="Remember me"
      onChange={on => console.log(on)}
      hideLabel
    />
  ))
