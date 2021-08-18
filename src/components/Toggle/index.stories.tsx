import React from 'react'
import { Toggle } from '.'
import { Alert } from '@ticketswap/comets'

function ControlledToggle() {
  const [on, setOn] = React.useState(false)

  return (
    <>
      <input type="checkbox" onChange={e => setOn(e.target.checked)} />
      <Toggle on={on} onToggle={on => console.log(on)} />
    </>
  )
}

function ControlledToggleWithDelay() {
  const [on, setOn] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setOn(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Toggle on={on} onToggle={on => setOn(on)} />
    </>
  )
}

function ControlledWithoutDelay() {
  const [on, setOn] = React.useState(false)

  return (
    <>
      <Toggle on={on} onToggle={on => setOn(on)} />
    </>
  )
}

export default {
  title: 'Toggle',
}

export const Basic = () => <Toggle onToggle={on => console.log(on)} />
export const WithAdornment = () => (
  <Toggle adornment={<Alert size={16} />} onToggle={on => console.log(on)} />
)

WithAdornment.storyName = 'With adornment'

export const WithAdornmentLoading = () => (
  <Toggle
    adornment={<Alert size={16} />}
    loading={true}
    onToggle={on => console.log(on)}
  />
)

WithAdornmentLoading.storyName = 'With adornment loading'

export const DefaultOn = () => (
  <Toggle onToggle={on => console.log(on)} defaultOn />
)

DefaultOn.storyName = 'Default on'

export const Controlled = () => <ControlledToggle />
export const ControlledWithTimeout = () => <ControlledToggleWithDelay />
export const ControlledWithoutTimeout = () => <ControlledWithoutDelay />
