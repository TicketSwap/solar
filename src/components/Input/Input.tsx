import React, { InputHTMLAttributes, ReactNode, Ref } from 'react'
import styled from '@emotion/styled'
import { fontSize, lineHeight, space, color, radius } from '../../theme'
import { css } from '@emotion/react'

interface AdornmentProps {
  start?: boolean
}

const Adornment = styled.span<AdornmentProps>`
  display: grid;
  place-items: center;
  ${props =>
    Boolean(props.start)
      ? 'grid-area: 1 / 1 / 1 / 2'
      : 'grid-area: 1 / 3 / 1 / 4'}
`

const Container = styled.span`
  display: grid;
  grid-template-columns: ${space[48]} 1fr ${space[48]};
`

interface StyledInputProps {
  hasStartAdornment: boolean
  hasEndAdornment: boolean
  rounded: boolean
}

const StyledInput = styled.input<StyledInputProps>`
  grid-area: 1 / 1 / 1 / 4;
  width: 100%;
  font-size: ${fontSize[18]};
  line-height: ${lineHeight.solid};
  height: ${space[56]};
  padding: 0 ${space[16]};
  color: ${color.foreground};
  border-radius: ${props => (props.rounded ? space[32] : radius.md)};
  background-color: ${color.elevatedBackground};

  ${props =>
    props.hasStartAdornment &&
    css`
      padding-inline-start: ${space[48]};
    `}

  ${props =>
    props.hasEndAdornment &&
    css`
      padding-inline-end: ${space[48]};
    `}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${space[4]} ${color.actionFocus};
    background-color: ${color.elevatedBackground};
  }

  &::placeholder {
    color: ${color.foregroundSubtle};
  }
`

type InputAttributes = InputHTMLAttributes<HTMLInputElement>

export interface InputProps extends InputAttributes {
  'aria-label': string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  rounded?: boolean
  validate?: boolean // props:validate/invalid form validation. to be continued...
  ref?: Ref<HTMLInputElement>
}

export const Input: React.FC<InputProps> = ({
  startAdornment = null,
  endAdornment = null,
  rounded = false,
  ...props
}) => (
  <Container>
    {startAdornment && <Adornment start>{startAdornment}</Adornment>}
    <StyledInput
      hasStartAdornment={Boolean(startAdornment)}
      hasEndAdornment={Boolean(endAdornment)}
      rounded={rounded}
      {...props}
    />
    {endAdornment && <Adornment>{endAdornment}</Adornment>}
  </Container>
)
