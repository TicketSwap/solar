import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '../Input'

export function TimeInput({ onChange, onReset, initialValue, ...props }) {
  const [time, setTime] = React.useState(initialValue)
  const lastVal = React.useRef('')

  function isValid(val) {
    const regexp = /^\d{0,2}?:?\d{0,2}$/
    const [hoursStr, minutesStr] = val.split(':')

    if (!regexp.test(val)) {
      return false
    }

    const hours = Number(hoursStr)
    const minutes = Number(minutesStr)
    const isValidHour = hour => Number.isInteger(hour) && hour >= 0 && hour < 24
    const isValidMinutes = minutes =>
      (Number.isInteger(minutes) && hours >= 0 && hours < 24) ||
      Number.isNaN(minutes)

    if (!isValidHour(hours) || !isValidMinutes(minutes)) {
      return false
    }

    if (minutes < 10 && Number(minutesStr[0]) > 5) {
      return false
    }

    const valArr = val.indexOf(':') !== -1 ? val.split(':') : [val]

    if (
      valArr[0] &&
      valArr[0].length &&
      (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)
    ) {
      return false
    }

    if (
      valArr[1] &&
      valArr[1].length &&
      (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)
    ) {
      return false
    }

    return true
  }

  function handleChange(e) {
    let val = e.target.value

    if (val === time) {
      return false
    }

    if (isValid(val)) {
      if (
        val.length === 2 &&
        lastVal.current.length !== 3 &&
        val.indexOf(':') === -1
      ) {
        val = val + ':'
      }

      if (val.length === 2 && lastVal.current.length === 3) {
        val = val.slice(0, 1)
      }

      if (val.length > 5) {
        return false
      }

      lastVal.current = val
      setTime(val)

      if (val.length === 5) {
        onChange(val)
      }
    }
  }

  return (
    <Input
      {...props}
      value={time}
      onChange={handleChange}
      onReset={() => (onReset ? onReset() : setTime(''))}
    />
  )
}

TimeInput.defaultProps = {
  initialValue: '',
}

TimeInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  loading: PropTypes.bool,
  labelProps: PropTypes.object,
  leftAdornment: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  menu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  initialValue: PropTypes.string,
}
