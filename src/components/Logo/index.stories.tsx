import React from 'react'
import { Logo, LogoVariants } from './'
import styled from '@emotion/styled'
import { color } from '../../theme'

const StyledLogo = styled(Logo)`
  color: ${color.earth};
`

export default {
  title: 'Logo',
}

const Horizontal = () => <Logo />
const Blue = () => <StyledLogo />
const Lgbt = () => <Logo variant={LogoVariants.lgbt} />

Lgbt.storyName = 'LGBT'

export { Horizontal, Blue, Lgbt }
