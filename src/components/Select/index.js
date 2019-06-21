import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import computeScrollIntoView from 'compute-scroll-into-view'
import { color } from '../../theme'
import { Input, InputMenu, InputMenuList, InputMenuItem } from '../Input'
import { ArrowDown } from '@ticketswap/comets'
import { useOnClickOutside, useKeyPress, useDeviceInfo } from '../../hooks'

const Container = styled.div`
  position: relative;

  .adornment {
    pointer-events: none;
  }
`

Container.defaultProps = { className: 'select' }

const StyledInput = styled(Input)`
  color: transparent;
  text-shadow: 0 0 0 ${color.space};
  cursor: pointer;
`
const LeftAdornment = styled.span`
  margin-right: 10px;
`

export function Select({
  items,
  onChange,
  id,
  label,
  leftAdornment,
  floatingMenu,
  ...props
}) {
  const { isMobile } = useDeviceInfo()
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(
    props.initialSelectedItem || items[0]
  )
  const [highlightedIndex, setHighlightedIndex] = React.useState(
    items.indexOf(props.initialSelectedItem)
  )
  const containerRef = React.useRef()
  const inputRef = React.useRef()
  const menuRef = React.useRef()
  let itemRefs = []
  const labelId = `${id}-label`
  const menuId = `${id}-menu`
  const isControlled = typeof props.selectedItem !== 'undefined'
  const esc = useKeyPress('Escape')
  const arrowUp = useKeyPress('ArrowUp')
  const arrowDown = useKeyPress('ArrowDown')

  useOnClickOutside(containerRef, () => setIsOpen(false))

  const handleClose = React.useCallback(() => {
    if (!isOpen) return false
    setIsOpen(false)
    inputRef.current.blur()
  }, [isOpen, setIsOpen, inputRef])

  function setItemRef(el) {
    return (itemRefs = [...itemRefs, el])
  }

  React.useEffect(() => {
    if (isControlled) setSelectedItem(props.selectedItem)
  }, [isControlled, props.selectedItem])

  React.useEffect(() => {
    if (esc) handleClose()
  }, [esc, handleClose])

  function scrollIntoView(node, menuNode) {
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
  }

  const scrollHighlightedItemIntoView = React.useCallback(() => {
    const node = itemRefs[highlightedIndex] || null
    scrollIntoView(node, menuRef)
  }, [highlightedIndex, itemRefs])

  React.useEffect(() => {
    if (arrowUp || arrowDown) {
      scrollHighlightedItemIntoView()
    }
  }, [arrowUp, arrowDown, scrollHighlightedItemIntoView])

  const menu = isOpen && (
    <InputMenu tabindex="-1" role="listbox" aria-labelledby={labelId}>
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
      {isMobile() && (
        <Input
          {...props}
          as="select"
          id={id}
          label={label}
          value={highlightedIndex}
          rightAdornment={<ArrowDown size={16} />}
          onChange={e => {
            setSelectedItem(items[e.target.value])
            setHighlightedIndex(e.target.value)
            onChange(items[e.target.value])
          }}
        >
          {items.map((item, index) => (
            <option key={item.value} value={index}>
              {item.name}
            </option>
          ))}
        </Input>
      )}

      {!isMobile() && (
        <>
          <StyledInput
            {...props}
            id={id}
            ref={inputRef}
            label={label}
            value={selectedItem.displayName || selectedItem.name}
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
                setHighlightedIndex(prev =>
                  prev === 0 ? items.length - 1 : prev - 1
                )
              }
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setHighlightedIndex(prev =>
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

Select.defaultProps = {
  onChange: () => {},
}

Select.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  floatingMenu: PropTypes.bool,
  leftAdornment: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      displayName: PropTypes.string,
    })
  ).isRequired,
  initialSelectedItem: PropTypes.object,
  selectedItem: PropTypes.object,
}
