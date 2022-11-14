import React, {
  InputHTMLAttributes,
  OptionHTMLAttributes,
  useState,
  useId,
} from 'react'
import styled from '@emotion/styled'
import { ChevronDown } from '../../icons'
import { Chip, ChipProps } from './Chip'

const SelectContent = styled.select`
  position: absolute;
  opacity: 0;
  inset: 0;
  cursor: pointer;
`

type RequiredChipProps = Omit<ChipProps, 'active' | 'endAdornment'>

interface ChipWithSelectProps
  extends RequiredChipProps,
    InputHTMLAttributes<HTMLSelectElement> {
  options: OptionHTMLAttributes<HTMLOptionElement>[]
}

export const ChipWithSelect = ({
  startAdornment,
  options,
  value: externalValue,
  onChange,
  compact,
  ...props
}: ChipWithSelectProps) => {
  const id = useId()
  const [internalValue, setInternalValue] = useState(
    props.defaultValue || options[0].value
  )
  const value =
    typeof externalValue !== 'undefined' ? externalValue : internalValue
  const currentOption = options.find(
    option => option.value === value
  ) as OptionHTMLAttributes<HTMLOptionElement>

  return (
    <Chip
      compact={compact}
      active={Boolean(value)}
      startAdornment={startAdornment}
      endAdornment={<ChevronDown size={16} />}
      as="label"
    >
      <SelectContent
        value={value}
        onChange={event => {
          setInternalValue(event.target.value)
          onChange?.(event)
        }}
        {...props}
      >
        {options.map((option, index) => (
          <option
            key={
              option.id ??
              `${id}-${option.value?.toString().replace(/[^a-z0-9]/gi, '-')}` ??
              index
            }
            {...option}
          >
            {option.label || option.value}
          </option>
        ))}
      </SelectContent>
      {currentOption.label || currentOption.value}
    </Chip>
  )
}
