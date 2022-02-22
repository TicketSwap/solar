import React, { LabelHTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { device, fontSize, color } from '../..'

const StyledLabel = styled.label`
  font-size: ${fontSize[16]};
  color: ${color.space};

  @media ${device.tablet} {
    font-size: ${fontSize[18]};
  }
`

export const Label: React.FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  htmlFor,
}) => <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
