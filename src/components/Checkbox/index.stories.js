import React from 'react'
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

export default {
  title: 'Checkbox',
}

export const Basic = () => (
  <Checkbox
    id="remember-me"
    name="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
  />
)

export const WithHelperText = () => (
  <Checkbox
    id="remember-me"
    name="remember-me"
    label="Regular"
    help="Including 5 drink tokens"
    onChange={e => console.log(e.target)}
  />
)

WithHelperText.story = {
  name: 'With helper text',
}

export const WithLongLabel = () => (
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
)

WithLongLabel.story = {
  name: 'With long label',
}

export const DefaultOn = () => (
  <Checkbox
    id="remember-me"
    name="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
    defaultOn
  />
)

DefaultOn.story = {
  name: 'Default on',
}

export const WithoutLabel = () => (
  <Checkbox
    id="remember-me"
    name="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
    hideLabel
  />
)

WithoutLabel.story = {
  name: 'Without label',
}

export const Controlled = () => <ControlledCheckbox />
