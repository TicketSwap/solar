import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { MenuButton } from '../src/components/MenuButton'

const items = [
  { name: 'English', value: 'en' },
  { name: 'Nederlands', value: 'nl' },
  { name: 'German', value: 'de' },
]
const handleChange = jest.fn()
const MyMenuButton = () => (
  <MenuButton
    items={items}
    itemKey={'name'}
    downShiftProps={{
      itemToString: item => (item ? item.name : ''),
      onChange: item => handleChange(item),
      initialSelectedItem: items[0],
    }}
  />
)

describe('MenuButton', () => {
  it('renders without crashing', () => {
    const { container } = render(<MyMenuButton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('handles selection correctly', () => {
    const { getByText, queryByText } = render(<MyMenuButton />)
    expect(queryByText(/nederlands/i)).toBeNull()
    fireEvent.click(getByText(/english/i))
    fireEvent.click(getByText(/nederlands/i))
    expect(getByText(/nederlands/i)).toBeInTheDocument()
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(items[1])
  })
})
