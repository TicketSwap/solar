import React from 'react'
import { storiesOf } from '@storybook/react'
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

storiesOf('Toggle', module)
  .add('basic', () => <Toggle onToggle={on => console.log(on)} />)
  .add('default on', () => (
    <Toggle onToggle={on => console.log(on)} defaultOn />
  ))
  .add('controlled', () => <ControlledToggle />)
