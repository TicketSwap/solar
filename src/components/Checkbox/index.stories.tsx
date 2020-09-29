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

const Basic = () => (
  <Checkbox
    id="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
  />
)

const WithHelperText = () => (
  <Checkbox
    id="remember-me"
    label="Regular"
    help="Including 5 drink tokens"
    onChange={e => console.log(e.target)}
  />
)

WithHelperText.storyName = 'With helper text'

const WithLongLabel = () => (
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

const DefaultOn = () => (
  <Checkbox
    id="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
    defaultOn
  />
)

DefaultOn.storyName = 'Default on'

const Disabled = () => (
  <Checkbox
    id="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
    defaultOn
    disabled
  />
)

Disabled.storyName = 'Disabled'

const WithoutLabel = () => (
  <Checkbox
    id="remember-me"
    label="Remember me"
    onChange={e => console.log(e.target)}
    hideLabel
  />
)

WithoutLabel.storyName = 'Without label'

const Controlled = () => <ControlledCheckbox />

export {
  Basic,
  WithHelperText,
  WithLongLabel,
  DefaultOn,
  Disabled,
  WithoutLabel,
  Controlled,
}

export default {
  title: 'Checkbox',
}
