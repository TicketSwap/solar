import React from 'react'
import { color as themeColor } from '../theme'
import { SvgWrapper, SvgWrapperProps } from './SvgWrapper'

interface ClockProps {
  accentColor?: string
}

export const Clock = ({
  accentColor = themeColor.background,
  ...props
}: SvgWrapperProps & ClockProps) => (
  <SvgWrapper {...props}>
    <path d="M14,0 C21.732,0 28,6.268018 28,14 C28,21.732008 21.732,28 14,28 C6.26801,28 0,21.732008 0,14 C0,6.268018 6.26801,0 14,0 Z"></path>
    <path
      d="M14,3.999998 C12.8954,3.999998 12,4.895428 12,5.999998 L12,13.999998 C12,15.104608 12.8954,15.999998 14,15.999998 L20,15.999998 C21.1046,15.999998 22,15.104608 22,13.999998 C22,12.895408 21.1046,11.999998 20,11.999998 L16,11.999998 L16,5.999998 C16,4.895428 15.1046,3.999998 14,3.999998 Z"
      fill={accentColor}
    ></path>
  </SvgWrapper>
)
