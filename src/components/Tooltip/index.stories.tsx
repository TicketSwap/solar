import React from 'react'
import { Tooltip } from '.'

export default {
  title: 'Tooltip',
}

export const Basic = () => (
  <>
    <Tooltip label="Lorem ipsum">
      <button style={{ fontSize: 25 }}>
        <span aria-hidden>🔔</span>
      </button>
    </Tooltip>
    <Tooltip label="Dolor sit amet">
      <button style={{ fontSize: 25 }}>
        <span aria-hidden>🔔</span>
      </button>
    </Tooltip>
  </>
)
