import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Transition, animated, config } from 'react-spring'
import styled from '@emotion/styled'
import { CustomDropdown, CustomDropdownItem as Item } from '../CustomDropdown'
import { color } from '../../theme'
import { useKeyPress, useOnClickOutside, usePrevious } from '../../hooks'

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

      <Transition
        native
        items={isOpen}
        from={{
          position: 'absolute',
          zIndex: 2,
          left: '50%',
          bottom: 0,
          transform: `translate3d(-50%,${
            dropdownPosition === 'top' ? -1 : 1
          }rem,0)`,
          opacity: 0,
        }}
        enter={{
          transform: 'translate3d(-50%,0rem,0)',
          opacity: 1,
        }}
        leave={{
          transform: 'translate3d(-50%,0rem,0)',
          opacity: 0,
        }}
        config={{
          ...config.default,
          velocity: 10,
        }}
      >
        {show =>
          show &&
          (styles => (
            <animated.div style={styles} ref={ref}>
              <Menu>
                <CustomDropdown
                  withArrow
                  position={dropdownPosition}
                  distance={4}
                >
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
            </animated.div>
          ))
        }
      </Transition>
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
}
