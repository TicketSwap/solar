import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Clock = (props: any) => (
  <SvgWrapper a11yTitle="Clock" {...props}>
    <path d="M14 0.666992C21.732 0.666992 28 6.93501 28 14.667C28 22.399 21.732 28.667 14 28.667C6.26801 28.667 0 22.399 0 14.667C0 6.93501 6.26801 0.666992 14 0.666992ZM14 4.66699C12.8954 4.66699 12 5.56242 12 6.66699V14.667C12 15.7716 12.8954 16.667 14 16.667H20C21.1046 16.667 22 15.7716 22 14.667C22 13.5624 21.1046 12.667 20 12.667H16V6.66699C16 5.56242 15.1046 4.66699 14 4.66699Z" />
  </SvgWrapper>
)
