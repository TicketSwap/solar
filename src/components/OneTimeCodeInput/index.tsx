import React from 'react'
import styled from '@emotion/styled'
import { fieldStyles, Help, LabelText } from '../Input'
import { space } from '../../theme'
import { useRef, useState } from 'react'
import { VisuallyHidden } from '../VisuallyHidden'
import { Label } from '../Input'

interface OneTimeCodeContainerProps {
  length: number
}

interface OneTimeCodeInputProps {
  length: number
  id: string
  hideLabel?: boolean
  ariaLabel: string
  label: string
  disabled?: boolean
  helpText?: string
  labelProps?: object
  validate?: boolean
  onChange?: (value: any) => void
}

const OneTimeCodeContainer = styled.section<OneTimeCodeContainerProps>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${space[48]}, 1fr));
  grid-gap: ${space[8]};

  input {
    text-align: center;
  }
`

const Input = styled.input`
  ${fieldStyles};
`

export const OneTimeCodeInput: React.FC<OneTimeCodeInputProps> = ({
  length = 5,
  id,
  hideLabel,
  ariaLabel,
  label,
  disabled = false,
  helpText,
  onChange = () => {},
}) => {
  const [inputValues, setInputValues] = useState(new Array(length).fill(''))
  const containerRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    position: number
  ) => {
    if (!containerRef.current) return

    const inputs = containerRef.current.querySelectorAll('input')
    const newInputValues = [...inputValues]

    if (event.target.value.length === 0) return

    if (event.target.value.length === 1) {
      newInputValues[position] = event.target.value

      const index = newInputValues.findIndex(value => value === '')
      if (index !== -1) {
        inputs[index].focus()
      }
      onChange(newInputValues.join(''))
      return setInputValues(newInputValues)
    }

    if (event.target.value.length === length) {
      const multipleValues = event.target.value.split('')
      setInputValues(multipleValues)

      onChange(multipleValues.join(''))
      inputs[length - 1].focus()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, position: number) => {
    if (!containerRef.current) return

    const inputs = containerRef.current.querySelectorAll('input')
    const newInputValues = [...inputValues]
    const moveRight =
      event.key === 'ArrowRight' && position !== inputValues.length - 1
    const moveLeft = event.key === 'ArrowLeft' && position !== 0
    const Backspace = event.key === 'Backspace'

    if (moveRight) {
      inputs[position + 1].focus()
    }

    if (moveLeft) {
      inputs[position - 1].focus()
    }

    if (Backspace) {
      if (inputs[0] === document.activeElement && inputs[0].value === '') return

      if (inputs[position].value) {
        newInputValues[position] = ''
        onChange(newInputValues.join(''))
        setInputValues(newInputValues)
      } else {
        newInputValues[position - 1] = ''
        onChange(newInputValues.join(''))
        setInputValues(newInputValues)
        inputs[position - 1].focus()
      }
    }
  }

  return (
    <>
      <Label htmlFor={`${id}-1`}>
        {hideLabel ? (
          <VisuallyHidden>
            <LabelText>{label}</LabelText>
          </VisuallyHidden>
        ) : (
          <LabelText>{label}</LabelText>
        )}
      </Label>
      <OneTimeCodeContainer ref={containerRef} length={length}>
        {inputValues.map((value, index) => (
          <Input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(event, index)
            }}
            onKeyDown={event => handleKeyDown(event, index)}
            onFocus={event => event.target.setSelectionRange(1, 1)}
            value={value}
            key={index}
            label={label}
            pattern="\d*"
            validate={true}
            disabled={disabled}
            id={`${id}-${index + 1}`}
            aria-label={`${ariaLabel} ${index + 1}`}
            {...(index === 0 && { autoComplete: 'one-time-code' })}
          />
        ))}
      </OneTimeCodeContainer>
      {helpText && <Help>{helpText}</Help>}
    </>
  )
}
