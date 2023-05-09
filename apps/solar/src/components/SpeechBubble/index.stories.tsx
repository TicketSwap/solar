import React from 'react'
import { SpeechBubble } from './'
import { Button, ButtonVariant } from '../Button'
import { H6 } from '../Heading'

export default {
  title: 'Components/Data Display/SpeechBubble',
  component: SpeechBubble,
}

export const BottomLeft = () => (
  <>
    <H6>Did this anwser your question?</H6>
    <div>
      <Button variant={ButtonVariant.success}>Yes</Button>
      <Button variant={ButtonVariant.secondary}>No</Button>
    </div>
    <SpeechBubble>
      <p>Great, thanks for your feedback!</p>
    </SpeechBubble>
  </>
)

export const BottomRight = () => (
  <SpeechBubble position="bottom-right">
    <p>Great, thanks for your feedback!</p>
  </SpeechBubble>
)

export const TopLeft = () => (
  <SpeechBubble position="top-left">
    <p>Great, thanks for your feedback!</p>
  </SpeechBubble>
)

export const TopRight = () => (
  <SpeechBubble position="top-right">
    <p>Great, thanks for your feedback!</p>
  </SpeechBubble>
)

export const WithOffset = () => (
  <>
    <SpeechBubble position="top-left" tailOffset={80}>
      <p>Great, thanks for your feedback!</p>
    </SpeechBubble>
    <p>
      The tail is <strong>here</strong>
    </p>
  </>
)
