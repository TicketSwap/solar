import React from 'react'
import { StylisedIcon } from '.'
import { Event, Tag } from '../../icons'
import { Cover } from '../CoverV2'

export const Default = () => <StylisedIcon icon={<Event />} />

export const Large = () => <StylisedIcon size="large" icon={<Event />} />

export const LightVariant = () => (
  <Cover
    title="Pop"
    subtitle="Discover our pop content"
    images={{
      desktop:
        'https://cdn.ticketswap.com/public/202210/07bd30f6-0cea-4f06-9cb4-fd2e9eff4f2a.jpg',
    }}
    graphic={<StylisedIcon icon={<Tag />} variant="light" size="large" />}
  />
)

const story = {
  title: 'Components/Content/StylisedIcon',
}

export default story
