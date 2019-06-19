import React from 'react'
import { Input } from '../Input'
import { storiesOf } from '@storybook/react'
import { useCombobox, ComboboxMenu, ComboboxList, ComboboxItem } from './'

storiesOf('Combobox', module).add('basic', () => <CitySearch />)

function CitySearch() {
  const {
    getContainerProps,
    getInputProps,
    getMenuProps,
    getListProps,
    getItemProps,
  } = useCombobox({
    onSelect: selection => console.log(selection),
    itemKey: 'city',
  })
  const [searchTerm, setSearchTerm] = React.useState('')
  const cities = useCitySearch(searchTerm)
  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
  }

  return (
    <div {...getContainerProps()}>
      <Input
        {...getInputProps({
          label: 'Cities',
          onChange: handleSearchTermChange,
          help: 'Choose a city in the US',
          'aria-label': 'Cities',
          menu: cities.length > 0 && (
            <ComboboxMenu {...getMenuProps()}>
              <ComboboxList {...getListProps()}>
                {cities.map(city => {
                  const str = `${city.city}, ${city.state}`
                  return (
                    <ComboboxItem
                      {...getItemProps({
                        key: str,
                        value: JSON.stringify(city),
                      })}
                    >
                      {str}
                    </ComboboxItem>
                  )
                })}
              </ComboboxList>
            </ComboboxMenu>
          ),
        })}
      />
    </div>
  )
}

function useCitySearch(searchTerm) {
  const [cities, setCities] = React.useState([])

  React.useEffect(() => {
    if (searchTerm.trim() !== '') {
      let isFresh = true
      fetchCities(searchTerm).then(cities => {
        if (isFresh) setCities(cities)
      })
      return () => (isFresh = false)
    }
  }, [searchTerm])

  return cities
}

const cache = {}
function fetchCities(value) {
  if (cache[value]) {
    return Promise.resolve(cache[value])
  }
  return fetch('https://city-search.now.sh/?' + value)
    .then(res => res.json())
    .then(result => {
      cache[value] = result
      return result
    })
}
