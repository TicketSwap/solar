import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Ticket = (props: any) => (
  <SvgWrapper a11yTitle="Ticket" {...props}>
    <path d="M6 18V5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v13h-1a2 2 0 1 0 0 4h1v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-5h1a2 2 0 1 0 0-4H6zm6 1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2zm6 0a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2h-2z" />
  </SvgWrapper>
)
