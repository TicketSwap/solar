import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import computeScrollIntoView from 'compute-scroll-into-view'
import { color, space, lineHeight, radius, fontSize } from '../../theme'
import {
  Input,
  InputMenu,
  InputMenuList,
  InputMenuItem,
  InputProps,
  Label,
  LabelText,
  Adornment,
  Help,
} from '../Input'
import { VisuallyHidden } from '../VisuallyHidden'
import { ArrowDown } from '@ticketswap/comets'
import { useOnClickOutside, useKeyPress, useDeviceInfo } from '../../hooks'

const Container = styled.div`
  position: relative;

  .adornment {
    pointer-events: none;
  }
`

Container.defaultProps = { className: 'select' }

type SelectItem = {
  value: string
  name: string
  displayName?: string
  leftAdornment?: ReactNode
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
  margin-right: 10px;
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

export const Select: React.FC<SelectProps> = ({
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
  const [showCustomSelect, setShowCustomSelect] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(
    initialSelectedItem || items[0]
  )
  const [highlightedIndex, setHighlightedIndex] = React.useState(
    items.indexOf(initialSelectedItem || items[0])
  )
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const menuRef = React.useRef<HTMLUListElement>(null)
  let itemRefs: HTMLLIElement[] = []
  const labelId = `${id}-label`
  const menuId = `${id}-menu`
  const esc = useKeyPress('Escape')
  const arrowUp = useKeyPress('ArrowUp')
  const arrowDown = useKeyPress('ArrowDown')

  useOnClickOutside(containerRef, () => setIsOpen(false))

  const handleClose = React.useCallback(() => {
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

  React.useEffect(() => {
    if (!isMobile()) {
      // Component will render a native select element by default.
      // Upon mounting, we check whether we’re on a mobile device. If
      // not, render the custom select.
      setShowCustomSelect(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    // Select is controlled
    if (typeof props.selectedItem !== 'undefined')
      setSelectedItem(props.selectedItem)
  }, [props.selectedItem])

  React.useEffect(() => {
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

  const scrollHighlightedItemIntoView = React.useCallback(() => {
    const node = itemRefs[highlightedIndex] || null
    scrollIntoView(node, menuRef.current)
  }, [highlightedIndex, itemRefs])

  React.useEffect(() => {
    if (arrowUp || arrowDown) {
      scrollHighlightedItemIntoView()
    }
  }, [arrowUp, arrowDown, scrollHighlightedItemIntoView])

  const menu = isOpen && (
    <InputMenu tabIndex={-1} role="listbox" aria-labelledby={labelId}>
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
              onChange(item)
              setSelectedItem(item)
              handleClose()
            }}
            aria-selected={selectedItem === item ? 'true' : 'false'}
          >
            {item.leftAdornment && (
              <LeftAdornment>{item.leftAdornment}</LeftAdornment>
            )}
            {item.name}
          </InputMenuItem>
        ))}
      </InputMenuList>
    </InputMenu>
  )

  return (
    <Container ref={containerRef}>
      {!showCustomSelect && (
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
              leftAdornment={leftAdornment}
              defaultValue={items
                .map(item => item.value)
                .indexOf(selectedItem.value)}
              id={id}
              onChange={(e: React.SyntheticEvent) => {
                setSelectedItem(
                  items[parseInt((e.target as HTMLInputElement).value)]
                )
                onChange(items[parseInt((e.target as HTMLInputElement).value)])
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
      )}

      {showCustomSelect && (
        <>
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
            onKeyDown={e => {
              if (!isOpen) return false
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                return setHighlightedIndex(prev =>
                  prev === 0 ? items.length - 1 : prev - 1
                )
              }
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                return setHighlightedIndex(prev =>
                  prev !== items.length - 1 ? prev + 1 : 0
                )
              }
              // Select with Enter or Space keys
              if (e.key === 'Enter' || e.keyCode === 32) {
                onChange(items[highlightedIndex])
                setSelectedItem(items[highlightedIndex])
                handleClose()
              }
            }}
            aria-haspopup="listbox"
            aria-labelledby={labelId}
            aria-controls={menuId}
            aria-activedescendant={`${id}-item-${selectedItem.value}`}
            menu={!floatingMenu && menu}
          />

          {floatingMenu && menu}
        </>
      )}
    </Container>
  )
}
