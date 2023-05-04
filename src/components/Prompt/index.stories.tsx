import React from 'react'
import { Prompt } from './Prompt'
import { Event } from '../../icons'
import { Button } from '../Button'

export const Default = () => (
  <Prompt
    icon={<Event />}
    title="No events found"
    subtitle="We couldn't find any upcoming events for Adele"
    action={
      <Button size="small" variant="secondary">
        Add event
      </Button>
    }
  />
)

const story = {
  title: 'Components/Layout/Prompt',
}

export default story
