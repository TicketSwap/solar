import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import {
  CustomDropdown,
  CustomDropdownItem as Item,
  CustomDropdownPostion,
} from '../CustomDropdown'
import { color } from '../../theme'
import {
  useKeyPress,
  useOnClickOutside,
  usePrevious,
  useTransition,
} from '../../hooks'
import { TransitionState } from '../../hooks/useTransition'

interface MenuButtonItemPropType {
  name: string
  value: string
}

export interface MenuButtonProps {
  dropdownPosition?: CustomDropdownPostion
  items: MenuButtonItemPropType[]
  onChange: (selectedItem: MenuButtonItemPropType) => void
  initialSelectedItem: MenuButtonItemPropType
}

const duration = 200

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`

interface StyledButton {
  clickThrough?: boolean
}

const Button = styled.button<StyledButton>`
  font-size: inherit;
  color: ${color.spaceLight};
  outline: 0;
  pointer-events: ${props => (props.clickThrough ? 'none' : 'false')};

  &:focus {
    box-shadow: none;
  }
`

interface StyledMenuContainer {
  transitionState:
    | TransitionState.ENTERED
    | TransitionState.ENTERING
    | TransitionState.EXITED
    | TransitionState.EXITING
    | boolean // @TODO: Why is `state` boolean | TransitionState?
  dropdownPosition?: CustomDropdownPostion
}

const MenuContainer = styled.div<StyledMenuContainer>`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 0;
  opacity: ${props =>
    props.transitionState === 'entering' || props.transitionState === 'entered'
      ? 1
      : 0};
  transform: ${props =>
    props.transitionState === 'entering' ||
    props.transitionState === 'entered' ||
    props.transitionState === 'exiting'
      ? 'translate3d(-50%,0,0)'
      : `translate3d(-50%,${props.dropdownPosition === 'top' ? -1 : 1}rem,0)`};
  transition: opacity ${duration}ms ease-out, transform ${duration}ms ease-out;
`

const Menu = styled.div`
  display: inline-block;
`

export const MenuButton: React.FC<MenuButtonProps> = ({
  items,
  dropdownPosition,
  onChange,
  initialSelectedItem,
  ...props
}) => {
  const [selectedItem, setSelectedItem] = useState(
    initialSelectedItem || items[0] // @TODO: Remove this after TS migration
  )
  const previousItem = usePrevious(selectedItem)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
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
      Boolean(onChange) && onChange(selectedItem)
    }
  }, [selectedItem, previousItem, initialSelectedItem, onChange])

  return (
    <Wrapper {...props}>
      <Button onClick={() => setIsOpen(true)} clickThrough={isOpen}>
        {selectedItem.name} <span aria-hidden>▾</span>
      </Button>

      {mounted && (
        <MenuContainer
          transitionState={state}
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
