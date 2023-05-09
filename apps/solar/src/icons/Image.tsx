import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Image = (props: any) => (
  <SvgWrapper a11yTitle="Image" {...props}>
    <path d="M26 24H6c-1.103 0-2-.897-2-2v-2.722l5.334-4.085a.897.897 0 0 1 1.179.059l4.716 4.334c.994.914 2.419 1.043 3.548.315l2.64-1.697a.883.883 0 0 1 1.042.047l5.485 4.2A2 2 0 0 1 26 24m-3-14a2 2 0 1 1 .001 3.999A2 2 0 0 1 23 10m3-4H6a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4" />
  </SvgWrapper>
)
