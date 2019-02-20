import React from 'react'
import PropTypes from 'prop-types'
import { Transition, animated, config } from 'react-spring/renderprops'
import Downshift from 'downshift'
import styled from 'styled-components'
import { CustomDropdown, Item } from '../CustomDropdown'
import { color } from '../../theme'

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`

const Label = styled.label`
  position: relative;
`

const Button = styled.button`
  font-size: inherit;
  color: ${color.spaceLight};
  outline: 0;
`

const Menu = styled.div`
  display: inline-block;
`

export const MenuButton = ({
  downShiftProps,
  dropdownPosition,
  itemKey,
  items,
  ...props
}) => (
  <Downshift {...downShiftProps}>
    {({
      getRootProps,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      getItemProps,
      isOpen,
      selectedItem,
    }) => (
      <Wrapper {...getRootProps({ refKey: 'ref', role: null })} {...props}>
        <Label {...getLabelProps()}>
          <Button {...getToggleButtonProps()}>
            {selectedItem[itemKey]} <span aria-hidden>▾</span>
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
              (props => (
                <animated.div style={props}>
                  <Menu {...getMenuProps()}>
                    <CustomDropdown
                      withArrow
                      position={dropdownPosition}
                      distance={4}
                    >
                      {items.map((item, index) => (
                        <Item
                          {...getItemProps({
                            key: item[itemKey],
                            index,
                            item,
                            highlighted:
                              highlightedIndex === index ? 'true' : undefined,
                            active: selectedItem === item,
                          })}
                        >
                          {item[itemKey]}
                        </Item>
                      ))}
                    </CustomDropdown>
                  </Menu>
                </animated.div>
              ))
            }
          </Transition>
        </Label>
      </Wrapper>
    )}
  </Downshift>
)

MenuButton.propTypes = {
  downShiftProps: PropTypes.object,
  dropdownPosition: PropTypes.string,
  itemKey: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}
