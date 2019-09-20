import React from 'react'
import { Pill } from './'
import { Ticket } from '@ticketswap/comets'

export default {
  title: 'Pill',
}

export const Primary = () => <Pill>Primary</Pill>
export const Secondary = () => <Pill variant="secondary">Secondary</Pill>
export const Success = () => <Pill variant="success">Success</Pill>
export const Danger = () => <Pill variant="danger">Danger</Pill>
export const Warning = () => <Pill variant="warning">Warning</Pill>
export const WithIcon = () => (
  <Pill leftAdornment={<Ticket size={16} />}>124</Pill>
)
