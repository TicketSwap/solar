import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Padlock = (props: any) => (
  <SvgWrapper a11yTitle="Padlock" {...props}>
    <path d="M11 11v1h10v-1c0-2.757-2.243-5-5-5s-5 2.243-5 5zm14 1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V14a2 2 0 0 1 2-2h2v-1c0-3.859 3.14-7 7-7 3.859 0 7 3.141 7 7v1h2zm-10 8.732V23a1 1 0 0 0 2 0v-2.268a2 2 0 1 0-2 0z" />
  </SvgWrapper>
)
