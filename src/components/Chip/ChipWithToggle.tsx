import React, { useState, InputHTMLAttributes } from 'react'
import { Chip, ChipProps } from './Chip'
import { VisuallyHidden } from '../VisuallyHidden'

type RequiredChipProps = Omit<ChipProps, 'active'>

export interface ChipWithToggleProps
  extends RequiredChipProps,
    InputHTMLAttributes<HTMLInputElement> {}

export const ChipWithToggle = ({
  startAdornment,
  endAdornment,
  children,
  checked: externalChecked,
  defaultChecked,
  onChange,
  compact,
  ...props
}: ChipWithToggleProps) => {
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked || false
  )
  const value =
    typeof externalChecked !== 'undefined' ? externalChecked : internalChecked

  return (
    <Chip
      as="label"
      compact={compact}
      active={value}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
    >
      <span>
        <VisuallyHidden>
          <input
            type="checkbox"
            checked={value}
            onChange={event => {
              setInternalChecked(previousChecked => !previousChecked)
              onChange?.(event)
            }}
            {...props}
          />
        </VisuallyHidden>
        {children}
      </span>
    </Chip>
  )
}
