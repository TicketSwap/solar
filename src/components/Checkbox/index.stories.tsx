import React from 'react'
import { Checkbox } from './'

function ControlledCheckbox() {
  const [on, setOn] = React.useState(false)

  return (
    <>
      <input type="checkbox" onChange={e => setOn(e.target.checked)} />
      <Checkbox id="remember-me" label="I am controlled" on={on} />
    </>
  )
}

export const Basic = () => (
  <Checkbox
    id="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
  />
)

export const WithHelperText = () => (
  <Checkbox
    id="remember-me"
    label="Regular"
    help="Including 5 drink tokens"
    onChange={e => console.log(e.target)}
  />
)

WithHelperText.storyName = 'With helper text'

export const WithLongLabel = () => (
  <Checkbox
    id="agree"
    label={
      <p>
        I understand I will be paid out <strong>after</strong> the event has
        taken place.
      </p>
    }
    onChange={e => console.log(e.target)}
  />
)

WithLongLabel.storyName = 'With long label'

export const DefaultOn = () => (
  <Checkbox
    id="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
    defaultOn
  />
)

DefaultOn.storyName = 'Default on'

export const Disabled = () => (
  <Checkbox
    id="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
    defaultOn
    disabled
  />
)

Disabled.storyName = 'Disabled'

export const WithoutLabel = () => (
  <Checkbox
    id="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
    hideLabel
  />
)

WithoutLabel.storyName = 'Without label'

export const Controlled = () => <ControlledCheckbox />

export default {
  title: 'Components/Inputs/Checkbox',
}
