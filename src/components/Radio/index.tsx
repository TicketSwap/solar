import styled from '@emotion/styled'
import React, { forwardRef, InputHTMLAttributes } from 'react'
import { color, device, fontSize, radius, space, transition } from '../..'
import { Checkmark } from '../../icons'
import { Label } from '../Label'

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
  height: ${space[24]};
  width: ${space[24]};
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

const Wrapper = styled.span`
  label {
    display: grid;
    grid-template-columns: 56px 1fr;
    padding: ${space[16]} ${space[16]} ${space[16]} 0;
    align-items: center;
    background-color: ${color.stardust};
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

const Fieldset = styled.fieldset`
  display: grid;
  grid-gap: ${space[8]};
`

const Legend = styled.legend`
  margin-bottom: ${space[16]};
  font-size: ${fontSize[16]};
  color: ${color.space};

  @media ${device.tablet} {
    font-size: ${fontSize[18]};
  }
`

interface RadioOption {
  id: string
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps {
  options: RadioOption[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  legend?: string
  name: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options = [],
  onChange,
  value,
  name,
  legend,
}) => {
  return (
    <Fieldset>
      {legend && <Legend>{legend}</Legend>}
      {options.map(option => (
        <RadioWithLabel
          key={option.id}
          onChange={onChange}
          name={name}
          value={option.value}
          id={option.id}
          checked={option.value === value}
          label={option.label}
          disabled={option.disabled}
        />
      ))}
    </Fieldset>
  )
}
