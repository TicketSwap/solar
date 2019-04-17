import styled from 'styled-components'
import { space, color } from '../../theme'

// Toggle styles copied and modified from
// https://codepen.io/mallendeo/pen/eLIiG by Mauricio Allende
// (https://mallendeo.com/)

export const Switch = styled.button`
  box-sizing: initial;
  display: inline-block;
  outline: 0;
  width: 3.25rem; /* 52px */
  height: 1.75rem; /* 28px */
  position: relative;
  cursor: pointer;
  user-select: none;
  background: ${props => (props.on ? color.titanLight : color.spaceLightest)};
  border-radius: ${space[32]};
  padding: ${space[4]};
  transition: all 0.4s ease;
  border: 0;

  &:focus::before,
  &:active::before {
    box-sizing: initial;
  }

  &:active::before {
    margin-left: -${props => (props.on ? space[4] : 0)};
    padding-right: ${space[4]};
  }

  &::before {
    left: ${props => (props.on ? space[24] : 0)};
    position: relative;
    display: block;
    content: '';
    width: 1.75rem;
    height: 100%;
    border-radius: ${space[32]};
    background: white;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
      padding 0.3s ease, margin 0.3s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }

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
    border-radius: ${space[32]};
    box-shadow: 0 0 0 ${space[4]} ${color.earthFocus};
    pointer-events: none;
  }
`
