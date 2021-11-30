import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Dot = (props: any) => (
  <SvgWrapper a11yTitle="Dot" {...props}>
    <path d="M27 16c0 6.075-4.925 11-11 11S5 22.075 5 16 9.925 5 16 5s11 4.925 11 11z" />
  </SvgWrapper>
)
