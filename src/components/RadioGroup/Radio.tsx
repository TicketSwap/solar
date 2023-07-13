import styled from '@emotion/styled'
import React, { forwardRef, InputHTMLAttributes, Ref } from 'react'
import { color, opacity, space, transition } from '../..'
import { Checkmark } from '../../icons'
import { transparentize } from '../../utils/colors'

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
    outline: ${space[4]} solid ${transparentize(color.action, opacity.statusFocusColor)};
  }
`

export type RadioProps = InputHTMLAttributes<HTMLInputElement>

export const Radio = forwardRef(
  (props: RadioProps, ref: Ref<HTMLInputElement>) => (
    <Container>
      <StyledInput type="radio" ref={ref} {...props} />
      <Icon size={16} />
    </Container>
  )
)
