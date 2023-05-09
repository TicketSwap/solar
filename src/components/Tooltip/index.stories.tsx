import styled from '@emotion/styled'
import React from 'react'
import { Tooltip } from '.'
import { space } from '../../theme'
import { Button } from '../Button'

export default {
  title: 'Components/Data Display/Tooltip',
}

const Grid = styled.div`
  display: flex;
  gap: ${space[16]};
`

export const Basic = () => (
  <Grid>
    <Tooltip label="Lorem ipsum">
      <Button>Enable</Button>
    </Tooltip>

    <Tooltip label="Dolor sit amet">
      <button style={{ fontSize: 25 }}>
        <span aria-hidden>🔔</span>
      </button>
    </Tooltip>
  </Grid>
)
