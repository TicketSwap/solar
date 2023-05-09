import React from 'react'
import { render, fireEvent } from '../../../test/test.utils'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '.'

const Content = () => (
  <Tabs>
    <TabList>
      <Tab>Glenn</Tab>
      <Tab>Samy</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <p>Frontend Developer</p>
      </TabPanel>
      <TabPanel>
        <p>Backend Developer</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
)

describe('Tabs', () => {
  it('renders without crashing', () => {
    const { container } = render(<Content />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('can select different tabs', () => {
    const { container, getByText } = render(<Content />)

    expect(getByText(/Glenn/i)?.getAttribute('aria-selected')).toEqual('true')

    expect(getByText(/Samy/i)?.getAttribute('aria-selected')).toEqual('false')
    expect(container.firstChild).toBeInTheDocument()

    expect(
      getByText(/Frontend Developer/i)
        .closest('div')
        ?.getAttribute('hidden')
    ).toEqual(null)

    fireEvent.click(getByText(/Samy/i))

    expect(getByText(/Glenn/i)?.getAttribute('aria-selected')).toEqual('false')

    expect(
      getByText(/Backend Developer/i)
        .closest('div')
        ?.getAttribute('hidden')
    ).toEqual(null)
  })
})
