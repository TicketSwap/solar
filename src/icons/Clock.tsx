import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Clock = (props: any) => (
  <SvgWrapper a11yTitle="Clock" {...props}>
    <path d="M16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16C2 8.26801 8.26801 2 16 2ZM16 6C14.8954 6 14 6.89543 14 8V16C14 17.1046 14.8954 18 16 18H22C23.1046 18 24 17.1046 24 16C24 14.8954 23.1046 14 22 14H18V8C18 6.89543 17.1046 6 16 6Z" />
  </SvgWrapper>
)
