import styled from '@emotion/styled'
import React, { forwardRef } from 'react'
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
  color: ${color.nova};
  pointer-events: none;
`

const StyledInput = styled.input`
  grid-area: 1 / 1;
  background-color: ${color.nova};
  height: 24px;
  width: 24px;
  appearance: none;
  border: 1px solid ${color.spaceLightest};
  border-radius: 50%;
  transition: all ${transition};

  &:checked {
    background-color: ${color.earth};
    border-color: ${color.earth};
  }

  &:disabled {
    background-color: ${color.stardust};
    border-color: ${color.spaceLightest};

    & + ${Icon} {
      color: ${color.stardust};
    }
  }

  &:checked&:disabled + ${Icon} {
    color: ${color.spaceLighter};
  }

  &:focus,
  &:active {
    outline: 0;
    box-shadow: 0 0 0 ${space[4]} ${color.earthLightestAlpha};
  }
`

export interface RadioProps {
  ref?: React.Ref<HTMLInputElement>
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  checked: boolean
  id: string
  name: string
  disabled?: boolean
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
