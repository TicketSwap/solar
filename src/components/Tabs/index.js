import React from 'react'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import {
  Tabs as ReachTabs,
  TabList as ReachTabList,
  Tab as ReachTab,
} from '@reach/tabs'
import { reachStyles } from './reach-styles'
import { color, radius, space, fontSize, fontWeight } from '../../theme'

export { TabPanels, TabPanel } from '@reach/tabs'

export function Tabs({ children, ...props }) {
  return (
    <>
      <Global styles={reachStyles} />
      <ReachTabs {...props}>{children}</ReachTabs>
    </>
  )
}

export const TabList = styled(ReachTabList)`
  border-radius: ${radius.lg};
  background-color: ${color.stardust};
  padding-top: ${space[8]};
  padding-bottom: ${space[8]};
  overflow-x: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  white-space: nowrap;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  > * + * {
    margin-left: ${space[8]};
  }

  &::before,
  &::after {
    /* Adds spacing at the beginning and end of the list. */
    /* Gotta use pseudo-elements, as padding would be ignored. */
    content: '';
    min-width: ${space[8]};
  }
`

export const Tab = styled(ReachTab)`
  border: 0;
  background-color: transparent;
  color: ${color.space};
  padding: ${space[4]} ${space[16]};
  font-size: ${fontSize[16]};
  font-weight: ${fontWeight.semiBold};

  &[data-selected] {
    color: white;
    background-color: ${color.earth};
  }

  &:hover {
    background-color: ${color.spaceLightest};
  }

  &[data-selected]:hover {
    background-color: ${color.earth};
  }
`
