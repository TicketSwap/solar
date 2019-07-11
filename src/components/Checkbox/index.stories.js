import React from 'react'
import { storiesOf } from '@storybook/react'
import { Checkbox } from './'

function ControlledCheckbox() {
  const [on, setOn] = React.useState(false)

  return (
    <>
      <input type="checkbox" onChange={e => setOn(e.target.checked)} />
      <Checkbox
        id="remember-me"
        name="remember-me"
        label="I am controlled"
        on={on}
      />
    </>
  )
}

storiesOf('Checkbox', module)
  .add('basic', () => (
    <Checkbox
      id="remember-me"
      name="remember-me"
      label="Remember me"
      onChange={e => console.log(e.target)}
    />
  ))
  .add('with long label', () => (
    <Checkbox
      id="agree"
      name="agree"
      label={
        <p>
          I understand I will be paid out <strong>after</strong> the event has
          taken place.
        </p>
      }
      onChange={e => console.log(e.target)}
    />
  ))
  .add('default on', () => (
    <Checkbox
      id="remember-me"
      name="remember-me"
      label="Remember me"
      onChange={e => console.log(e.target)}
      defaultOn
    />
  ))
  .add('without label', () => (
    <Checkbox
      id="remember-me"
      name="remember-me"
      label="Remember me"
      onChange={e => console.log(e.target)}
      hideLabel
    />
  ))
  .add('controlled', () => <ControlledCheckbox />)
