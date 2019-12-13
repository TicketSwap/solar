import React from 'react'
import { Collapsible } from './index'

export default {
  title: 'Collapsible',
}

export const Basic = () => (
  <Collapsible buttonLabel="Listing information">
    <ul>
      <li>Uno</li>
      <li>Dos</li>
      <li>Tres</li>
    </ul>
  </Collapsible>
)
