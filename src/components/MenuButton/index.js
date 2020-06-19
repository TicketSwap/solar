import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { CustomDropdown, CustomDropdownItem as Item } from '../CustomDropdown'
import { color } from '../../theme'
import {
  useKeyPress,
  useOnClickOutside,
  usePrevious,
  useTransition,
} from '../../hooks'

const duration = 200

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`

const Button = styled.button`
  font-size: inherit;
  color: ${color.spaceLight};
  outline: 0;
  pointer-events: ${props => (props.clickThrough ? 'none' : 'false')};

  &:focus {
    box-shadow: none;
  }
`

const MenuContainer = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 0;
  opacity: ${props =>
    props.state === 'entering' || props.state === 'entered' ? 1 : 0};
  transform: ${props =>
    props.state === 'entering' ||
    props.state === 'entered' ||
    props.state === 'exiting'
      ? 'translate3d(-50%,0,0)'
      : `translate3d(-50%,${props.dropdownPosition === 'top' ? -1 : 1}rem,0)`};
  transition: opacity ${duration}ms ease-out, transform ${duration}ms ease-out;
`

const Menu = styled.div`
  display: inline-block;
`

export function MenuButton({
  items,
  dropdownPosition,
  onChange,
  initialSelectedItem,
  ...props
}) {
  const [selectedItem, setSelectedItem] = useState(
    initialSelectedItem || items[0]
  )
  const previousItem = usePrevious(selectedItem)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()
  useOnClickOutside(ref, () => setIsOpen(false))
  const esc = useKeyPress('Escape')
  const [state, mounted] = useTransition({ in: isOpen, timeout: duration })

  useEffect(() => {
    // Close menu with Esc key
    if (isOpen && esc) setIsOpen(false)
  }, [isOpen, esc])

  useEffect(() => {
    if (
      previousItem &&
      previousItem !== selectedItem &&
      selectedItem !== initialSelectedItem
    ) {
      onChange && onChange(selectedItem)
    }
  }, [selectedItem, previousItem, initialSelectedItem, onChange])

  return (
    <Wrapper {...props}>
      <Button onClick={() => setIsOpen(true)} clickThrough={isOpen}>
        {selectedItem.name} <span aria-hidden>▾</span>
      </Button>

      {mounted && (
        <MenuContainer
          state={state}
          ref={ref}
          dropdownPosition={dropdownPosition}
        >
          <Menu>
            <CustomDropdown withArrow position={dropdownPosition} distance={4}>
              {items.map(item => (
                <Item
                  key={item.value}
                  active={selectedItem && selectedItem.value === item.value}
                  onClick={() => {
                    setSelectedItem(item)
                    setIsOpen(false)
                  }}
                >
                  {item.name}
                </Item>
              ))}
            </CustomDropdown>
          </Menu>
        </MenuContainer>
      )}
    </Wrapper>
  )
}

MenuButton.propTypes = {
  dropdownPosition: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
  initialSelectedItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
}
