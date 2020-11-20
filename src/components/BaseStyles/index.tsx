import React from 'react'
import { Global } from '@emotion/react'
import { globalStyles } from '../../global-styles'

export function BaseStyles() {
  return <Global styles={globalStyles} />
}
