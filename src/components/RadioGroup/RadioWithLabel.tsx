import styled from '@emotion/styled'
import React, { forwardRef, ReactNode, Ref } from 'react'
import { color, radius, space } from '../..'
import { Label } from '../Label'
import { Radio, RadioProps } from './Radio'

const Wrapper = styled.span`
  label {
    display: grid;
    grid-template-columns: ${space[56]} 1fr;
    padding-block: ${space[16]};
    padding-inline: 0 ${space[16]};
    align-items: center;
    background-color: ${color.elevatedBackground};
    border-radius: ${radius.md};
  }
`

export interface RadioWithLabelProps extends Omit<RadioProps, 'id'> {
  id: string
  label: ReactNode
}

export const RadioWithLabel = forwardRef(
  (
    { label, ...radioProps }: RadioWithLabelProps,
    ref: Ref<HTMLInputElement>
  ) => (
    <Wrapper>
      <Label htmlFor={radioProps.id}>
        <Radio {...radioProps} ref={ref} />
        {label}
      </Label>
    </Wrapper>
  )
)
