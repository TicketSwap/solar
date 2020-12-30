import React from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import {
  Tabs as ReachTabs,
  TabList as ReachTabList,
  Tab as ReachTab,
  TabProps,
  TabListProps,
} from '@reach/tabs'
import { color, radius, space, fontSize, fontWeight } from '../../theme'

export const Tabs: React.FC = ({ children, ...props }) => {
  return (
    <ReachTabs {...props}>
      {children}
      <Global
        styles={css`
          :root {
            --reach-tabs: 1;
          }
        `}
      />
    </ReachTabs>
  )
}

export const TabList = styled<React.FC<TabListProps>>(ReachTabList)`
  display: flex;
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

export const Tab = styled<React.FC<TabProps>>(ReachTab)`
  display: inline-block;
  appearance: none;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  color: ${color.space};
  padding: ${space[4]} ${space[16]};
  font-size: ${fontSize[16]};
  font-weight: ${fontWeight.semiBold};

  &:first-of-type {
    margin-left: 0;
  }

  &:active {
    background: hsla(0, 0%, 0%, 0.05);
  }

  &[data-selected] {
    color: ${color.nova};
    background-color: ${color.earth};
  }

  &:hover {
    background-color: ${color.spaceLightest};
  }

  &[data-selected]:hover {
    background-color: ${color.earth};
  }

  &:disabled {
    opacity: 0.25;
    cursor: default;
  }
`

export { TabPanels, TabPanel } from '@reach/tabs'
