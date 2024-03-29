import styled from '@emotion/styled'
import React, { forwardRef, InputHTMLAttributes, Ref } from 'react'
import { color, space, Spinner, transition } from '../..'
import { Checkmark } from '../../icons'

const Container = styled.span`
  position: relative;
  display: inline-grid;
  align-items: center;
  justify-items: center;
`

const Icon = styled.span`
  grid-area: 1 / 1;
  color: ${color.background};
  pointer-events: none;
`

const StyledInput = styled.input`
  grid-area: 1 / 1;
  background-color: ${color.background};
  block-size: ${space[24]};
  inline-size: ${space[24]};
  appearance: none;
  border: 1px solid ${color.stroke};
  border-radius: 50%;
  transition: all ${transition};

  &:checked {
    background-color: ${color.action};
    border-color: ${color.action};
  }

  &:disabled {
    background-color: ${color.inactiveBackground};
    border-color: ${color.stroke};

    & + ${Icon} {
      color: ${color.inactiveBackground};
    }
  }

  &:checked&:disabled + ${Icon} {
    color: ${color.elevatedBackground};
  }

  &:focus,
  &:active {
    outline: 0;
    box-shadow: 0 0 0 ${space[4]} ${color.actionFocus};
  }
`

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean
}

export const Radio = forwardRef(
  ({ loading, ...props }: RadioProps, ref: Ref<HTMLInputElement>) => (
    <Container>
      <StyledInput type="radio" ref={ref} {...props} />
      <Icon>{loading ? <Spinner size={16} /> : <Checkmark size={16} />}</Icon>
    </Container>
  )
)
