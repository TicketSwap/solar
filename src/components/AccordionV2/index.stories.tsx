import React, { useState } from 'react'
import { Accordion } from '.'

export const Basic = () => (
  <Accordion
    items={[
      {
        title: 'Do a thing',
        body: 'Here are some detailed instructions about doing a thing. I am very complex.',
      },
      {
        title: 'Do another thing',
        body: "Here are some detailed instructions about doing yet another thing. There are a lot of things someone might want to do, so I am only going to talk about doing that other thing. I'll let my fellow accordion items go into detail about even more things.",
      },
      {
        title: 'Click here to see a super long text',
        body: "Kidding. Here are some detailed instructions about doing yet another thing. There are a lot of things someone might want to do, so I am only going to talk about doing that other thing. I'll let my fellow accordion items go into detail about even more things.",
      },
    ]}
  />
)

export const Multiple = () => (
  <Accordion
    multiple
    items={[
      {
        title: 'Do a thing',
        body: 'Here are some detailed instructions about doing a thing. I am very complex.',
      },
      {
        title: 'Do another thing',
        body: "Here are some detailed instructions about doing yet another thing. There are a lot of things someone might want to do, so I am only going to talk about doing that other thing. I'll let my fellow accordion items go into detail about even more things.",
      },
      {
        title: 'Click here to see a super long text',
        body: "Kidding. Here are some detailed instructions about doing yet another thing. There are a lot of things someone might want to do, so I am only going to talk about doing that other thing. I'll let my fellow accordion items go into detail about even more things.",
      },
    ]}
  />
)

export const Collapsible = () => (
  <Accordion
    collapsible
    items={[
      {
        title: 'Do a thing',
        body: 'Here are some detailed instructions about doing a thing. I am very complex.',
      },
      {
        title: 'Do another thing',
        body: "Here are some detailed instructions about doing yet another thing. There are a lot of things someone might want to do, so I am only going to talk about doing that other thing. I'll let my fellow accordion items go into detail about even more things.",
      },
      {
        title: 'Click here to see a super long text',
        body: "Kidding. Here are some detailed instructions about doing yet another thing. There are a lot of things someone might want to do, so I am only going to talk about doing that other thing. I'll let my fellow accordion items go into detail about even more things.",
      },
    ]}
  />
)

export const Controlled = () => {
  const [index, setIndex] = useState(1)

  return (
    <Accordion
      index={index}
      onChange={setIndex}
      collapsible
      items={[
        {
          title: 'Do a thing',
          body: 'Here are some detailed instructions about doing a thing. I am very complex.',
        },
        {
          title: 'Do another thing',
          body: "Here are some detailed instructions about doing yet another thing. There are a lot of things someone might want to do, so I am only going to talk about doing that other thing. I'll let my fellow accordion items go into detail about even more things.",
        },
        {
          title: 'Click here to see a super long text',
          body: "Kidding. Here are some detailed instructions about doing yet another thing. There are a lot of things someone might want to do, so I am only going to talk about doing that other thing. I'll let my fellow accordion items go into detail about even more things.",
        },
      ]}
    />
  )
}

export default {
  title: 'Components/Surfaces/AccordionV2',
}
