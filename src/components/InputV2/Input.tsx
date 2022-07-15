import React, { InputHTMLAttributes, ReactNode } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { fontSize, lineHeight, space, color, radius, shadow } from '../../theme'

interface AdornmentProps {
  $start?: boolean
}

const Adornment = styled.span<AdornmentProps>`
  display: grid;
  place-items: center;
  ${props => (Boolean(props.$start) ? 'grid-area: 1 / 1 / 1 / 2' : 'grid-area: 1 / -2 / 1 / -1')}
`

interface ContainerProps {
  $hasStartAdornment: boolean
  $hasEndAdornment: boolean
}

const Container = styled.span<ContainerProps>`
  display: grid;
  grid-template-columns: 1fr;

  ${props =>
    props.$hasStartAdornment &&
    css`
      grid-template-columns: ${space[48]} 1fr;
    `}

  ${props =>
    props.$hasEndAdornment &&
    css`
      grid-template-columns: 1fr ${space[48]};
    `}

    ${props =>
    props.$hasStartAdornment &&
    props.$hasEndAdornment &&
    css`
      grid-template-columns: ${space[48]} 1fr ${space[48]};
    `}
`

interface StyledInputProps {
  $hasStartAdornment: boolean
  $hasEndAdornment: boolean
  $rounded: boolean
}

const StyledInput = styled.input<StyledInputProps>`
  grid-area: 1 / 1 / 1 / 4;
  width: 100%;
  font-size: ${fontSize[18]};
  line-height: ${lineHeight.solid};
  height: ${space[56]};
  padding-block: 0;
  padding-inline: ${space[16]};
  color: ${color.foreground};
  border-radius: ${props => (props.$rounded ? space[32] : radius.md)};
  background-color: ${color.elevatedBackground};

  ${props =>
    props.$hasStartAdornment &&
    css`
      padding-inline-start: ${space[48]};
    `}

  ${props =>
    props.$hasEndAdornment &&
    css`
      padding-inline-end: ${space[48]};
    `}

  &:focus {
    outline: none;
    box-shadow: ${shadow.strong};
    background-color: ${color.background};
  }

  &::placeholder {
    color: ${color.foregroundSubtle};
  }

  &:disabled {
    background-color: ${color.inactiveBackground};
    cursor: not-allowed;
  }
`

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  'aria-label': string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  rounded?: boolean
}

export const Input = ({
  startAdornment = null,
  endAdornment = null,
  rounded = false,
  ...props
}: InputProps) => (
  <Container $hasStartAdornment={Boolean(startAdornment)} $hasEndAdornment={Boolean(endAdornment)}>
    {startAdornment && <Adornment $start>{startAdornment}</Adornment>}
    <StyledInput
      $hasStartAdornment={Boolean(startAdornment)}
      $hasEndAdornment={Boolean(endAdornment)}
      $rounded={rounded}
      {...props}
    />
    {endAdornment && <Adornment>{endAdornment}</Adornment>}
  </Container>
)
