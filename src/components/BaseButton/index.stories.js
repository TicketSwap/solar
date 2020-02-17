import React from 'react'
import { BaseButton } from './'
import { File } from '@ticketswap/comets'

export default {
  title: 'BaseButton',
}

export const Basic = () => (
  <BaseButton id="baseButton" onClick={() => alert('Clicked')}>
    Default
  </BaseButton>
)
export const WithIcon = () => (
  <BaseButton id="baseButton" leftAdornment={<File size={24} />}>
    View example
  </BaseButton>
)
export const Success = () => (
  <BaseButton id="baseButton" variant="success">
    Success
  </BaseButton>
)
export const Warning = () => (
  <BaseButton id="baseButton" variant="warning">
    Warning
  </BaseButton>
)
export const Danger = () => (
  <BaseButton id="baseButton" variant="danger">
    Danger
  </BaseButton>
)
export const Disabled = () => (
  <BaseButton id="baseButton" disabled>
    Disabled
  </BaseButton>
)
