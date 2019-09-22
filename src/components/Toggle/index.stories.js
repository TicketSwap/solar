import React from 'react'
import { Toggle } from './'

function ControlledToggle() {
  const [on, setOn] = React.useState(false)

  return (
    <>
      <input type="checkbox" onChange={e => setOn(e.target.checked)} />
      <Toggle on={on} />
    </>
  )
}

export default {
  title: 'Toggle',
}

export const Basic = () => <Toggle onToggle={on => console.log(on)} />

export const DefaultOn = () => (
  <Toggle onToggle={on => console.log(on)} defaultOn />
)

DefaultOn.story = {
  name: 'Default on',
}

export const Controlled = () => <ControlledToggle />
