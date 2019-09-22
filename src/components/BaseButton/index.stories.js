import React from 'react'
import { BaseButton } from './'

export default {
  title: 'BaseButton',
}

export const Basic = () => <BaseButton>Default</BaseButton>
export const Success = () => <BaseButton variant="success">Success</BaseButton>
export const Warning = () => <BaseButton variant="warning">Warning</BaseButton>
export const Danger = () => <BaseButton variant="danger">Danger</BaseButton>
export const Disabled = () => <BaseButton disabled>Disabled</BaseButton>
