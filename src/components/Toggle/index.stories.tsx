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

export default {
  title: 'Components/Inputs/Toggle',
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
