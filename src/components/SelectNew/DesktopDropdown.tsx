import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { SyntheticEvent, useEffect, useId, useRef, useState } from 'react'
import { color, fontWeight, radius, shadow, space } from '../../theme'
import { debounce } from '../../utils/debounce'
import { OptionProps, SelectVariant } from './Select'

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  display: none;

  @media (hover: hover) {
    display: block;
  }
`

interface ListboxProps {
  $open: boolean
}

const Listbox = styled.div<ListboxProps>`
  border-radius: ${radius.md};
  overflow: auto;
  opacity: 0;
  position: absolute;
  inset-inline-start: 0;
  min-width: 100%;
  inset-block-start: 56px;
  pointer-events: none;
  box-shadow: ${shadow.strong};
  z-index: 1;
  max-height: ${space[256]};

  &:focus {
    outline: none;
  }

  ${props =>
    props.$open &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`

interface ListBoxOptionProps {
  $hasStartAdornment: boolean
}

const ListboxOption = styled.div<ListBoxOptionProps>`
  cursor: default;
  padding-block: 16px;
  padding-inline: ${space[16]};
  background-color: ${color.background};
  border-block-start: 1px solid ${color.stroke};
  white-space: nowrap;
  align-items: center;

  &:first-of-type {
    border-block-start: 0;
  }

  &[data-focussed='true'] {
    background-color: ${color.actionBackground};
  }

  &[aria-selected='true'] {
    color: ${color.action};
    font-weight: ${fontWeight.semiBold};
  }

  ${props =>
    props.$hasStartAdornment &&
    css`
      display: grid;
      grid-template-columns: auto 1fr;
      gap: ${space[8]};
    `}
`

interface DesktopDropdownProps {
  options: OptionProps[]
  value?: string
  onChange?: (event: SyntheticEvent, value: string) => void
  variant: SelectVariant
}

export const DesktopDropdown = ({ options, value, onChange, variant }: DesktopDropdownProps) => {
  const id = useId()
  const listboxRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [focussed, setFocussed] = useState(
    Math.max(
      0,
      options.findIndex(option => option.value === value)
    )
  )
  const [query, setQuery] = useState('')
  const resetQuery = debounce(() => setQuery(''), 1000)

  console.log(query)

  const onClickWrapper = () => {
    const listbox = listboxRef.current as HTMLDivElement
    const windowHeight = window.innerHeight
    const listBoxY = listbox.getBoundingClientRect().y
    const listBoxHeight = listbox.getBoundingClientRect().height

    const availableBelow = windowHeight - listBoxY
    const availableTop = listBoxY

    if (availableBelow < listBoxHeight) {
      if (availableTop > listBoxHeight) {
        listbox.style.insetBlockStart = 'auto'
        listbox.style.insetBlockEnd = '0'
      } else {
        listbox.style.insetBlockStart = '0'
        listbox.style.height = `${availableBelow + 40}px`
      }
    } else {
      listbox.style.insetBlockStart = ''
      listbox.style.insetBlockEnd = ''
      listbox.style.height = ''
    }

    setOpen(true)
    listbox.focus()
  }

  return (
    <Wrapper onClick={onClickWrapper}>
      <Listbox
        ref={listboxRef}
        role="listbox"
        tabIndex={0}
        aria-labelledby="listbox1label"
        aria-activedescendant="listbox1-1"
        $open={open}
        onBlur={() => setOpen(false)}
        onClick={event => {
          const target = event.target as HTMLDivElement
          const { value } = options.find(option => option.value === target.dataset.value)
          onChange?.(event, value)
          setOpen(false)
          event.stopPropagation()
        }}
        onKeyDown={event => {
          if (!open) {
            if ([' ', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
              setOpen(true)
            }

            return
          }

          const inputIsALetter = /^[a-z\d]$/i.test(event.key)

          if (inputIsALetter) {
            setQuery(prevQuery => prevQuery + event.key)
            resetQuery()
            event.preventDefault()

            const index = options.findIndex(({ label }) =>
              label.toLowerCase().startsWith(query + event.key)
            )

            if (index !== -1) setFocussed(index)
            return
          }

          switch (event.key) {
            case 'Home':
              setFocussed(0)
              break
            case 'End':
              setFocussed(options.length - 1)
              break
            case 'ArrowUp':
              setFocussed(focussed => Math.max(0, focussed - 1))
              break
            case 'ArrowDown':
              setFocussed(focussed => Math.min(options.length - 1, focussed + 1))
              break
            case 'Escape':
              setOpen(false)
              break
            case ' ':
            case 'Enter':
              onChange?.(event, options[focussed].value as string)
              setOpen(false)
              break
          }
        }}
      >
        {options.map((option, index) => (
          <ListboxOption
            key={index}
            role="option"
            id={option.id ?? `${id}-${index}`}
            aria-selected={option.value === value}
            data-focussed={index === focussed}
            data-value={option.value}
            onMouseEnter={() => setFocussed(index)}
            $hasStartAdornment={Boolean(option.startAdornment)}
          >
            {variant !== 'short' && option.startAdornment} {option.label}
          </ListboxOption>
        ))}
      </Listbox>
    </Wrapper>
  )
}
