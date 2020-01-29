import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { Input, InputMenu, InputMenuList, InputMenuItem } from '../Input'
import { MagnifyingGlass } from '@ticketswap/comets'

export const SelectWithSearch = ({
  items,
  onChange,
  initialValue,
  ...props
}) => (
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
            leftAdornment: selectedItem?.adornment ? (
              selectedItem.adornment
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
                        (item &&
                          item.name &&
                          item.name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase()))
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
                          adornment: item.adornment,
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

SelectWithSearch.defaultProps = {
  initialValue: '',
  onChange: () => null,
}

SelectWithSearch.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      adornment: PropTypes.func,
    })
  ).isRequired,
  initialValue: PropTypes.string,
}
