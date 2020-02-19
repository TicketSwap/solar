import React from 'react'
import { SpeechBubble } from './'
import { Button } from '../Button'
import { H6 } from '../Heading'

export default {
  title: 'SpeechBubble',
  component: SpeechBubble,
}

export const BottomLeft = () => (
  <>
    <H6>Did this anwser your question?</H6>
    <div>
      <Button variant="success">Yes</Button>
      <Button variant="secondary">No</Button>
    </div>
    <SpeechBubble label={<p>Great, thanks for your feedback!</p>} />
  </>
)

export const BottomRight = () => (
  <SpeechBubble
    label={<p>Great, thanks for your feedback!</p>}
    position="bottom-right"
  />
)

export const TopLeft = () => (
  <SpeechBubble
    label={<p>Great, thanks for your feedback!</p>}
    position="top-left"
  />
)

export const TopRight = () => (
  <SpeechBubble
    label={<p>Great, thanks for your feedback!</p>}
    position="top-right"
  />
)

export const WithOffset = () => (
  <>
    <SpeechBubble
      label={<p>Great, thanks for your feedback!</p>}
      position="top-left"
      tailOffset={80}
    />
    <p>
      The tail is <strong>here</strong>
    </p>
  </>
)
