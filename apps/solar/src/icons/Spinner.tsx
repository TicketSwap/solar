import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Spinner = (props: any) => (
  <SvgWrapper a11yTitle="Spinner" {...props}>
    <g>
      <path
        d="M25 16a9 9 0 1 0-18 0 9 9 0 0 0 18 0zm4 0c0 7.18-5.82 13-13 13S3 23.18 3 16 8.82 3 16 3s13 5.82 13 13z"
        fillOpacity=".25"
      />
      <path d="M16 7V3c3.423 0 6.722 1.338 9.192 3.808l-2.828 2.828A8.964 8.964 0 0 0 15.999 7z" />
    </g>
  </SvgWrapper>
)
