import React from 'react'
import { Logo, LogoVariant } from './'
import styled from '@emotion/styled'
import { color } from '../../theme'

const StyledLogo = styled(Logo)`
  color: ${color.earth};
`

export default {
  title: 'Logo',
}

export const Horizontal = () => <Logo />
export const Blue = () => <StyledLogo />
export const Lgbt = () => <Logo variant={LogoVariant.lgbt} />

Lgbt.storyName = 'LGBT'
