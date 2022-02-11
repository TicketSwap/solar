import styled from '@emotion/styled'
import React, { forwardRef, InputHTMLAttributes } from 'react'
import { color, space, transition } from '../..'
import { Checkmark } from '../../icons'

const Container = styled.span`
  position: relative;
  display: inline-grid;
  align-items: center;
  justify-items: center;
`

const Icon = styled(Checkmark)`
  grid-area: 1 / 1;
  color: ${color.background};
  pointer-events: none;
`

const StyledInput = styled.input`
  grid-area: 1 / 1;
  background-color: ${color.background};
  height: ${space[24]};
  width: ${space[24]};
  appearance: none;
  border: 1px solid ${color.stroke};
  border-radius: 50%;
  transition: all ${transition};

  &:checked {
    background-color: ${color.info};
    border-color: ${color.info};
  }

  &:disabled {
    background-color: ${color.inactiveBackground};
    border-color: ${color.stroke};

    & + ${Icon} {
      color: ${color.inactiveBackground};
    }
  }

  &:checked&:disabled + ${Icon} {
    color: ${color.inactive};
  }

  &:focus,
  &:active {
    outline: 0;
    box-shadow: 0 0 0 ${space[4]} ${color.actionBackground};
  }
`

type InputAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>

export interface RadioProps extends InputAttributes {
  ref?: React.Ref<HTMLInputElement>
  id: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Radio: React.FC<RadioProps> = forwardRef(
  ({ onChange, value, checked, id, name, disabled = false }, ref) => {
    return (
      <Container>
        <StyledInput
          type="radio"
          ref={ref}
          onChange={onChange}
          value={value}
          checked={checked}
          id={id}
          name={name}
          disabled={disabled}
        />
        <Icon size={16} />
      </Container>
    )
  }
)
