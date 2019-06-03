import React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox } from './'

storiesOf('Checkbox', module)
  .add('basic', () => (
    <Checkbox
      id="remember-me"
      name="remember-me"
      label="Remember me"
      onChange={e => console.log(e.target.checked)}
    />
  ))
  .add('default on', () => (
    <Checkbox
      id="remember-me"
      name="remember-me"
      label="Remember me"
      onChange={e => console.log(e.target.checked)}
      defaultOn
    />
  ))
  .add('without label', () => (
    <Checkbox
      id="remember-me"
      name="remember-me"
      label="Remember me"
      onChange={e => console.log(e.target.checked)}
      hideLabel
    />
  ))
