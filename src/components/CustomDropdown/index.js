import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import {
  color,
  space,
  shadow,
  fontSize,
  fontWeight,
  lineHeight,
  transition,
} from '../../theme'

export const Menu = styled.ul`
  position: absolute;
  z-index: 2;
  margin: 0;
  padding: ${space[16]};
  list-style: none;
  left: 50%;
  transform: translateX(-50%);
  border-radius: ${space[8]};
  display: block;
  box-shadow: ${shadow.strong};
  background-color: white;
  color: white;

  ${props =>
    props.position === 'bottom' &&
    css`
      top: calc(
        100% ${props => (props.distance ? ` + ${space[props.distance]}` : null)}
      );
    `};

  ${props =>
    props.position === 'top' &&
    css`
      bottom: calc(
        100% ${props => (props.distance ? ` + ${space[props.distance]}` : null)}
      );
    `};
`

export const Item = styled.li`
  font-size: ${fontSize[24]};
  line-height: ${lineHeight.title};
  padding: ${space[4]} ${space[8]};
  border-radius: ${space[4]};
  font-weight: ${fontWeight.regular};
  white-space: nowrap;
  color: ${props =>
    props.highlighted
      ? color.space
      : props.active
      ? color.earth
      : color.spaceLight};
  background-color: ${props =>
    props.highlighted ? color.stardust : 'transparent'};
  cursor: pointer;
  transition: color ${transition};
`

const Arrow = styled.svg`
  position: absolute;
  pointer-events: none;
  width: 16px;
  height: 16px;
  left: 50%;
  color: inherit;
  fill: currentColor;

  ${props =>
    props.position === 'top' &&
    css`
      top: -8px;
      transform: translateX(-50%);
      filter: drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.05));
    `};

  ${props =>
    props.position === 'bottom' &&
    css`
      bottom: -8px;
      transform: translateX(-50%) rotate(180deg);
      filter: drop-shadow(0 -2px 1px rgba(0, 0, 0, 0.125));
    `};
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
