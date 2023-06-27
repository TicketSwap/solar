import React from 'react'
import { Prompt } from './Prompt'
import { CheckmarkRounded, Event } from '../../icons'
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

export const Success = () => (
  <Prompt
    variant="success"
    icon={<CheckmarkRounded />}
    title="Success"
    subtitle="Your event has been added to Adele's calendar"
  />
)

const story = {
  title: 'Components/Layout/Prompt',
}

export default story
