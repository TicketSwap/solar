import React from 'react'
import { H2 } from '../Heading'
import { Button } from '../Button'
import { MenuButton } from '../MenuButton'
import { TabsGroup } from './'

const items = [
  { name: 'Front-end', contents: 'Lucas' },
  { name: 'Back-end', contents: 'Pim' },
  { name: 'Design', contents: 'Koen' },
]

export default {
  title: 'TabsGroup',
}

export const WithButtons = () => (
  <TabsGroup>
    {({ activeIndex, select }) => (
      <div>
        {items.map((item, index) => (
          <Button
            variant="secondary"
            key={item.name}
            onClick={() => select(index)}
            active={index === activeIndex}
            rounded
          >
            {item.name}
          </Button>
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

WithButtons.story = {
  name: 'With buttons',
}

export const WithButtonsAndInitialIndex = () => (
  <TabsGroup initialIndex={1}>
    {({ activeIndex, select }) => (
      <div>
        {items.map((item, index) => (
          <Button
            variant="secondary"
            key={item.name}
            onClick={() => select(index)}
            active={index === activeIndex}
            rounded
          >
            {item.name}
          </Button>
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

WithButtonsAndInitialIndex.story = {
  name: 'With buttons and initial index',
}

export const WithMenuButton = () => (
  <TabsGroup>
    {({ activeIndex, select }) => (
      <div>
        <H2>
          Choose{' '}
          <MenuButton
            items={items}
            itemKey={'name'}
            onSelect={index => select(index)}
            downShiftProps={{
              itemToString: item => (item ? item.name : ''),
              initialSelectedItem: items[0],
            }}
          />
        </H2>

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

WithMenuButton.story = {
  name: 'With MenuButton',
}
