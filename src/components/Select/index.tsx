import React, {
  ReactNode,
  useRef,
  useCallback,
  useState,
  useEffect,
  SyntheticEvent,
  KeyboardEvent,
  FC,
} from 'react'
import styled from '@emotion/styled'
import computeScrollIntoView from 'compute-scroll-into-view'
import { color, space, lineHeight, radius, fontSize } from '../../theme'
import {
  Input,
  SelectMenu,
  InputMenuList,
  InputMenuItem,
  InputProps,
  Label,
  LabelText,
  Adornment,
  Help,
} from '../Input'
import { VisuallyHidden } from '../VisuallyHidden'
import { ArrowDown } from '../../icons'
import { useOnClickOutside, useKeyPress, useDeviceInfo } from '../../hooks'
import { debounce } from '../../utils/debounce'

const Container = styled.div`
  position: relative;

  .adornment {
    pointer-events: none;
  }
`

Container.defaultProps = { className: 'select' }

export enum SelectItemType {
  select = 'select',
  action = 'action',
}

type SelectItem = {
  value: string
  name: string
  displayName?: string
  leftAdornment?: ReactNode
  rightAdornment?: ReactNode
  type?: SelectItemType
  onClick?: Function
}

export interface SelectProps extends Omit<InputProps, 'onChange'> {
  onChange?: (event: SelectItem) => void
  id: string
  label: string
  floatingMenu?: boolean
  leftAdornment?: ReactNode
  items: SelectItem[]
  initialSelectedItem?: SelectItem
  selectedItem?: SelectItem
}

interface StyledSelectProps {
  leftAdornment?: ReactNode
}

const StyledInput = styled(Input)`
  color: transparent;
  text-shadow: 0 0 0 ${color.space};
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`
const LeftAdornment = styled.span`
  margin-right: ${space[8]};
`

const RightAdornment = styled.span`
  position: absolute;
  right: ${space[16]};
`

const SelectContainer = styled.div`
  position: relative;
`

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const StyledSelect = styled.select<StyledSelectProps>`
  font-family: inherit;
  background-color: ${color.stardust};
  border-radius: ${radius.md};
  width: 100%;
  font-size: ${fontSize[18]};
  line-height: ${lineHeight.solid};
  height: ${space[56]};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${props => (props.leftAdornment ? space[48] : space[16])};
  padding-right: ${space[16]};
  color: ${color.space};
  box-shadow: none;
  border: 0;
  text-align: left;
  appearance: none;
  -webkit-font-smoothing: auto;

  &:focus,
  &.focus {
    outline: none;
  }
`

export const Select: FC<SelectProps> = ({
  items,
  onChange = () => {},
  id,
  label,
  leftAdornment,
  floatingMenu,
  initialSelectedItem,
  ...props
}) => {
  const { isMobile } = useDeviceInfo()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(
    initialSelectedItem || items[0]
  )
  const [highlightedIndex, setHighlightedIndex] = useState(
    items.indexOf(initialSelectedItem || items[0])
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const mobileSelectRef = useRef<HTMLSelectElement>(null)
  let itemRefs: HTMLLIElement[] = []
  const labelId = `${id}-label`
  const menuId = `${id}-menu`
  const esc = useKeyPress('Escape')
  const arrowUp = useKeyPress('ArrowUp')
  const arrowDown = useKeyPress('ArrowDown')
  const typeAheadTimeout = 1000
  const resetQuery = debounce(() => setQuery(''), typeAheadTimeout)

  useOnClickOutside(containerRef, () => setIsOpen(false))

  const handleClose = useCallback(() => {
    if (!isOpen) return false
    setIsOpen(false)

    if (inputRef.current) {
      inputRef.current.blur()
    }
    return
  }, [isOpen, setIsOpen, inputRef])

  function setItemRef(el: HTMLLIElement) {
    return (itemRefs = [...itemRefs, el])
  }

  useEffect(() => {
    // Select is controlled
    if (typeof props.selectedItem !== 'undefined')
      setSelectedItem(props.selectedItem)
  }, [props.selectedItem])

  useEffect(() => {
    if (esc) handleClose()
  }, [esc, handleClose])

  function scrollIntoView(
    node: Element | null,
    menuNode: HTMLUListElement | null
  ) {
    if (node === null) return false
    const actions = computeScrollIntoView(node, {
      boundary: menuNode,
      block: 'nearest',
      scrollMode: 'if-needed',
    })
    actions.forEach(({ el, top, left }) => {
      el.scrollTop = top
      el.scrollLeft = left
    })

    return
  }

  useEffect(() => {
    return () => resetQuery.cancel()
  })

  const scrollHighlightedItemIntoView = useCallback(() => {
    const node = itemRefs[highlightedIndex] || null
    scrollIntoView(node, menuRef.current)
  }, [highlightedIndex, itemRefs])

  useEffect(() => {
    if (arrowUp || arrowDown) {
      scrollHighlightedItemIntoView()
    }
  }, [arrowUp, arrowDown, scrollHighlightedItemIntoView])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return false

    const inputIsALetter = /^[a-z\d]$/i.test(e.key)
    const inputIsArrowUp = e.key === 'ArrowUp'
    const inputIsArrowDown = e.key === 'ArrowDown'
    const inputIsSpaceOrEnter = e.key === 'Space' || e.code === 'Enter'

    if (inputIsALetter) {
      resetQuery()

      let input = query + e.key
      setQuery(prevQuery => prevQuery + e.key)

      const index = items.findIndex(item =>
        item.name.toLowerCase().startsWith(input.toLowerCase())
      )

      scrollHighlightedItemIntoView()
      return setHighlightedIndex(index === -1 ? highlightedIndex : index)
    }

    if (inputIsArrowUp) {
      return setHighlightedIndex(prev =>
        prev === 0 ? items.length - 1 : prev - 1
      )
    }
    if (inputIsArrowDown) {
      return setHighlightedIndex(prev =>
        prev !== items.length - 1 ? prev + 1 : 0
      )
    }

    if (inputIsSpaceOrEnter) {
      const item = items[highlightedIndex]

      if (item.type === SelectItemType.action && item.onClick) {
        item.onClick()
        return handleClose()
      }

      setQuery('')
      onChange(items[highlightedIndex])
      setSelectedItem(items[highlightedIndex])
      handleClose()
    }
  }

  const menu = isOpen && (
    <SelectMenu tabIndex={-1} role="listbox" aria-labelledby={labelId}>
      <InputMenuList id={menuId} ref={menuRef}>
        {items.map((item, index) => (
          <InputMenuItem
            id={`${id}-item-${item.value}`}
            key={item.value}
            role="option"
            ref={setItemRef}
            selected={selectedItem.value === item.value}
            highlighted={highlightedIndex === index}
            onMouseMove={() => setHighlightedIndex(index)}
            onMouseDown={() => {
              if (item.type === SelectItemType.action && item.onClick) {
                return item.onClick()
              }

              onChange(item)
              setSelectedItem(item)
              handleClose()
            }}
            aria-selected={selectedItem === item ? 'true' : 'false'}
            data-highlighted={highlightedIndex}
          >
            {item.leftAdornment && (
              <LeftAdornment>{item.leftAdornment}</LeftAdornment>
            )}
            {item.name}

            {item.rightAdornment && (
              <RightAdornment>{item.rightAdornment}</RightAdornment>
            )}
          </InputMenuItem>
        ))}
      </InputMenuList>
    </SelectMenu>
  )

  if (isMobile()) {
    return (
      <Container ref={containerRef}>
        <SelectContainer {...props}>
          {props.hideLabel ? (
            <VisuallyHidden>
              <LabelText>{label}</LabelText>
            </VisuallyHidden>
          ) : (
            <Label htmlFor={id}>
              <LabelText>{label}</LabelText>
            </Label>
          )}

          <SelectWrapper>
            {leftAdornment ? <Adornment left>{leftAdornment}</Adornment> : null}

            <StyledSelect
              ref={mobileSelectRef}
              leftAdornment={leftAdornment}
              defaultValue={items
                .map(item => item.value)
                .indexOf(selectedItem.value)}
              id={id}
              onChange={(e: SyntheticEvent) => {
                const selected = items
                  .map(item => item.value)
                  .indexOf(selectedItem.value)
                const item =
                  items[parseInt((e.target as HTMLInputElement).value)]

                if (item.type === SelectItemType.action && item.onClick) {
                  if (mobileSelectRef.current) {
                    mobileSelectRef.current.selectedIndex = selected
                  }

                  return item.onClick()
                }

                setSelectedItem(item)
                onChange(item)
              }}
            >
              {items.map((item, index) => (
                <option key={item.value} value={index}>
                  {item.name}
                </option>
              ))}
            </StyledSelect>

            <Adornment right>
              <ArrowDown size={16} />
            </Adornment>
          </SelectWrapper>

          {props.help && <Help>{props.help}</Help>}
        </SelectContainer>
      </Container>
    )
  }

  return (
    <Container ref={containerRef}>
      <StyledInput
        {...props}
        id={id}
        ref={inputRef}
        label={label}
        value={selectedItem.displayName || selectedItem.name}
        // @ts-ignore readOnly is not in the types
        readOnly
        labelProps={{ id: labelId, htmlFor: id }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        rightAdornment={<ArrowDown size={16} />}
        leftAdornment={leftAdornment}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        aria-controls={menuId}
        aria-activedescendant={`${id}-item-${selectedItem.value}`}
        menu={!floatingMenu && menu}
      />

      {floatingMenu && menu}
    </Container>
  )
}
