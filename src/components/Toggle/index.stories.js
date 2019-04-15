import React from 'react'
import { storiesOf } from '@storybook/react'
import { Toggle } from './'

function ControlledToggle() {
  const [show, setShow] = React.useState(false)

  return (
    <>
      <input type="checkbox" onChange={() => setShow(!show)} />
      <Toggle on={show} />
    </>
  )
}

storiesOf('Toggle', module)
  .add('basic', () => <Toggle onToggle={on => console.log(on)} />)
  .add('default on', () => (
    <Toggle onToggle={on => console.log(on)} defaultOn />
  ))
  .add('on-controlled', () => <ControlledToggle />)
