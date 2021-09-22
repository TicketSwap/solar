import React from 'react'
import { Pill, PillVariant } from '.'
import { Ticket } from '@ticketswap/comets'

export default {
  title: 'Components/Data Display/Pill',
}

export const Primary = () => <Pill>Primary</Pill>
export const Secondary = () => (
  <Pill variant={PillVariant.secondary}>Secondary</Pill>
)
export const Success = () => <Pill variant={PillVariant.success}>Success</Pill>
export const Danger = () => <Pill variant={PillVariant.danger}>Danger</Pill>
export const Warning = () => <Pill variant={PillVariant.warning}>Warning</Pill>
export const Disabled = () => (
  <Pill variant={PillVariant.disabled}>Disabled</Pill>
)
export const WithIcon = () => (
  <Pill leftAdornment={<Ticket size={16} />}>124</Pill>
)
