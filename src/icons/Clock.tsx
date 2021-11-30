import React from 'react'
import { SvgWrapper } from './SvgWrapper'

export const Clock = (props: any) => (
  <SvgWrapper a11yTitle="Clock" {...props}>
    <path d="M16,30 C8.2680135,30 2,23.7319865 2,16 C2,8.2680135 8.2680135,2 16,2 C23.7319865,2 30,8.2680135 30,16 C30,23.7319865 23.7319865,30 16,30 Z M16.9698903,18.3146313 C17.1904211,18.1311996 17.330814,17.8547223 17.330814,17.5454545 L17.330814,9.35545455 C17.330814,8.8031698 16.8830987,8.35545455 16.330814,8.35545455 C15.7785292,8.35545455 15.330814,8.8031698 15.330814,9.35545455 L15.330814,17.130614 L11.4545881,21.1024408 C11.0688496,21.4976929 11.0765619,22.1308109 11.471814,22.5165494 C11.8670662,22.9022879 12.5001842,22.8945756 12.8859227,22.4993235 L16.9698903,18.3146313 Z" />
  </SvgWrapper>
)
