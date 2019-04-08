import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Icon } from '../Icon'
import { Spinner } from '../Spinner'
import {
  color,
  space,
  radius,
  shadow,
  fontSize,
  fontWeight,
  lineHeight,
  transition,
} from '../../theme'

const StyledButton = styled.button`
  position: relative;
  font-family: inherit;
  font-weight: ${fontWeight.semiBold};
  text-align: center;
  border: none;
  padding: 0
    ${props =>
      props.square
        ? 0
        : props.icon && props.width === 'full'
        ? space[48]
        : space[24]};
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: ${color.earth};
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.24),
    rgba(255, 255, 255, 0)
  );
  color: white;
  text-shadow: ${shadow.text};
  line-height: ${lineHeight.solid};
  border-radius: ${props => (props.rounded ? space[32] : radius.md)};
  font-size: ${props => (props.size === 'small' ? fontSize[16] : fontSize[18])};
  width: ${props =>
    props.width === 'full'
      ? '100%'
      : props.square
      ? props.size === 'small'
        ? space[44]
        : space[56]
      : 'auto'};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  height: ${props => (props.size === 'small' ? space[44] : space[56])};
  transition: color ${transition}, background-color ${transition},
    text-shadow ${transition};

  svg {
    filter: drop-shadow(${shadow.text});
  }

  ${props =>
    props.variant === 'secondary' &&
    css`
      background-color: ${props.active ? color.earth : color.stardustLight};
      color: ${props.active ? 'white' : color.space};
    `};

  ${props =>
    props.variant === 'inverted' &&
    css`
      text-shadow: none;
      background-color: white;
      color: ${color.earth};

      svg {
        filter: none;
      }
    `};

  ${props =>
    props.variant === 'success' &&
    css`
      background-color: ${color.titan};
    `};

  ${props =>
    props.variant === 'warning' &&
    css`
      background-color: ${color.sun};
    `};

  ${props =>
    props.variant === 'danger' &&
    css`
      background-color: ${color.mars};
    `};

  ${props =>
    props.variant === 'facebook' &&
    css`
      background-color: rgb(59, 89, 152);
    `};

  ${props =>
    props.disabled &&
    css`
      color: ${color.spaceLighter};
      background-color: ${color.spaceLightest};
      text-shadow: none;
    `};

  ${props =>
    props.variant === 'inverted' &&
    props.disabled &&
    css`
      background-color: white;
      color: ${color.earthLighter};
    `};

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &:focus::after {
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    background-color: transparent;
    border-radius: ${props =>
      props.rounded ? space[32] : `calc(${radius.md} + 1px)`};
    box-shadow: 0 0 0 ${space[4]} ${color.earthFocus};
    pointer-events: none;

    ${props =>
      props.variant === 'success' &&
      css`
        box-shadow: 0 0 0 ${space[4]} ${color.titanFocus};
      `};

    ${props =>
      props.variant === 'warning' &&
      css`
        box-shadow: 0 0 0 ${space[4]} ${color.sunFocus};
      `};

    ${props =>
      props.variant === 'danger' &&
      css`
        box-shadow: 0 0 0 ${space[4]} ${color.marsFocus};
      `};

    ${props =>
      props.variant === 'facebook' &&
      css`
        box-shadow: 0 0 0 ${space[4]} rgba(59, 89, 152, 0.24);
      `};
  }

  &:hover {
    color: white;
    text-shadow: ${shadow.text};
    background-color: ${color.earthLight};

    ${props =>
      props.variant === 'secondary' &&
      css`
        background-color: ${props.active
          ? color.earthLight
          : color.stardustLight};
        color: ${props.active ? 'white' : color.spaceMedium};
      `};

    ${props =>
      props.variant === 'inverted' &&
      css`
        text-shadow: none;
        background-color: white;
        color: ${color.earthLight};
      `};

    ${props =>
      props.variant === 'success' &&
      css`
        background-color: ${color.titanLight};
      `};

    ${props =>
      props.variant === 'warning' &&
      css`
        background-color: ${color.sunLight};
      `};

    ${props =>
      props.variant === 'danger' &&
      css`
        background-color: ${color.marsLight};
      `};

    ${props =>
      props.variant === 'facebook' &&
      css`
        background-color: rgb(98, 122, 173);
      `};

    ${props =>
      props.disabled &&
      css`
        color: ${color.spaceLighter};
        background-color: ${color.spaceLightest};
        text-shadow: none;
      `};

    ${props =>
      props.variant === 'inverted' &&
      props.disabled &&
      css`
        background-color: white;
        color: ${color.earthLighter};
      `};
  }

  &:active {
    outline: 0;

    ${props =>
      !props.disabled &&
      css`
        background-image: none;
        background-color: ${color.earthLight};
      `};

    ${props =>
      !props.disabled &&
      props.variant === 'secondary' &&
      css`
        background-color: ${props.active
          ? color.earthLight
          : color.stardustLight};
        color: ${props.active ? 'white' : color.space};
      `};

    ${props =>
      !props.disabled &&
      props.variant === 'success' &&
      css`
        background-color: ${color.titanLight};
      `};

    ${props =>
      !props.disabled &&
      props.variant === 'warning' &&
      css`
        background-color: ${color.sunLight};
      `};

    ${props =>
      !props.disabled &&
      props.variant === 'danger' &&
      css`
        background-color: ${color.marsLight};
      `};

    ${props =>
      !props.disabled &&
      props.variant === 'facebook' &&
      css`
        background-color: rgb(98, 122, 173);
      `};

    ${props =>
      !props.disabled &&
      props.variant === 'inverted' &&
      css`
        color: ${color.earth};
        background-color: white;
      `};
  }
`

const Adornment = styled.span`
  margin-left: -${space[8]};
  margin-right: ${space[12]};

  ${props =>
    props.position === 'absolute' &&
    css`
      position: absolute;
      left: 0;
      width: ${space[56]};
      margin: 0;
    `};
`

export const Button = ({ children, ...props }) => (
  <StyledButton {...props}>
    {props.loading || props.icon ? (
      <Adornment position={props.width === 'full' ? 'absolute' : null}>
        {props.loading ? (
          <Spinner size={24} />
        ) : props.icon ? (
          <Icon glyph={props.icon} size={24} />
        ) : null}
      </Adornment>
    ) : null}
    {children}
  </StyledButton>
)

Button.propTypes = {
  icon: PropTypes.string,
}
