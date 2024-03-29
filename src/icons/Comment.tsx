import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Comment = (props: any) => (
  <SvgWrapper a11yTitle="Comment" {...props}>
    <path d="M21 11.968H11a.999.999 0 1 1 0-1.999h10a.999.999 0 1 1 0 1.999m-4 3.989h-6a.999.999 0 1 1 0-2h6a.999.999 0 1 1 0 2M23.016 4H9C6.243 4 4 6.242 4 8.997v15.002c0 1.232.739 2.323 1.884 2.782.368.148.751.219 1.128.219.797 0 1.57-.317 2.129-.901l4.262-4.11h9.564A5.037 5.037 0 0 0 28 16.959V8.982A4.99 4.99 0 0 0 23.016 4" />
  </SvgWrapper>
)
