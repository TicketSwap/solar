import React from 'react'
import { storiesOf } from '@storybook/react'
import { Logo } from './'
import styled from '@emotion/styled'
import { color } from '../../theme'

const StyledLogo = styled(Logo)`
  color: ${color.earth};
`

storiesOf('Logo', module)
  .add('horizontal', () => <Logo />)
  .add('blue', () => <StyledLogo />)
  .add('LGBT', () => <Logo variant="lgbt" />)
