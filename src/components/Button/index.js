import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Icon } from '../Icon'
import { Spinner } from '../Spinner'
import {
  color,
  space,
  radius,
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
  padding: 0 ${props => (props.square ? 0 : space[24])};
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-color: ${color.earth};
  color: white;
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
  transition: all ${transition};

  ${props =>
    props.variant === 'secondary' &&
    css`
      background-color: ${props.active ? color.earth : color.stardustLight};
      color: ${props.active ? 'white' : color.spaceMedium};
    `};

  ${props =>
    props.variant === 'inverted' &&
    css`
      background-color: white;
      color: ${color.earth};
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
    `};

  &:hover,
  &:focus {
    background-color: ${color.earthLight};

    ${props =>
      props.variant === 'secondary' &&
      css`
        background-color: ${props.active
          ? color.earthLight
          : color.stardustLighter};
        color: ${props.active ? 'white' : color.spaceMedium};
      `};

    ${props =>
      props.variant === 'inverted' &&
      css`
        background-color: ${color.earth};
        color: white;
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
      `};
  }

  &:active,
  &:focus {
    outline: none;
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

export const Button = ({ icon, children, ...props }) => (
  <StyledButton {...props}>
    {props.loading || icon ? (
      <Adornment position={props.width === 'full' ? 'absolute' : null}>
        {props.loading ? (
          <Spinner size={24} />
        ) : icon ? (
          <Icon glyph={icon} size={24} />
        ) : null}
      </Adornment>
    ) : null}
    {children}
  </StyledButton>
)

Button.propTypes = {
  icon: PropTypes.string,
}
