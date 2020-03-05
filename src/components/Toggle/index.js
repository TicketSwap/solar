import React from 'react'
import PropTypes from 'prop-types'
import { VisuallyHidden } from '../VisuallyHidden'
import { Switch } from './Switch'

export function Toggle(props) {
  const checkboxRef = React.useRef()
  const [on, setOn] = React.useState(props.defaultOn)
  const toggle = e => {
    setOn(!on)
    // Simulate a click on the DOM element to fire
    // its `onChange` handler.
    checkboxRef.current.click()
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
          onChange={e => props.onToggle(e.target.checked)}
        />
      </VisuallyHidden>
      <Switch
        on={on}
        aria-label="Toggle"
        role="switch"
        aria-checked={getOn()}
        tabIndex="0"
        {...props}
        onClick={e => toggle(e)}
      />
    </div>
  )
}

Toggle.propTypes = {
  defaultOn: PropTypes.bool,
  on: PropTypes.bool,
  onToggle: PropTypes.func,
}

Toggle.defaultProps = {
  defaultOn: false,
  onToggle: () => {},
}
