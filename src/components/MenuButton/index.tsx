import {
  Menu as ReachMenu,
  MenuList as ReachMenuList,
  MenuItem as ReachMenuItem,
  MenuLink as ReachMenuLink,
  MenuProps,
  MenuListProps,
  useMenuButtonContext,
} from '@reach/menu-button'
import styled from '@emotion/styled'
import { color, easing, radius, shadow, space } from '../../theme'
import React from 'react'
import { css, Global } from '@emotion/react'
import { useTransition } from '../../hooks'

const DURATION = 200

export const Menu = ({ children, ...props }: MenuProps) => {
  return (
    <ReachMenu {...props}>
      {children}
      <Global
        styles={css`
          :root {
            --reach-menu-button: 1;
          }
        `}
      />
    </ReachMenu>
  )
}

// @ts-ignore
const StyledMenuList = styled(ReachMenuList)`
  background-color: ${color.nova};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.strong};
  padding-top: ${space[16]};
  padding-bottom: ${space[16]};
  margin-top: ${space[8]};
  margin-bottom: ${space[8]};

  [data-reach-menu-item][data-selected] {
    background-color: ${color.stardust};
  }

  [data-reach-menu-item] {
    :focus,
    :active {
      outline: none;
      box-shadow: 0 0 0 ${space[4]} ${color.earthLightestAlpha};
    }
  }

  :focus,
  :active {
    outline: none;
    box-shadow: 0 0 0 ${space[4]} ${color.earthLightestAlpha};
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

export const MenuList = ({ children, ...props }: MenuListProps) => {
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

// @ts-ignore
export const MenuItem = styled(ReachMenuItem)`
  padding: ${space[8]} ${space[16]};
  cursor: pointer;
`

// @ts-ignore
export const MenuLink = styled(ReachMenuLink)`
  padding: ${space[8]} ${space[16]};
  display: block;
`

export { MenuButton } from '@reach/menu-button'
