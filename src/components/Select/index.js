import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import computeScrollIntoView from 'compute-scroll-into-view'
import {
  color,
  space,
  shadow,
  fontWeight,
  radius,
  transition,
} from '../../theme'
import { Input, Adornment } from '../Input'
import { Icon } from '../Icon'
import { useOnClickOutside, useKeyPress } from '../../hooks'

const Container = styled.div`
  position: relative;
`

const StyledInput = styled(Input)`
  color: transparent;
  text-shadow: 0 0 0 ${color.space};
  cursor: pointer;
`

export const MenuContainer = styled.div`
  text-align: left;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: calc(100% + ${space[4]});
  border-radius: ${radius.md};
  background-color: white;
  box-shadow: ${shadow.strong};
  overflow: hidden;
`

export const Menu = styled.div`
  max-height: ${space[256]};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

const ItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  z-index: 1;
  padding-left: ${props => (props.adornment ? space[48] : space[16])};
  padding-right: ${space[16]};
  height: ${props => (props.as === 'textarea' ? 'auto' : space[56])};
  background-color: ${props => (props.highlighted ? color.stardust : 'white')};
  font-weight: ${props =>
    props.selected ? fontWeight.semiBold : fontWeight.regular};
  color: ${props => (props.selected ? color.earth : props.space)};
  cursor: pointer;
  transition: color ${transition};

  & + & {
    border-top: 1px solid ${color.spaceLightest};
  }
`

export const Item = React.forwardRef(({ children, ...props }, ref) => (
  <ItemContainer {...props} ref={ref}>
    <Adornment left>{props.adornment}</Adornment>
    {children}
  </ItemContainer>
))

export function Select({
  items,
  onChange,
  initialSelectedItem,
  id,
  label,
  ...props
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(
    initialSelectedItem || items[0]
  )
  const [highlightedIndex, setHighlightedIndex] = React.useState(
    items.indexOf(initialSelectedItem)
  )
  const containerRef = React.useRef()
  const inputRef = React.useRef()
  const menuRef = React.useRef()
  let itemRefs = []
  const labelId = `${id}-label`
  const menuId = `${id}-menu`
  const esc = useKeyPress('Escape')
  const arrowUp = useKeyPress('ArrowUp')
  const arrowDown = useKeyPress('ArrowDown')

  useOnClickOutside(containerRef, () => setIsOpen(false))

  function handleClose() {
    if (!isOpen) return false
    setIsOpen(false)
    inputRef.current.blur()
  }

  function setItemRef(el) {
    return (itemRefs = [...itemRefs, el])
  }

  React.useEffect(() => {
    if (esc) handleClose()
  }, [esc])

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

  function scrollHighlightedItemIntoView() {
    const node = itemRefs[highlightedIndex] || null
    scrollIntoView(node, menuRef)
  }

  React.useEffect(() => {
    if (arrowUp || arrowDown) {
      scrollHighlightedItemIntoView()
    }
  }, [arrowUp, arrowDown])

  return (
    <Container ref={containerRef}>
      <StyledInput
        {...props}
        id={id}
        ref={inputRef}
        label={label}
        value={selectedItem.name}
        readOnly
        labelProps={{ id: labelId, htmlFor: id }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        rightAdornment={<Icon glyph="arrow-down-solid" size={24} />}
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
          if (e.key === 'Enter') {
            onChange(items[highlightedIndex])
            setSelectedItem(items[highlightedIndex])
            handleClose()
          }
        }}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        aria-controls={menuId}
        aria-activedescendant={`${id}-item-${selectedItem.value}`}
      />
      {isOpen && (
        <MenuContainer tabindex="-1" role="listbox" aria-labelledby={labelId}>
          <Menu id={menuId} ref={menuRef}>
            {items.map((item, index) => (
              <Item
                id={`${id}-item-${item.value}`}
                key={item.value}
                role="option"
                ref={setItemRef}
                selected={selectedItem === item}
                highlighted={highlightedIndex === index}
                onMouseMove={() => setHighlightedIndex(index)}
                onMouseDown={() => {
                  onChange(item)
                  setSelectedItem(item)
                  handleClose()
                }}
                aria-selected={selectedItem === item ? 'true' : 'false'}
              >
                {item.name}
              </Item>
            ))}
          </Menu>
        </MenuContainer>
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialSelectedItem: PropTypes.object,
}
