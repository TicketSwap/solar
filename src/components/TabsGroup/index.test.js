import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TabsGroup } from './'

const items = [
  { name: 'Front-end', contents: 'Lucas' },
  { name: 'Back-end', contents: 'Pim' },
  { name: 'Design', contents: 'Koen' },
]

const MyTabsGroup = props => (
  <TabsGroup {...props}>
    {({ activeIndex, select }) => (
      <div>
        {items.map((item, index) => (
          <button key={item.name} onClick={() => select(index)}>
            {item.name}
          </button>
        ))}

        {items.map(
          (item, index) =>
            index === activeIndex && (
              <div key={item.contents}>{item.contents}</div>
            )
        )}
      </div>
    )}
  </TabsGroup>
)

describe('TabsGroup', () => {
  it('renders without crashing', () => {
    const { container } = render(<MyTabsGroup />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders the first panel initially', () => {
    const { getByText } = render(<MyTabsGroup />)
    const panel = getByText(items[0].contents)
    expect(panel).toBeInTheDocument()
  })

  it('renders the second panel when clicking the second button', () => {
    const { getByText } = render(<MyTabsGroup />)
    fireEvent.click(getByText(items[1].name))
    const panel = getByText(items[1].contents)
    expect(panel).toBeInTheDocument()
  })

  it('handles initial index correctly if passed as a prop', () => {
    const { getByText } = render(<MyTabsGroup initialIndex={1} />)
    const panel = getByText(items[1].contents)
    expect(panel).toBeInTheDocument()
  })
})
