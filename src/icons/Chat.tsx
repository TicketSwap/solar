import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Chat = (props: any) => (
  <SvgWrapper a11yTitle="Chat" {...props}>
    <path d="M16 4c6.617 0 12 5.383 12 12s-5.383 12-12 12c-1.912 0-3.807-.463-5.507-1.342l-5.25 1.312a1.004 1.004 0 0 1-.95-.263.997.997 0 0 1-.263-.949l1.313-5.251A11.999 11.999 0 0 1 4 16C4 9.383 9.383 4 16 4zm0 10a2 2 0 1 0 .001 4.001A2 2 0 0 0 16 14zm-6 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 10 14zm12 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 22 14z" />
  </SvgWrapper>
)
