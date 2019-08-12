import React from 'react'
import styled from '@emotion/styled'
import { color, space } from '../../theme'

const Container = styled.div`
  white-space: normal;
  color: ${color.space};
`

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: ${space[8]};
`

const Adornment = styled.div`
  position: absolute;
  z-index: 2;
  color: white;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Card = ({ image, adornment, children, ...props }) => (
  <Container {...props}>
    {image && (
      <ImageWrapper>
        {adornment && <Adornment>{adornment}</Adornment>}
        {image}
      </ImageWrapper>
    )}
    {children}
  </Container>
)
