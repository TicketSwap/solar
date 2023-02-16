import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  OptionHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from 'react'
import { ArrowDown } from '../../icons'
import { color, fontSize, radius, shadow, space } from '../../theme'
import { DesktopDropdown } from './DesktopDropdown'

interface AdornmentProps {
  $start?: boolean
}

const Adornment = styled.span<AdornmentProps>`
  display: grid;
  place-items: center;
  pointer-events: none;
  ${props =>
    Boolean(props.$start)
      ? 'grid-area: 1 / 1 / 1 / 2'
      : 'grid-area: 1 / -2 / 1 / -1'}
`

interface ContainerProps {
  hasStartAdornment: boolean
}

const Container = styled.span<ContainerProps>`
  display: grid;
  grid-template-columns: 1fr ${space[48]};
  position: relative;

  ${props =>
    props.hasStartAdornment &&
    css`
      grid-template-columns: ${space[48]} 1fr ${space[48]};
    `};
`

interface StyledSelectProps {
  variant: SelectVariant
}

const StyledSelect = styled.select<StyledSelectProps>`
  grid-area: 1 / 1 / 1 / 4;
  color: transparent;
  appearance: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  @media (hover: hover) {
    display: none;
    pointer-events: none;
  }

  ${props =>
    props.variant.startsWith('short') &&
    css`
      position: absolute;
      inset: 0;
    `}
`

interface DisplayValueProps {
  disabled?: boolean
  hasStartAdornment: boolean
  rounded: boolean
}

const DisplayValue = styled.span<DisplayValueProps>`
  grid-area: 1 / 1 / 1 / 4;
  font-size: ${fontSize[18]};
  line-height: ${space[56]};
  height: ${space[56]};
  padding-inline: ${space[16]} ${space[48]};
  color: ${color.foreground};
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  justify-content: start;
  gap: ${space[8]};
  border-radius: ${props => (props.rounded ? space[32] : radius.md)};
  background-color: ${color.elevatedBackground};
  pointer-events: none;

  ${props =>
    props.hasStartAdornment &&
    css`
      padding-inline-start: ${space[48]};
    `}

  ${Container}:focus-within & {
    box-shadow: ${shadow.strong};
    background-color: ${color.background};
  }

  ${props =>
    props.disabled &&
    css`
      background-color: ${color.inactiveBackground};
      cursor: not-allowed;
      pointer-events: auto;
    `}
`

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  startAdornment?: ReactNode
  shortLabel?: string
}

export type SelectVariant = 'default' | 'short' | 'long' | 'shortvalue'

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: OptionProps[]
  'aria-label': string
  startAdornment?: ReactNode
  rounded?: boolean
  variant?: SelectVariant
}

export const Select = ({
  options,
  startAdornment = null,
  rounded = false,
  variant = 'default',
  onChange,
  'aria-label': ariaLabel,
  value: externalValue,
  defaultValue,
  ...props
}: SelectProps) => {
  const selectboxRef = useRef<HTMLSelectElement>(null)
  const [internalValue, setInternalValue] = useState(
    defaultValue || options[0].value
  )
  const value =
    typeof externalValue !== 'undefined' ? externalValue : internalValue

  const currentOption =
    options.find(option => option.value === value) || ({} as OptionProps)

  return (
    <Container hasStartAdornment={Boolean(startAdornment)}>
      {!props.disabled && (
        <DesktopDropdown
          aria-label={ariaLabel}
          options={options}
          id={props.id}
          value={value}
          onChange={(event, newValue) => {
            const selectbox = selectboxRef.current as HTMLSelectElement
            selectbox.value = newValue as string
            setInternalValue(newValue)
            onChange?.({
              ...event,
              target: selectbox,
            } as ChangeEvent<HTMLSelectElement>)
          }}
          onBlur={event => {
            props.onBlur?.({
              ...event,
              target: selectboxRef.current,
            } as FocusEvent<HTMLSelectElement>)
          }}
          onFocus={event => {
            props.onFocus?.({
              ...event,
              target: selectboxRef.current,
            } as FocusEvent<HTMLSelectElement>)
          }}
          variant={variant}
        />
      )}
      <StyledSelect
        ref={selectboxRef}
        variant={variant}
        onChange={event => {
          setInternalValue(event.target.value)
          onChange?.(event)
        }}
        value={value}
        {...props}
      >
        {options.map(({ startAdornment, ...option }, index) => (
          <option key={index} {...option}>
            {option.label || option.value}
          </option>
        ))}
      </StyledSelect>

      <DisplayValue
        hasStartAdornment={Boolean(startAdornment)}
        rounded={rounded}
        disabled={props.disabled}
      >
        {variant !== 'default' && currentOption.startAdornment}{' '}
        {!variant.startsWith('short') &&
          (currentOption.label || currentOption.value)}
        {variant === 'shortvalue' &&
          (currentOption.shortLabel || currentOption.value)}
      </DisplayValue>
      {startAdornment && <Adornment $start>{startAdornment}</Adornment>}
      <Adornment>
        <ArrowDown size={16} />
      </Adornment>
    </Container>
  )
}
