import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { Input } from '../Input'
import { ComboboxMenu, ComboboxList, ComboboxItem } from '../Combobox'
import { Flag } from '../Flag'
import { MagnifyingGlass } from '@ticketswap/comets'

export const CountrySelect = ({ items, onChange, initialValue, ...props }) => (
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
              <MagnifyingGlass size={24} />
            ),
            ...props,
          })}
        />
        {isOpen && (
          <ComboboxMenu {...getMenuProps()}>
            <ComboboxList>
              {items
                .filter(
                  item =>
                    !inputValue ||
                    item.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <ComboboxItem
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
                  </ComboboxItem>
                ))}
            </ComboboxList>
          </ComboboxMenu>
        )}
      </div>
    )}
  </Downshift>
)

CountrySelect.defaultProps = {
  initialValue: '',
  onChange: () => {},
}

CountrySelect.propTypes = {
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
