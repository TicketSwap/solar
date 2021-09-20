import React from 'react'
import { ColorComponent } from '../ColorComponent'
import styled from '@emotion/styled'
import { space } from '../../../theme'

const SocialsContainer = styled.div`
  div + h2 {
    margin-top: ${space[32]};
  }
`

export const Socials = () => (
  <SocialsContainer>
    <ColorComponent name="facebook" />
    <ColorComponent name="twitter" />
    <ColorComponent name="whatsapp" />
  </SocialsContainer>
)

export default {
  title: 'Design Tokens/Colors/Socials',
}
