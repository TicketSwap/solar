import styled from '@emotion/styled'
import React, { forwardRef } from 'react'
import { color, radius, space } from '../..'
import { Label } from '../Label'
import { Radio, RadioProps } from './Radio'

const Wrapper = styled.span`
  label {
    display: grid;
    grid-template-columns: 56px 1fr;
    padding: ${space[16]} ${space[16]} ${space[16]} 0;
    align-items: center;
    background-color: ${color.elevatedBackground};
    border-radius: ${radius.md};
  }
`

export interface RadioWithLabelProps extends RadioProps {
  label: string
  ref?: React.Ref<HTMLInputElement>
}

export const RadioWithLabel: React.FC<RadioWithLabelProps> = forwardRef(
  ({ label, ...radioProps }, ref) => {
    return (
      <Wrapper>
        <Label htmlFor={radioProps.id}>
          <Radio {...radioProps} ref={ref} />
          {label}
        </Label>
      </Wrapper>
    )
  }
)
