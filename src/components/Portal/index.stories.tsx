import React from 'react'
import { Portal } from '.'
import { H1 } from '../Heading'
import styled from '@emotion/styled'
import { color, radius, shadow, space } from '../../theme'

export default {
  title: 'Components/Utilities/Portal',
}

const Container = styled.div`
  height: 90vh;
  background-color: ${color.elevatedBackground};
`

const PortalContainer = styled.div`
  position: absolute;
  background-color: ${color.background};
  top: ${space[56]};
  left: ${space[56]};
  box-shadow: ${shadow.strong};
  border-radius: ${radius.lg};
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
`

export const Default = () => (
  <>
    <Container>
      <H1>Background text</H1>
    </Container>
    <Portal>
      <PortalContainer>
        <H1>I am above all other components!</H1>
      </PortalContainer>
    </Portal>
  </>
)
