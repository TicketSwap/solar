import React, { LabelHTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { device, fontSize, color } from '../..'

const StyledLabel = styled.label`
  font-size: ${fontSize[16]};
  color: ${color.foreground};

  @media ${device.tablet} {
    font-size: ${fontSize[18]};
  }
`

export const Label = ({
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => (
  <StyledLabel {...props}>{children}</StyledLabel>
)