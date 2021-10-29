import { ColorComponent } from './ColorComponent'
import { Global } from '@emotion/react'
import { globalStyles } from '../../../src/global-styles'
import styled from '@emotion/styled'
import { space } from '../../../src/theme'

const SocialsContainer = styled.div`
  display: grid;
  grid-gap: ${space[16]};

  div + h3 {
    margin-top: ${space[32]};
  }
`

const ColorsGrid = styled.div`
  display: grid;
  grid-gap: ${space[16]};
`

const Socials = () => (
  <SocialsContainer>
    <ColorComponent name="facebook" />
    <ColorComponent name="twitter" />
    <ColorComponent name="whatsapp" />
  </SocialsContainer>
)

export const Colors = () => {
  return (
    <>
      <Global styles={globalStyles} />

      <ColorsGrid>
        <ColorComponent name="earth" />
        <ColorComponent name="mars" />
        <ColorComponent name="nova" />
        <ColorComponent name="sky" />
        <ColorComponent name="space" />
        <ColorComponent name="stardust" />
        <ColorComponent name="sun" />
        <ColorComponent name="titan" />
        <Socials />
      </ColorsGrid>
    </>
  )
}
