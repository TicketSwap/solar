import React from 'react'
import styled from 'styled-components'
import { Box } from '../Box'
import { color } from '../../theme'

const Container = styled.div`
  white-space: normal;
  color: ${color.space};
`

export const Card = ({ image: Image, children, ...props }) => (
  <Container {...props}>
    {Image && <Box marginBottom={8}>{Image}</Box>}
    {children}
  </Container>
)
