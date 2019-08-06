import React from 'react'
import { Global } from '@emotion/core'
import { globalStyles } from '../../global-styles'

export function BaseStyles() {
  return <Global styles={globalStyles} />
}
