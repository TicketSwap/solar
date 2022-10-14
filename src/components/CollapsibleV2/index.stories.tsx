import React, { useState } from 'react'
import { Collapsible as CollapsibleV2 } from './index'
import { Button } from '../Button'
import { Alert } from '../Alert'

export default {
  title: 'Components/Surfaces/Collapsible2',
}

export const Basic = () => {
  const [controlledOpen, setControlledOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setControlledOpen(prev => !prev)}>Click me</Button>
      <br />
      <br />
      <CollapsibleV2
        summary="My new details component"
        defaultOpen={true}
        onToggle={open => {
          setControlledOpen(open)
        }}
        open={controlledOpen}
      >
        <Alert
          title="Watch out for birds"
          variant="warning"
          action={{
            label: 'Click me',
            onClick: () => window.alert('My action got triggered'),
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis
          veniam cupiditate quis aliquid amet, neque quaerat quibusdam illum
          animi consectetur itaque.
        </Alert>
      </CollapsibleV2>
    </>
  )
}
