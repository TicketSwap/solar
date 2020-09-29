import React from 'react'
import { BaseButton, ButtonVariant } from './'
import { File } from '@ticketswap/comets'

const Basic = () => (
  <BaseButton id="baseButton" onClick={() => alert('Clicked')}>
    Default
  </BaseButton>
)

const WithIcon = () => (
  <BaseButton id="baseButton" leftAdornment={<File size={24} />}>
    View example
  </BaseButton>
)

const Success = () => (
  <BaseButton id="baseButton" variant={ButtonVariant.success}>
    Success
  </BaseButton>
)

const Warning = () => (
  <BaseButton id="baseButton" variant={ButtonVariant.warning}>
    Warning
  </BaseButton>
)

const Danger = () => (
  <BaseButton id="baseButton" variant={ButtonVariant.danger}>
    Danger
  </BaseButton>
)

const Disabled = () => (
  <BaseButton id="baseButton" disabled>
    Disabled
  </BaseButton>
)

export { Basic, WithIcon, Success, Warning, Danger, Disabled }

export default {
  title: 'BaseButton',
}
