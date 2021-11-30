import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Seat = (props: any) => (
  <SvgWrapper a11yTitle="Seat" {...props}>
    <path d="M28 14a2 2 0 0 1 2 2v10H2V16a2 2 0 0 1 4 0v6h20v-6a2 2 0 0 1 2-2zm-4-4v10H8V10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4z" />
  </SvgWrapper>
)
