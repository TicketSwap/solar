import React from 'react'
import styled from '@emotion/styled'
import { space } from '../../theme'

const Container = styled.div`
  padding-block: ${space[16]};
  padding-inline: ${space[16]};
`

const Theme = ({ darkOn, children }: any) => {
  return (
    <>
      <Container data-theme={darkOn ? 'dark' : 'light'}>{children}</Container>
    </>
  )
}

export default Theme
