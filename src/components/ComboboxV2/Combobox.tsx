import React, {
  InputHTMLAttributes,
  OptionHTMLAttributes,
  ReactNode,
  useRef,
  useState,
  ChangeEvent,
  FocusEvent,
} from 'react'
import { Listbox } from '../SelectV2/Listbox'
import { CloseRounded, MagnifyingGlass } from '../../icons'
import styled from '@emotion/styled'
import { color, space } from '../../theme'
import { normalizeChars } from '../../utils'
import scrollIntoView from 'scroll-into-view-if-needed'
import { Input } from '../InputV2'
import { Label } from '..'

const Container = styled.fieldset`
  display: grid;
  gap: ${space[4]};
`

const Wrapper = styled.div`
  position: relative;
`

const ClearButton = styled.button`
  line-height: 1;
  border-radius: 50%;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`

export interface OptionProps
  extends Omit<
    OptionHTMLAttributes<HTMLOptionElement>,
    'label' | 'value' | 'id'
  > {
  startAdornment?: ReactNode
  label: string
  value: string
  id: string
}

interface ComboboxWithRequiredLabel
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'id'> {
  id: string
  options: OptionProps[]
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
  label: string
  'aria-label'?: string
}

interface ComboboxWithAriaLabel
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'id'> {
  id: string
  options: OptionProps[]
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
  label?: string
  'aria-label': string
}

export type ComboboxProps = ComboboxWithAriaLabel | ComboboxWithRequiredLabel

export const Combobox = ({
  id,
  options,
  value: controlledValue,
  onChange,
  onBlur,
  defaultValue,
  label,
  'aria-label': ariaLabel,
  ...props
}: ComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '')
  const value =
    typeof controlledValue !== 'undefined' ? controlledValue : uncontrolledValue
  const containerRef = useRef<HTMLFieldSetElement>(null)
  const listboxRef = useRef<HTMLDivElement>(null)
  const clearButtonRef = useRef<HTMLButtonElement>(null)

  const currentOption = options.find(
    option => option.value === value
  ) as OptionProps

  const [query, setQuery] = useState(currentOption?.label || '')
  const [focussed, setFocussed] = useState(-1)

  const currentValue = open ? query : currentOption?.label

  const filteredOptions = !value
    ? options
    : options.filter(option =>
        normalizeChars(option.label.toLowerCase()).includes(
          normalizeChars(query.toLowerCase())
        )
      )

  return (
    <Container ref={containerRef}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Wrapper>
        <Input
          aria-label={(ariaLabel || label) as string}
          type="text"
          id={id}
          role="combobox"
          autoComplete="off"
          onChange={event => {
            setQuery(event.target.value)
            setFocussed(0)
          }}
          onBlur={event => {
            const listbox = listboxRef.current as HTMLDivElement
            const clearButton = clearButtonRef.current as HTMLButtonElement
            const container = containerRef.current as HTMLFieldSetElement

            onBlur?.(event)

            setTimeout(() => {
              if (document.activeElement === clearButton) {
                return container.querySelector('input')?.focus()
              }

              if (document.activeElement !== listbox) {
                setQuery(currentOption?.label || '')
                setOpen(false)
              }
            }, 10)
          }}
          onFocus={() => {
            setOpen(true)
          }}
          onKeyDown={event => {
            const listbox = listboxRef.current as HTMLDivElement

            if (event.key === 'ArrowDown') {
              event.preventDefault()

              setFocussed(0)

              scrollIntoView(listbox.children[0], {
                boundary: listbox,
                scrollMode: 'always',
                block: 'nearest',
              })

              listboxRef.current?.focus()
            }

            if (focussed !== null && event.key === 'Enter') {
              const activeOption = listbox.querySelector(
                '[data-focussed=true]'
              ) as HTMLDivElement

              if (activeOption) {
                const { value, label } = options.find(
                  option => option.value === activeOption.dataset.value
                ) as OptionProps

                setUncontrolledValue(value)
                onChange?.(
                  event as unknown as ChangeEvent<HTMLInputElement>,
                  value
                )
                setQuery(label)

                event.stopPropagation()
              }
            }
          }}
          value={currentValue}
          startAdornment={<MagnifyingGlass size={24} />}
          endAdornment={
            query &&
            open && (
              <ClearButton
                ref={clearButtonRef}
                tabIndex={-1}
                onClick={() => {
                  setQuery('')
                }}
              >
                <CloseRounded size={24} color={color.foregroundSubtle} />
              </ClearButton>
            )
          }
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls="popup_listbox"
          aria-activedescendant={String(focussed)}
          {...props}
        />
        <Listbox
          ref={listboxRef}
          options={filteredOptions}
          variant="default"
          focussed={focussed}
          open={open}
          selected={value}
          aria-label="Listbox"
          onBlur={event => {
            setOpen(false)
            onBlur?.(event as FocusEvent<HTMLInputElement>)
          }}
          onHover={index => setFocussed(index)}
          onKeyDown={event => {
            const listbox = listboxRef.current as HTMLDivElement

            const container = containerRef.current as HTMLFieldSetElement

            if (/^[a-z\d]$/i.test(event.key)) {
              event.stopPropagation()

              return container.querySelector('input')?.focus()
            }

            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setFocussed(focussed => {
                const f =
                  focussed === filteredOptions.length - 1
                    ? focussed
                    : focussed + 1

                scrollIntoView(listbox.children[f], {
                  boundary: listbox,
                  scrollMode: 'always',
                  block: 'nearest',
                })

                return f
              })
            }

            if (event.key === 'ArrowUp') {
              event.preventDefault()
              setFocussed(focussed => {
                const f = Math.max(0, focussed - 1)

                scrollIntoView(listbox.children[f], {
                  boundary: listbox,
                  scrollMode: 'always',
                  block: 'nearest',
                })

                return f
              })
            }

            if (event.key === 'Enter') {
              let target = event.target as HTMLDivElement

              if (target.getAttribute('role') !== 'option') {
                target = document.getElementById(
                  target.getAttribute('aria-activedescendant') as string
                ) as HTMLDivElement
              }

              const { value, label } = options.find(
                option => option.value === target.dataset.value
              ) as OptionProps

              setUncontrolledValue(value)
              onChange?.(
                event as unknown as ChangeEvent<HTMLInputElement>,
                value
              )
              setQuery(label)

              container.querySelector('input')?.focus()
              event.stopPropagation()
            }
          }}
          onClick={event => {
            let target = event.target as HTMLDivElement

            if (target.getAttribute('role') !== 'option') {
              target = document.getElementById(
                target.getAttribute('aria-activedescendant') as string
              ) as HTMLDivElement
            }

            const { value, label } = options.find(
              option => option.value === target.dataset.value
            ) as OptionProps
            setUncontrolledValue(value)
            onChange?.(event as unknown as ChangeEvent<HTMLInputElement>, value)
            setQuery(label)
            setOpen(false)
            event.stopPropagation()
          }}
        />
      </Wrapper>
    </Container>
  )
}
