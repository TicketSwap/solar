import React from 'react'
import styled from '@emotion/styled'
import { color, space } from '../../theme'

const Container = styled.div`
  white-space: normal;
  color: ${color.space};
`

const ImageWrapper = styled.div`
  margin-bottom: ${space[8]};
`

export const Card = ({ image, children, ...props }) => (
  <Container {...props}>
    {image && <ImageWrapper>{image}</ImageWrapper>}
    {children}
  </Container>
)
