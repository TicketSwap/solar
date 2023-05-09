import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '.'

export default {
  title: 'Components/Navigation/Tabs',
}

export const Basic = () => (
  <Tabs>
    <TabList>
      <Tab>Uno</Tab>
      <Tab>Dos</Tab>
      <Tab>Tres</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <p>Uno</p>
      </TabPanel>
      <TabPanel>
        <p>Dos</p>
      </TabPanel>
      <TabPanel>
        <p>Tres</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
)
