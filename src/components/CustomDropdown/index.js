import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import {
  color,
  space,
  shadow,
  fontSize,
  fontWeight,
  lineHeight,
  transition,
  radius,
} from '../../theme'

const bottomPos = props =>
  props.position === 'bottom' &&
  css`
    top: calc(100% ${props.distance ? ` + ${space[props.distance]}` : null});
  `

const topPos = props =>
  props.position === 'top' &&
  css`
    bottom: calc(100% ${props.distance ? ` + ${space[props.distance]}` : null});
  `

export const Menu = styled.ul`
  position: absolute;
  z-index: 2;
  padding: ${space[16]};
  left: 50%;
  transform: translateX(-50%);
  border-radius: ${radius.md};
  display: block;
  box-shadow: ${shadow.strong};
  background-color: white;
  color: white;
  ${bottomPos};
  ${topPos};
`

export const CustomDropdownItem = styled.li`
  font-size: ${fontSize[24]};
  line-height: ${lineHeight.title};
  padding: ${space[4]} ${space[8]};
  border-radius: ${radius.sm};
  font-weight: ${fontWeight.regular};
  white-space: nowrap;
  color: ${props => (props.active ? color.earth : color.spaceLight)};
  cursor: pointer;
  transition: color ${transition};

  &:focus,
  &:hover {
    color: ${color.space};
    background-color: ${color.stardust};
  }
`

const bottomArrow = props =>
  props.position === 'bottom' &&
  css`
    bottom: -8px;
    transform: translateX(-50%) rotate(180deg);
    filter: drop-shadow(0 -2px 1px rgba(0, 0, 0, 0.125));
  `

const topArrow = props =>
  props.position === 'top' &&
  css`
    top: -8px;
    transform: translateX(-50%);
    filter: drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.05));
  `

const Arrow = styled.svg`
  position: absolute;
  pointer-events: none;
  width: 16px;
  height: 16px;
  left: 50%;
  color: inherit;
  fill: currentColor;
  ${bottomArrow};
  ${topArrow};
`

export const CustomDropdown = ({ children, position, withArrow, ...props }) => (
  <Menu {...props} position={position}>
    {withArrow && (
      <Arrow
        position={position === 'top' ? 'bottom' : 'top'}
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="1.414"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="title"
        preserveAspectRatio="xMidYMid meet"
        fit
      >
        <path d="M0 8h16L8 0z" />
      </Arrow>
    )}
    {children}
  </Menu>
)

CustomDropdown.defaultProps = {
  position: 'bottom',
}

CustomDropdown.propTypes = {
  withArrow: PropTypes.bool,
  distance: PropTypes.number,
  position: PropTypes.string,
}
