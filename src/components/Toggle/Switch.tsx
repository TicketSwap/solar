import React from 'react'
import styled from '@emotion/styled'
import { Spinner } from '../Spinner'
import { space, color } from '../../theme'

export interface SwitchProps {
  on: boolean
  loading?: boolean
  adornment?: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  role?: string
  tabIndex?: number | string
}

interface ButtonProps {
  isOn: boolean
}

interface AdornmentProps {
  isOn: boolean
}

// Toggle styles copied and modified from
// https://codepen.io/mallendeo/pen/eLIiG by Mauricio Allende
// (https://mallendeo.com/)

const Button = styled.button<ButtonProps>`
  box-sizing: initial;
  display: inline-block;
  outline: 0;
  width: ${52 / 16}rem;
  height: ${28 / 16}rem;
  position: relative;
  cursor: pointer;
  user-select: none;
  background: ${props => (props.isOn ? color.success : color.inactiveBackground)};
  border-radius: ${space[32]};
  padding-block: ${space[4]};
  padding-inline: ${space[4]};
  transition: all 0.4s ease;
  border: 0;

  &:focus::before,
  &:active::before {
    box-sizing: initial;
  }

  &:active::before {
    margin-inline-start: -${props => (props.isOn ? space[4] : 0)};
    padding-inline-end: ${space[4]};
  }

  &::before {
    left: ${props => (props.isOn ? space[24] : 0)};
    position: relative;
    display: block;
    content: '';
    width: ${28 / 16}rem;
    height: 100%;
    border-radius: ${space[32]};
    background: ${color.lightBackground};
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease,
      margin 0.3s ease;
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
    box-shadow: 0 0 0 ${space[4]} ${color.actionFocus};
    pointer-events: none;
  }
`

const Adornment = styled.span<AdornmentProps>`
  position: absolute;
  left: ${props => (props.isOn ? 34 : 10)}px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: ${props => (props.isOn ? color.success : color.inactive)};
  display: flex;
  top: 0;
  bottom: 0;
  align-items: center;
`

const StyledSpinner = styled(Spinner)`
  position: relative;
`

export const Switch: React.FC<SwitchProps> = ({
  on,
  loading,
  adornment,
  onClick,
  tabIndex,
  ...props
}) => {
  return (
    <Button isOn={Boolean(on)} onClick={onClick} {...props}>
      {loading || adornment ? (
        <Adornment isOn={on}>
          {loading ? (
            <StyledSpinner color={color.darkForeground} size={16} />
          ) : adornment ? (
            adornment
          ) : null}
        </Adornment>
      ) : null}
    </Button>
  )
}
