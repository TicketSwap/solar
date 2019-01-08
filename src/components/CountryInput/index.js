import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Downshift from 'downshift'
import { Input, Adornment } from '../Input'
import { color, space, shadow, fontWeight } from '../../theme'
import { Flag } from '../Flag'
import { Icon } from '../Icon'

const MenuContainer = styled.div`
  text-align: left;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: calc(100% + ${space[4]});
  border-radius: ${space[4]};
  background-color: white;
  box-shadow: ${shadow.strong};
  overflow: hidden;
`

const Menu = styled.div`
  max-height: ${space[256]};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

const ItemContainer = styled.div`
  position: relative;
  z-index: 1;
  padding-left: ${props => (props.adornment ? space[48] : space[16])};
  padding-right: ${space[16]};
  padding-top: ${space[8]};
  padding-bottom: ${space[8]};
  background-color: ${props => (props.highlighted ? color.stardust : 'white')};
  font-weight: ${props =>
    props.selected ? fontWeight.semiBold : fontWeight.regular};
  cursor: pointer;
`

const Item = ({ children, ...props }) => (
  <ItemContainer {...props}>
    <Adornment left>{props.adornment}</Adornment>
    {children}
  </ItemContainer>
)

export const CountryInput = ({ items, onChange, initialValue, ...props }) => (
  <Downshift
    onChange={selection => selection && onChange(selection)}
    itemToString={item => (item ? item.name : '')}
    initialSelectedItem={
      items.filter(item => initialValue.indexOf(item.value) > -1)[0]
    }
  >
    {({
      getInputProps,
      getItemProps,
      getMenuProps,
      isOpen,
      openMenu,
      inputValue,
      clearSelection,
      highlightedIndex,
      selectedItem,
    }) => (
      <div style={{ position: 'relative' }}>
        <Input
          {...getInputProps({
            onChange: clearSelection,
            onReset: clearSelection,
            onFocus: !selectedItem ? openMenu : null,
            leftAdornment: selectedItem ? (
              <Flag countryCode={selectedItem.value} />
            ) : (
              <Icon glyph="loupe-solid" size={24} />
            ),
            ...props,
          })}
        />
        {isOpen && (
          <MenuContainer>
            <Menu {...getMenuProps()}>
              {items
                .filter(
                  item =>
                    !inputValue ||
                    item.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <Item
                    {...getItemProps({
                      key: item.name,
                      index,
                      item,
                      highlighted:
                        highlightedIndex === index ? 'true' : undefined,
                      selected: selectedItem === item ? 'true' : undefined,
                      adornment: <Flag countryCode={item.value} />,
                    })}
                  >
                    {item.name}
                  </Item>
                ))}
            </Menu>
          </MenuContainer>
        )}
      </div>
    )}
  </Downshift>
)

CountryInput.defaultProps = {
  initialValue: '',
  onChange: () => {},
}

CountryInput.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialValue: PropTypes.string,
}
