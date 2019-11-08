import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './index'

export default {
  title: 'Tabs',
}

export const Basic = () => (
  <Tabs>
    <TabList>
      <Tab>Uno</Tab>
      <Tab>Dos</Tab>
      <Tab>Tres</Tab>
    </TabList>

    <div>Random</div>

    <TabPanels>
      <TabPanel>Uno</TabPanel>
      <TabPanel>Dos</TabPanel>
      <TabPanel>Tres</TabPanel>
    </TabPanels>

    <TabList>
      <Tab>Uno</Tab>
      <Tab>Dos</Tab>
      <Tab>Tres</Tab>
    </TabList>
  </Tabs>
)
