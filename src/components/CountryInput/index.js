import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { Input, InputMenu, InputMenuList, InputMenuItem } from '../Input'
import { Flag } from '../Flag'
import { MagnifyingGlass } from '@ticketswap/comets'

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
      <div>
        <Input
          {...getInputProps({
            onChange: clearSelection,
            onReset: clearSelection,
            onFocus: !selectedItem ? openMenu : null,
            leftAdornment: selectedItem ? (
              <Flag countryCode={selectedItem.value} />
            ) : (
              <MagnifyingGlass size={24} />
            ),
            menu: isOpen && (
              <InputMenu {...getMenuProps()}>
                <InputMenuList>
                  {items
                    .filter(
                      item =>
                        !inputValue ||
                        item.name
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <InputMenuItem
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
                      </InputMenuItem>
                    ))}
                </InputMenuList>
              </InputMenu>
            ),
            ...props,
          })}
        />
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
