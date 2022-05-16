import {
  Menu as ReachMenu,
  MenuList as ReachMenuList,
  MenuItem as ReachMenuItem,
  MenuLink as ReachMenuLink,
  MenuProps,
  MenuListProps as ReachMenuListProps,
  useMenuButtonContext,
  MenuItemProps,
  MenuLinkProps as ReachMenuLinkProps,
} from '@reach/menu-button'
import styled from '@emotion/styled'
import { color, easing, radius, shadow, space } from '../../theme'
import React from 'react'
import { css, Global } from '@emotion/react'
import { useTransition } from '../../hooks'
import { TransitionState } from '../../hooks/useTransition'

const DURATION = 200

export const Menu = ({ children, ...props }: MenuProps) => {
  return (
    <ReachMenu {...props}>
      <>
        {children}
        <Global
          styles={css`
            :root {
              --reach-menu-button: 1;
            }
          `}
        />
      </>
    </ReachMenu>
  )
}

export interface MenuListProps extends ReachMenuListProps {
  state: TransitionState
}

const StyledMenuList = styled<React.FC<MenuListProps>>(ReachMenuList)`
  background-color: ${color.background};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.strong};
  padding-block-start: ${space[16]};
  padding-block-end: ${space[16]};
  margin-block-start: ${space[8]};
  margin-block-end: ${space[8]};

  [data-reach-menu-item][data-selected] {
    background-color: ${color.elevatedBackground};
  }

  [data-reach-menu-item] {
    :focus,
    :active {
      outline: none;
      box-shadow: 0 0 0 ${space[4]} ${color.actionBackground};
    }
  }

  :focus,
  :active {
    outline: none;
    box-shadow: 0 0 0 ${space[4]} ${color.actionBackground};
  }

  opacity: ${props =>
    props.state === 'entering' || props.state === 'entered' ? 1 : 0};
  transform: ${props =>
    props.state === 'entering' ||
    props.state === 'entered' ||
    props.state === 'exiting'
      ? 'translateY(0)'
      : `translateY(1rem)`};
  transition: opacity ${DURATION}ms ${easing.easeInOutCubic},
    transform ${DURATION}ms ${easing.easeInOutCubic};
`

export const MenuList = ({ children, ...props }: ReachMenuListProps) => {
  const { isExpanded } = useMenuButtonContext()
  const [state] = useTransition({
    in: isExpanded,
    timeout: DURATION,
  })

  return (
    <StyledMenuList state={state} {...props}>
      {children}
    </StyledMenuList>
  )
}

export const MenuItem = styled<React.FC<MenuItemProps>>(ReachMenuItem)`
  padding-block: ${space[8]};
  padding-inline: ${space[16]};
  cursor: pointer;
`

export interface MenuLinkProps extends ReachMenuLinkProps {
  href: string | undefined
  as: string | undefined
}

export const MenuLink = styled<React.FC<MenuLinkProps>>(ReachMenuLink)`
  padding-block: ${space[8]};
  padding-inline: ${space[16]};
  display: block;
`

export { MenuButton } from '@reach/menu-button'
