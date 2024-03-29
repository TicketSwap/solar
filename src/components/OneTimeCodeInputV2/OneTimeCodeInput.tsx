import React, {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  ReactElement,
} from 'react'
import styled from '@emotion/styled'
import { Input } from '../InputV2'
import { space } from '../../theme'
import { useRef, useState } from 'react'
import { Label } from '../Label'
import { InputWithAriaLabel } from '../InputV2/InputWithLabel'

const Fieldset = styled.fieldset`
  display: grid;
  grid-gap: ${space[4]};
`

const OneTimeCodeContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${space[48]}, 1fr));
  grid-gap: ${space[8]};

  input {
    text-align: center;
  }
`

type OverwrittenInputProps =
  | 'id'
  | 'aria-label'
  | 'onChange'
  | 'onKeyDown'
  | 'onFocus'
  | 'value'
  | 'disabled'
  | 'autoComplete'

interface OneTimeCodeInputProps {
  length: number
  id: string
  'aria-label': string
  legend?: string
  disabled?: boolean
  instruction?: ReactElement
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string
  defaultValue?: string
  inputProps?: Omit<InputWithAriaLabel, OverwrittenInputProps>
}

export const OneTimeCodeInput = ({
  length = 5,
  id,
  'aria-label': ariaLabel,
  legend,
  disabled = false,
  instruction,
  onChange,
  defaultValue = '',
  value,
  inputProps = {},
}: OneTimeCodeInputProps) => {
  const [inputValues, setInputValues] = useState([
    ...defaultValue,
    ...new Array(length - defaultValue.length).fill(''),
  ])
  const containerRef = useRef<HTMLInputElement>(null)
  const currentValues =
    typeof value !== 'undefined'
      ? [...value, ...new Array(length - value.length).fill('')]
      : inputValues

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    position: number
  ) => {
    if (!containerRef.current) return

    const inputs = containerRef.current.querySelectorAll('input')
    const newInputValues = [...currentValues]

    if (event.target.value.length === 0) {
      newInputValues[position] = event.target.value

      if (!inputs[position].value) {
        inputs[Math.max(0, position - 1)].focus()
      }

      onChange?.({
        ...event,
        target: { ...event.target, value: newInputValues.join('') },
      })

      return setInputValues(newInputValues)
    }

    if (event.target.value.length === 1) {
      newInputValues[position] = event.target.value

      const index = newInputValues.findIndex(value => value === '')
      if (index !== -1) {
        inputs[index].focus()
      }
      onChange?.({
        ...event,
        target: { ...event.target, value: newInputValues.join('') },
      })

      return setInputValues(newInputValues)
    }

    if (event.target.value.length === 2) {
      newInputValues[Math.min(length - 1, position + 1)] =
        event.target.value.split('')[1]

      const index = newInputValues.findIndex(value => value === '')
      if (index !== -1) {
        inputs[index].focus()
      } else {
        inputs[length - 1].focus()
      }
      onChange?.({
        ...event,
        target: { ...event.target, value: newInputValues.join('') },
      })

      return setInputValues(newInputValues)
    }

    if (event.target.value.length === length) {
      const multipleValues = event.target.value.split('')
      setInputValues(multipleValues)

      onChange?.({
        ...event,
        target: { ...event.target, value: multipleValues.join('') },
      })

      inputs[length - 1].focus()
    }
  }

  const handleKeyDown = (event: KeyboardEvent, position: number) => {
    if (!containerRef.current) return

    const inputs = containerRef.current.querySelectorAll('input')
    const moveRight =
      event.key === 'ArrowRight' && position !== currentValues.length - 1
    const moveLeft = event.key === 'ArrowLeft'

    if (event.key === 'Backspace') {
      if (!currentValues[position]) {
        inputs[Math.max(0, position - 1)].focus()
      }
    }

    if (moveRight) {
      inputs[Math.min(length - 1, position + 1)].focus()
    }

    if (moveLeft) {
      inputs[Math.max(0, position - 1)].focus()
    }
  }

  return (
    <Fieldset>
      {legend && <Label as="legend">{legend}</Label>}
      <OneTimeCodeContainer ref={containerRef}>
        {currentValues.map((value, index) => (
          <Input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event, index)
            }
            onKeyDown={event => handleKeyDown(event, index)}
            onFocus={event => event.target.setSelectionRange(1, 1)}
            value={value}
            key={index}
            disabled={disabled}
            id={`${id}-${index + 1}`}
            aria-label={`${ariaLabel} ${index + 1}`}
            {...(index === 0 && { autoComplete: 'one-time-code' })}
            {...inputProps}
          />
        ))}
      </OneTimeCodeContainer>
      {instruction}
    </Fieldset>
  )
}
