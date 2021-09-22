import React from 'react'
import { BaseButton, ButtonVariant } from './'
import { File } from '@ticketswap/comets'

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
  <BaseButton id="baseButton" variant={ButtonVariant.success}>
    Success
  </BaseButton>
)

export const Warning = () => (
  <BaseButton id="baseButton" variant={ButtonVariant.warning}>
    Warning
  </BaseButton>
)

export const Danger = () => (
  <BaseButton id="baseButton" variant={ButtonVariant.danger}>
    Danger
  </BaseButton>
)

export const Disabled = () => (
  <BaseButton id="baseButton" disabled>
    Disabled
  </BaseButton>
)

export default {
  title: 'Components/Actions/BaseButton',
}
