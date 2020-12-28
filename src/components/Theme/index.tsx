import React, { useState } from 'react'
import styled from '@emotion/styled'
import { space, color } from '../../theme'
import { Toggle } from '../Toggle'

const Container = styled.div`
  padding: ${space[16]};
  background-color: ${color.nova};
  min-height: 75vh;
`

const DarkModeToggle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${space[16]};
  margin-bottom: ${space[16]};
`

const Theme = ({ children }: any) => {
  const [darkOn, setDarkOn] = useState(false)

  return (
    <>
      <DarkModeToggle>
        <p>Dark mode</p>
        <Toggle onToggle={on => setDarkOn(on)} />
      </DarkModeToggle>

      <Container data-theme={darkOn ? 'dark' : 'light'}>{children}</Container>
    </>
  )
}

export default Theme
