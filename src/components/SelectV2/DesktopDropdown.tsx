import styled from '@emotion/styled'
import React, { SyntheticEvent, useRef, useState } from 'react'
import { debounce } from '../../utils/debounce'
import { OptionProps, SelectVariant } from './Select'
import { Listbox } from './Listbox'
import scrollIntoView from 'scroll-into-view-if-needed'

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  display: none;
  user-select: none;

  @media (hover: hover) {
    display: block;
  }
`

export type ValueProp = string | number | readonly string[]

interface DesktopDropdownProps {
  'aria-label': string
  options: OptionProps[]
  value?: ValueProp
  onChange?: (event: SyntheticEvent, value?: ValueProp) => void
  onFocus: (event: SyntheticEvent) => void
  onBlur: (event: SyntheticEvent) => void
  variant: SelectVariant
  id?: string
}

export const DesktopDropdown = ({
  'aria-label': ariaLabel,
  options,
  value,
  onChange,
  onBlur,
  onFocus,
  variant,
  id,
}: DesktopDropdownProps) => {
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

    const currentFocussed = Math.max(
      0,
      options.findIndex(option => option.value === value)
    )

    setFocussed(currentFocussed)
    setOpen(true)
    listbox.focus()

    scrollIntoView(listbox.children[currentFocussed], {
      boundary: listbox,
      scrollMode: 'always',
      block: 'nearest',
    })
  }

  return (
    <Wrapper onClick={onClickWrapper} id={`wrapper-${id}`}>
      <Listbox
        ref={listboxRef}
        options={options}
        selected={value}
        focussed={focussed}
        aria-label={ariaLabel}
        open={open}
        onBlur={event => {
          setOpen(false)
          onBlur?.(event)
        }}
        onFocus={event => {
          onFocus?.(event)
        }}
        onHover={index => setFocussed(index)}
        onKeyDown={event => {
          event.stopPropagation()
          const listbox = listboxRef.current as HTMLDivElement

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
              label?.toLowerCase().startsWith(query + event.key)
            )

            if (index !== -1) {
              listbox.children[index].scrollIntoView()
              setFocussed(index)
            }

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
              setFocussed(focussed =>
                Math.min(options.length - 1, focussed + 1)
              )
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
        onClick={event => {
          let target = event.target as HTMLDivElement

          if (target.getAttribute('role') !== 'option') {
            target = document.getElementById(
              target.getAttribute('aria-activedescendant') as string
            ) as HTMLDivElement
          }

          const { value } = options.find(
            option => option.value === target.dataset.value
          ) as OptionProps
          onChange?.(event, value)
          setOpen(false)
          event.stopPropagation()
        }}
        variant={variant}
      />
    </Wrapper>
  )
}
