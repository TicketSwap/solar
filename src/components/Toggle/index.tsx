import React from 'react'
import { VisuallyHidden } from '../VisuallyHidden'
import { Switch } from './Switch'

export interface ToggleProps {
  defaultOn?: boolean
  on?: boolean
  onToggle?: (checked: boolean) => void
  loading?: boolean
  adornment?: React.ReactNode
}

export const Toggle: React.FC<ToggleProps> = ({
  loading,
  adornment,
  defaultOn = false,
  onToggle = () => null,
  ...props
}) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null)
  const [on, setOn] = React.useState(defaultOn)

  const toggle = (e: React.MouseEvent) => {
    setOn(!on)
    // Simulate a click on the DOM element to fire its `onChange` handler.
    if (checkboxRef.current) {
      checkboxRef.current.click()
    }
    e.stopPropagation()
  }
  const isOnControlled = () => typeof props.on !== 'undefined'
  const getOn = () => (isOnControlled() ? props.on : on)

  return (
    <div className="toggle">
      <VisuallyHidden>
        <input
          ref={checkboxRef}
          type="checkbox"
          defaultChecked={getOn()}
          onClick={e => e.stopPropagation()}
          onChange={e => onToggle(e.target.checked)}
        />
      </VisuallyHidden>
      <Switch
        on={on}
        aria-label="Toggle"
        role="switch"
        aria-checked={getOn()}
        tabIndex="0"
        {...props}
        onClick={(event: React.MouseEvent) => toggle(event)}
      />
    </div>
  )
}
