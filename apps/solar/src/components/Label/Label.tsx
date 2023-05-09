import React, { ElementType, LabelHTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { device, fontSize, color } from '../..'

const StyledLabel = styled.label`
  font-size: ${fontSize[16]};
  color: ${color.foreground};

  @media ${device.tablet} {
    font-size: ${fontSize[18]};
  }
`

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  as?: ElementType
}

export const Label = ({ children, as = 'label', ...props }: LabelProps) => (
  <StyledLabel {...props} as={as}>
    {children}
  </StyledLabel>
)
